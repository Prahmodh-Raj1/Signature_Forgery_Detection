import React,{useState} from 'react'
import axios from 'axios';
function Ann() {
    /*  
          const [selectedFile, setSelectedFile] = useState(null);
       
          const handleFileUpload = (event) => {
            setSelectedFile(event.target.files[0]);
          };
       
          const handleUpload = () => {
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post('/api/upload', formData)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          };
       
          */
          const [selectedFile, setSelectedFile] = useState(null);
  
          const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
          };
        
          const handleUpload = () => {
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post('http://127.0.0.1:8000/api/upload/ann', formData)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
        };
    return (
      <>
      <div className="h-screen">    
      <div className=" flex items-start justify-center text-center text-4xl font-bold">
          Implementation using Artificial Neural Nets
        </div>
        <div className="my-4 mt-16">
        <div className="mb-4">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload File
          </button>
        </div>
  
        {selectedFile && (
          <div>
            <p>Selected File: {selectedFile.name}</p>
            <p>File Size: {selectedFile.size} bytes</p>
          </div>
        )}
      </div>
      </div>
      
    </>
  
      
    )
  }

export default Ann