import React, {useRef, useState} from "react";
import './ImageUploader.css'
import axios from "axios";

const ImageUpload = () => {
    const inputRef = useRef();
  
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState("select");
  
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
  
    const handleUpload = async () => {
      if (uploadStatus === "done") {
        clearImageinput();
        return;
      }
  
      try {
        setUploadStatus("uploading");
  
        const formData = new FormData();
        formData.append("file", image);
  
        const response = await axios.post(
          "http://localhost:8000/api/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          }
        );
  
        setUploadStatus("done");
      } catch (error) {
        setUploadStatus("select");
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
            <span className="material-symbols-outlined">upload</span> Upload File
          </button>
        )}
  
        {image && (
          <>
            <div className="file-card">
              <span className="material-symbols-outlined icon">description</span>
  
              <div className="file-info">
                <div style={{ flex: 1 }}>
                  <h6>{image?.name}</h6>
  
                  <div className="progress-bg">
                    <div className="progress" style={{ width: `${progress}%` }} />
                  </div>
                </div>
  
                {uploadStatus === "select" ? (
                  <button onClick={clearImageinput}>
                    <span class="material-symbols-outlined close-icon">
                      close
                    </span>
                  </button>
                ) : (
                  <div className="check-circle">
                    {uploadStatus === "uploading" ? (
                      `${progress}%`
                    ) : uploadStatus === "done" ? (
                      <span
                        class="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        check
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <button className="recognize-btn" onClick={handleUpload}>
              {uploadStatus === "select" || uploadStatus === 'Recognizing' ? "Recognize" : "Done"}
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default ImageUpload;