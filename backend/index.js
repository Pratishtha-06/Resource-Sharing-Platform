const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./model/userSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const PYQ = require('./model/pyq');
const path =  require('path');
const fs = require('fs');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));
app.use('/PDFuploads',express.static(path.join(__dirname,'PDFuploads')));

dotenv.config({path:'./.env'});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(MONGO_URL)
.then(()=>{console.log("Connected to db")}) 
.catch((err)=>{console.log("Couldn't connect to db:",err)})

//Verify TOKEN Function
const getDataFromReq =(req)=>{
  return new Promise((resolve,reject)=>{
     console.log("Token:",req.cookies.TOKEN);
     jwt.verify(req.cookies.TOKEN,JWT_SECRET,{},(err,userData)=>{
        if(err){
            console.log("JWT error:",err);
            reject(err);
        }else{
            console.log("JWT successful");
            resolve(userData);
        }
     })
  })
}

const authMiddleware=async(req,res,next)=>{
  try{
   const userData = await getDataFromReq(req);
   req.user = userData;
   next();
  }catch(err){
    console.log("Error:",err);
    res.status(400).json({message:"Unauthorized"})
  }

}

//Register
app.post('/api/register',async(req,res)=>{
 try{
  const {name,email,password} = req.body;
  const is_exist = await user.findOne({email:email});
  if(is_exist){
   res.status(400).json({message:"User already exist"});
   return;
  }else{
   const createUser = await user.create({name:name,email:email,password:password});
   res.status(200).json({message:"User Created"});
  }
 }catch(err){
    res.status(500).json({message:"Internal error occurred"});
    console.log("Error:",err);
 }
})

//login
app.post('/api/login',async(req,res)=>{
  try{
    const {email,password} = req.body;
    const is_exist =await user.findOne({email:email});
    if(is_exist){
        const passwordCheck =await is_exist.comparePassword(password);
        if(passwordCheck){
           jwt.sign({
            _id:is_exist._id,
            email:is_exist.email
           },JWT_SECRET,{ expiresIn: '7d' },(err,token)=>{
             if(err){
                return res.status(500).json({ message: "Token generation failed" });
             }else{
                return res.cookie('TOKEN',token,{
                    httpOnly:true,
                    sameSite:'lax',
                    expires: new Date(Date.now() + 7*24*60*60*1000),
                    secure:false
                }).status(200).json({_id: is_exist._id,
                                      name: is_exist.name,
                                      email: is_exist.email})
             }
           })
        }else if(!passwordCheck){
            return res.status(401).json({message:"Incorrect password"});
        }
    }else{
       return res.status(401).json({message:"User doesn't exist"});
    }
  }catch(err){
   return res.status(500).json({mesage:"Internal error occurred"});
  }
})

//Profile
app.get('/api/profile',async(req,res)=>{
    try{
    const {TOKEN} = req.cookies;
    
    if (!TOKEN) {
      return res.status(401).json({ message: "Not logged in" });
    }
    
    if(TOKEN){
        jwt.verify(TOKEN,JWT_SECRET,{},async(err,userData)=>{
            if(err){return res.status(404).json({message:"Couldn't verify"})}
            const {name,email,_id} = await user.findById(userData._id);
            res.json({name,email,_id});
    })}
    }catch(err){
        console.log("ERROR:",err);  
        return res.status(500).json({message:"Internal Error Occurred"});
    }
})

//Logout
app.post('/api/logout',(req,res)=>{
    res.cookie('TOKEN','',{
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'lax',
    secure:false,
    path: '/'
    }).json(true);
})

//Resource Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './PDFuploads')
  },

  filename: function (req, file, cb){
    const uniqueSuffix = Date.now()
    const titleSuffix = (req.body.title)
     .toLowerCase()
     .trim()
     .replace(/[^a-z0-9]+/g, '-') 
     .replace(/(^-|-$)+/g, '')
    cb(null, `${uniqueSuffix}${titleSuffix}.pdf`)
  }
})

const upload = multer({ storage: storage ,
    fileFilter:function(req,file,cb){
      if(file.mimetype === 'application/pdf'){
       cb(null,true)
      }else {
       cb(new Error('Only PDF files allowed'), false)
      }
    }
})

app.post('/api/upload-resource',authMiddleware,upload.single("file"),async(req,res)=>{
  try{
  if (!req.file) {
    return res.status(400).json({ message: "PDF file is required" });
  }

  const {title,year,subject,classYear} = req.body;
  const pyqCreate = await PYQ.create({
     title:title,
     year:year,
     subject:subject,
     class:classYear,
     postedBy:req.user._id,
     fileName:req.file.filename
  })
  res.json({...pyqCreate._doc,
         fileUrl : `${req.file.filename}`
  });
}catch(err){
  console.log("error uploading file:",err);
  res.status(500).json({message:"Couldn't upload file"});
}
})

//Get my-uploads
app.get('/api/my-uploads',authMiddleware,async(req,res)=>{
  try{
    const myPDFs = await PYQ.find({postedBy:req.user._id}).sort({createdAt:-1});
    res.status(200).json(myPDFs);
  }catch(err){   
    console.log("Error in fetch:",err);
    res.status(500).json({message:"Error fetching documents"});    
  }
})

//Delete PDFs
app.delete('/api/delete-upload/:id',authMiddleware,async(req,res)=>{
  try{
   const pdf = await PYQ.findById(req.params.id);
   if(!pdf){
    res.status(404).json({message:"File not found"});
   }

   if(pdf.postedBy.toString() === req.user.id){
    res.status(404).json({message:"Not allowed"});
   }
   
   const filePath = path.join(__dirname,'PDFuploads',pdf.fileName);
   if(fs.existsSync(filePath)){
     fs.unlinkSync(filePath);
   }

   await PYQ.findByIdAndDelete(req.params.id);
   res.json({ message: 'PDF deleted successfully' });


  }catch(err){
    console.log("Error in deleting",err);
    res.status(500).json({message:"Delete failed"});
  }
})


//All PDFs
app.get('/api/get-pdfs',async(req,res)=>{
   try{
    const allPDF = await PYQ.find({});
    res.status(200).json({allPDF});
   }catch(err){
    console.log("Error in fetching",err);
    res.status(500).json({message:"Error in fetching document"});
   }
})


//PORT
app.listen(PORT,()=>{
    console.log("Server listening at port",PORT);
})
