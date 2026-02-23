const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})

//Password Bcrypt
userSchema.pre('save',async function(){
  const person=this;
  if(!person.isModified('password')) return ;
    try{
        const salt=await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(person.password,salt);
        person.password=hashPassword;
    }catch(err){
      return err;
    }})

//Compare Password
userSchema.methods.comparePassword = async function(candidatePassword){
    try{
     const isMatch = await bcrypt.compare(candidatePassword,this.password);
     return isMatch;
    }catch(err){
        throw err;
    }
}

module.exports = mongoose.model('User',userSchema);