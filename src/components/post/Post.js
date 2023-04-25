import React, { useState } from 'react';
import './post.css';
import {ref, uploadBytes} from 'firebase/storage'
import { storage } from '../../dbconfig/firebase';




const Post = () => {
    const [fileUpload, setFileUpload] = useState(null);
    

    const uploadFile = async () => {
      if(!fileUpload) return;
      const filesFolderRef = ref(storage, `userFiles/${fileUpload.name}`);
      try {
        await uploadBytes(filesFolderRef, fileUpload);
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div className='post'>
        <h1>post</h1>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
    </div>
  )
}

export default Post