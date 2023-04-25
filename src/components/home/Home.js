
import './home.css';
import { auth } from '../../dbconfig/firebase'
import { signOut } from 'firebase/auth';
import { Context } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../dbconfig/firebase';
import { getDocs, collection } from 'firebase/firestore';




const Home = () => {
    const [users, setUsers] = useState([]);
    const [isAuth, setIsAuth] = useContext(Context);




    const usersCollection = collection(db, 'users');
    useEffect(() => {
        const getUsers = async () => {
            //read data
            //set the list
            try {
                const data = await getDocs(usersCollection)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                }))
                setUsers(filteredData);
            } catch (error) {
                console.error(error)
            }
        }
        getUsers();
    }, [])
    

      const logOut = async () => {
          try {
              await signOut(auth)
              setIsAuth(false);
          } catch (error) {
              console.error(error)
          }
      }

      
    
      return (
        
        <div className='home'>
            <div className='header'>
                {users.map((user) => (
                    <div key={user.id}>
                        <h1>{user.email}</h1><br />
                        <p>{user.time.seconds}</p><br />
                        <p>{user.user}</p>
                        
                    </div>
                ))}
            </div>
        </div>
        
      )
}

export default Home