
import './home.css';
import { storage } from '../../dbconfig/firebase'
import { Context } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';




const Home = () => {
    const [users, setUsers] = useState([]);
    const [isAuth, setIsAuth] = useContext(Context);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images");
    
    useEffect(() => {
        
        
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then(url => {
                setImageUrls(prev => [...prev, url])
            })
          })
        })
      }, []);
      //testing
    
      return (
          <div className='home'>
            <h1>Instagram Clone</h1>
              {imageUrls.map((url, i) => (
                  <div key={i}>
                      <img src={url} style={{width: '100%'}} />
                  </div>
              ))}
          </div>
        
      )
}

export default Home