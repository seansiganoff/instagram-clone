import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {signOut} from 'firebase/auth'
import { auth } from '../../dbconfig/firebase';
import { Context } from '../../App';
import { useContext } from 'react';


const Footer = () => {
  const [isAuth, setIsAuth] = useContext(Context)


  const onSignOut = () => {
    signOut(auth)
    setIsAuth(false)
  }

  return (
    <div className='footer'>
      <NavLink to='/'><HomeIcon fontSize='large'/></NavLink>
      <NavLink to='/post'><AddCircleOutlineIcon fontSize='large'/></NavLink>
      <button onClick={() => onSignOut()} style={{padding: '5px 10px', borderRadius: '30px', background: '000', border: 'solid white 1px', color: 'white'}}>LOG OUT</button>
    </div>
  )
}

export default Footer