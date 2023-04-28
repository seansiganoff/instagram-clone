import React, { useState } from 'react';
import './post.css';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from '../../dbconfig/firebase';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Home from '../home/Home';




const Post = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  // navigate to a different page
  const navigate = useNavigate();




  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    setTimeout(() => {
      navigate("/");
    }, 2000)
  };

  return (
    <div className='post'>
        <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
    </div>
  )
}

export default Post