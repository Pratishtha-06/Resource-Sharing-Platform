import { useContext } from "react";
import {UserContext} from "./UserContext";


function AuthGate({children}){
   const {ready} = useContext(UserContext);

    if(!ready){
     return (
     <div className='Loading'>
        <div className='load'></div>
        Loading...
     </div>)
    }
    return children;
  }

  export default AuthGate;