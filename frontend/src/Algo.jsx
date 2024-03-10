import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import StyledText from './StyledText';

function Algo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [result, setResult] = useState('.....');
    const [probabilities, setProbabilities] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a temporary URL for the selected image
        const tempUrl = URL.createObjectURL(file);
        setImageUrl(tempUrl);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://127.0.0.1:8000/api/upload/algo', formData)
            .then((response) => {
                setResult(response.data.message);
                setProbabilities(response.data.prediction);
            })
            .catch((error) => {
                setError('An error occurred while uploading.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const clearFile = () => {
        setSelectedFile(null);
        setImageUrl(null);
        setResult('.....');
        setProbabilities(null);
        setError(null);
    };

    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="text-center text-4xl font-bold mt-8">
                    <StyledText text="IMPLEMENTATION USING BEST PERFORMING ML ALGORITHM" color="#0FF0FC" />
                </div>
                <div className="mt-16 mx-auto">
                    <div className="mb-4 text-center">
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="flex justify-center gap-10">
                        <Button onClick={handleUpload} color="#0FF0FC" text="Upload and Test" />
                        <Button onClick={clearFile} color="#0FF0FC" text="Clear" />
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    {loading && <p className="text-center mt-4">Loading...</p>}
                    {selectedFile && (
                        <div className="flex justify-center py-8">
                        <div className="w-full sm:w-auto mb-6 mr-80"> 
                            <div>
                                <br />
                                <img src={imageUrl} alt="Uploaded File" className="w-48 h-48 object-contain border-4 border-gray-900 bg-white mx-auto" />
                            </div>
                        </div>
                        <div className="w-full sm:w-auto text-2xl font-bold flex flex-col items-center justify-center">
                            <h2 className="mb-2 text-shadow underline shadow-2px-2px-4px text-center">RESULT</h2>
                            <p>{result}</p>
                        </div>
                    </div>
                    
                    )}

                </div>
            </div>
        </>
    );
}

export default Algo;
