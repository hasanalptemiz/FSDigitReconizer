import React, {useRef, useState} from "react";
import './ImageUploader.css'
import axios from "axios";

const ImageUpload = () => {
    const inputRef = useRef();
  
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState("select");
    const [result, setResult] = useState(null); 
  
    const handleFileChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
        setImage(event.target.files[0]);
        
      }
    };
  
    const onChooseFile = () => {
      inputRef.current.click();
    };
  
    const clearImageinput = () => {
      inputRef.current.value = "";
      setImage(null);
      setProgress(0);
      setUploadStatus("select");
    };


    const handleRecognize = async () => {
      try {
        if (uploadStatus === "done") {
          setResult(null);
          clearImageinput();
          return;
        }

    
        setUploadStatus("Recognizing");
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post("http://localhost:8000/recognize", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
         // Log the response for debugging
        setResult(response.data);
        setUploadStatus("done");
        
      }catch (error) {
        setUploadStatus("select");
        console.log(error);
      }
    };

      
    return (
      <div>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
  
        {/* Button to trigger the file input dialog */}
        {!image && (
          <button className="file-btn" onClick={onChooseFile}>
            <span className="material-symbols-outlined">upload</span> Upload Image
          </button>
        )}
  
        {image && (
          <>
            <div className="file-card">
              
              <div className="file-info">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="preview-img"
                />
                 {result && (
                <span className="predicted-digit">{result.predicted_digit}</span>
                )}
  
                {uploadStatus === "select" ? (
                  <button onClick={clearImageinput}>
                    <span className="material-symbols-outlined close-icon">
                      close
                    </span>
                  </button>
                ) : (
                  <div className="check-circle">
                    {uploadStatus === "uploading" ? (
                      `${progress}%`
                    ) : uploadStatus === "done" ? (
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        check
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <button className="recognize-btn" onClick={handleRecognize}>
              {uploadStatus === "select" || uploadStatus === 'Recognizing' ? "Recognize" : "Done"}
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default ImageUpload;