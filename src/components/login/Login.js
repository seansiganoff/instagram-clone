import React, {useContext} from 'react'
import { auth, googleProvider } from '../../dbconfig/firebase'
import { signInWithPopup } from 'firebase/auth';
import { Context } from '../../App';

const Login = () => {
  const [isAuth, setIsAuth] = useContext(Context)

  const signIn = async (auth, provider) => {
    try {
        await signInWithPopup(auth, provider);
        setIsAuth(true);
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div>
      <h1>Please log in</h1>
      <button onClick={() => signIn(auth, googleProvider)}>Sign in with Google</button>
    </div>
  )
}

export default Login