import React from 'react';
import './login.css'
import { auth, googleProvider } from '../../dbconfig/firebase'
import { signInWithPopup } from 'firebase/auth';
import { Context } from '../../App';
import { useContext } from 'react';

const Login = () => {
  const [isAuth, setIsAuth] = useContext(Context)


  const signIn = async (auth, provider) => {
    try {
       await signInWithPopup(auth, provider);
        setIsAuth(true);
        if(isAuth) window.location.href = '/';
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Please log in</h1>
        <button onClick={() => signIn(auth, googleProvider)}>Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login