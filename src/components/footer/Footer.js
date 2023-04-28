import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {signOut} from 'firebase/auth'


const Footer = () => {

  const onSignOut = () => {
    signOut()
  }

  return (
    <div className='footer'>
      <NavLink to='/post'><AddCircleOutlineIcon fontSize='large'/></NavLink>
      <NavLink to='/'><HomeIcon fontSize='large'/></NavLink>
      <NavLink to='/'><LogoutIcon fontSize='large'/></NavLink>
    </div>
  )
}

export default Footer