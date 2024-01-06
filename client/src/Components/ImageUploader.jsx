import React, {useState} from "react";
import './ImageUploader.css';

const ImageUploader = () => {  
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            previewImage(file);
        }
    };
    const handleDrop = (e) => { 
        e.preventDefault();
        
        const file = e.dataTransfer.files[0];
        if (file) {
            previewImage(file);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);

    };


    // write return code according to upside funcs a Drag and Drop area to upload Image and show that image in middle of the page
    // i need to resize the image to 200x200 px change below code to do that
    


    return (
        <div
      className="flex flex-col items-center justify-center border-dashed border-2 border-gray-500 p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}   
    >
      {!image ? (
        <div className="mb-4">
          <label htmlFor="image" className="cursor-pointer">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-blue-500">Choose or Drag & Drop an Image</span>
          </label>
        </div>
      ) : (
        <div className="mb-4">
          <img src={image} alt="Selected" className="max-w-full max-h-64" />
        </div>
      )}
    </div>
    );

};

export default ImageUploader;
