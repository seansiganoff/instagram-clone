
import './home.css';
import { auth, db, storage } from '../../dbconfig/firebase'
import { Context } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref, getMetadata } from 'firebase/storage';
import {getDocs, collection} from 'firebase/firestore';




const Home = () => {
    const [descriptions, setDescriptions] = useState();
    const [isAuth, setIsAuth] = useContext(Context);
    const [imageUrls, setImageUrls] = useState([]);
    const [imagePostedBy, setImagePostedBy] = useState([]);


    
    
    
    const descriptionsCollectionRef = collection(db, 'description');
    const getDescriptions = async () => {
      try {
        const data = await getDocs(descriptionsCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data()
        }))
        setDescriptions(filteredData)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      getDescriptions()
    }, [])


    useEffect(() => {
      const imagesListRef = ref(storage, "images");
      

      
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then(url => {
                setImageUrls(prev => [...prev, url])
            })
          })
        })
      }, []);
      

      const SortDescription = (url, des) => {
        let generateDescription = []
        for(let i = 0; i < des.length; i++) {
          if(url.includes(des[i].imageID)) {
             generateDescription = des[i]
             
          }
        }
        
        return generateDescription
      }


      
    
      return (
          <div className='home'>
            <h1>Instagram Clone</h1>
              {imageUrls.map((url, i) => (
                  <div key={i}>
                      <p>Posted By: {descriptions && SortDescription(url, descriptions).name}</p>
                      <img src={url} style={{width: '100%'}} />
                      <div className='description'>
                      {descriptions && SortDescription(url, descriptions).description}
                      </div>
                      <br />
                      <hr />
                  </div>
              ))}
          </div>
        
      )
}

export default Home