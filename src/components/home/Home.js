
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
        
        let count = 0;
        count++;
        console.log(count)
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then(url => {
                setImageUrls(prev => [...prev, url])
            })
          })
        })
      }, []);

    
      return (
        
        <div>
            {imageUrls.map((url, i) => (
                <div key={i}>
                    <img src={url} style={{width: '300px'}} />;
                </div>
            ))}
        </div>
        
      )
}

export default Home