import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from "react-icons/lu";

export default function ProfilePhtoSelecter({image, setImage}) {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            //Update the imgae state
            setImage(file);

            //generate a preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };


    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };


  return <div className='flex justify-center mb-6'>
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />
        { !image ? (
            <div className='w-20 h-20 flex items-center justify-center rounded-full bg-yellow-500 relative'>
                <LuUser className=' text-4xl text-primary'/>

                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-700 text-white absolute -bottom-1 -right-1'
                    onClick={onChooseFile}
                >
                    <LuUpload/>
                </button>
            </div>     
        ): (
            <div className='relative'>
                <img
                    src={previewUrl}
                    alt="profile photo"
                    className='w-20 h-20 rounded-full object-cover'
                /> 
                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white absolute -bottom-1 -right-1'
                    onClick={handleRemoveImage}
                >
                    <LuTrash/>
                </button>
            </div>  
        )}
        

    </div>
  
}
