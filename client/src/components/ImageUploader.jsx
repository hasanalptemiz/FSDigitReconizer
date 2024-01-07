import React from "react";
import './ImageUploader.css'


const ImageUploader = () => {

    const inputRef = React.useRef();

    //State cariables for tracking image-related informations
    const [image, setImage] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [processStatus, setProcessStatus] = React.useState("select"); //select, processing, done

    //Handles image change
    const handleImageChange = (e) => {
        if (e.target.files[0] && e.target.files[0].type.includes("file")) {
            setImage(e.target.files[0]);
            setProcessStatus("processing");
        }
        
    };

    //Handles image upload

    const onChooseFile = () => {
        inputRef.current.click();
    }
    

    return (
        <div>
            {/*Image input*/} 
            <input 
            type="file" 
            ref={inputRef} 
            onChange={handleImageChange} 
            style={{display: "none"}}
            />

            {/*Upload button*/}
            {!image && (
                <button className="image-uploader-button" onClick={onChooseFile}>
                    <span className="mateial-icons">Choose File</span>
                    Upload File
                    </button>
            )}
        </div>
    );
}

export default ImageUploader;