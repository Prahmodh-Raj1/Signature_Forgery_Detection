import React,{useState} from 'react'
import axios from 'axios';
function Cnn() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [result,setResult] = useState('.....');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a temporary URL for the selected image
    const tempUrl = URL.createObjectURL(file);
    setImageUrl(tempUrl);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://127.0.0.1:8000/api/upload/cnn', formData)
      .then((response) => {
        console.log(response.data);
        setResult(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex items-start justify-center text-center text-4xl font-bold">
          Implementation using Best Performing ML Algorithm
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
              {/* Display the uploaded image */}
              {imageUrl && <img src={imageUrl} alt="Uploaded File" className="max-w-full h-auto" />}
            </div>
          )}
          <div className='mb-4'>
            {result}
          </div>
        </div>
      </div>
    </>
  );
  }

export default Cnn
