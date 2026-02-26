import  React,{ useContext } from 'react'
import {Link} from 'react-router-dom'
import '../index.css';
import {UserContext} from './UserContext';
import {Home,PlusIcon,User} from 'lucide-react'

function LinkComponent() {
     const{user} = useContext(UserContext);
 
  return (
    <div className='d-flex' style={{height:'40px'}}>
        <div className=' Options'>
            <Link to={`/`} className='Options'>
               <Home className='opt'/> Home
            </Link>
        </div>
        <div className='Options'>
            <Link to={`/upload-resource`} className='Options'>
               <PlusIcon className='opt'/> Upload
            </Link>
        </div>
        <div className='Options'>
            <Link to={user?`/my-profile`:`/login`} className='Options'>
               <User className='opt'/>Account
            </Link>
        </div>
    </div>
  )
}

export default React.memo(LinkComponent)
