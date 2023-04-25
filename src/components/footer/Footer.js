import React from 'react';
import './footer.css';
import { NavLink, Navigate } from 'react-router-dom';
import Post from '../post/Post';

const Footer = () => {

  const navigateTo = (link) => {
    
  }

  return (
    <div className='footer'>
      <NavLink to='/post'>POST</NavLink>
    </div>
  )
}

export default Footer