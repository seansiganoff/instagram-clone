import React, { useState } from 'react';
import './post.css';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { auth, db, storage } from '../../dbconfig/firebase';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {collection, addDoc} from 'firebase/firestore';




const Post = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  // navigate to a different page
  const navigate = useNavigate();
  const [description, setDescription] = useState();


  //Function to upload a photo to the firebase storage database.
  const uploadFile = async () => {
    const imagePath = `${v4()}`
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imagePath}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    //refrence to the description database
    const descriptionCollectionRef = collection(db, "description");
    if(description && description.length > 0) {
      await addDoc(descriptionCollectionRef, {
        description: description,
        imageID: imagePath,
        name: auth.currentUser.displayName,
      })
    }
    setTimeout(() => {
      navigate("/");
    }, 3000)
  };

  

 


  return (
    <div className='post'>
        {/* input to upload file */}
        <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      
      <input 
        type='text'
        placeholder='Add Description'
        onChange={(e) => setDescription(e.target.value)}
        maxLength={50}
      />
      <button onClick={uploadFile}>POST</button><br /><br />
    </div>
  )
}

export default Post