import React,{useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import './Cnn.css';
import Button from './Button';
import StyledText from './StyledText';


Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);
function Cnn() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [result,setResult] = useState('.....');
  const [probabilities,setProbabilities] = useState([[0,0]]);
  const [uploaded, setUploaded] = useState(false);
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

    axios.post('http://127.0.0.1:8000/api/upload/cnn', formData)
      .then((response) => {
        console.log(response.data);
        setResult(response.data.message);
        setProbabilities(response.data.prediction)
        probabilities[0][0] = parseFloat(probabilities[0][0].toFixed(2))
        probabilities[0][1] =parseFloat(probabilities[0][1].toFixed(2))
        setUploaded(true)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const chartData = {
    labels: ['Real', 'Forged'],
    datasets: [
      {
        label: 'Probabilities',
        data: probabilities[0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',  // Real
          'rgba(255, 99, 132, 0.7)'   // Forged
        ],
        //aabackgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,  // Maximum value for probability (adjust as needed)
        weight: 'bold',
        color: 'black' // Adjust color for y-axis labels
      },
      x: {
        weight: 'bold',
        color: 'black' // Adjust color for x-axis labels
      }
    },
    plugins: {
      datalabels: {
        formatter: (value) => value.toFixed(2),
        color: 'black',
        font: {
          weight: 'bold'
        }
      },
      title: {
        display: true,
        text: 'Detection Chart',
        font: {
          size: 20,
          weight: 'bold'
        }
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImageUrl(null);
    setResult('.....');
    setProbabilities([[0,0]]);
    setError(null);
    setUploaded(null);
  };

  return (
    <>
    <div className = "root" style = {{marginBottom: "300px"}}>
    <div className="h-screen">
      <div className="flex items-start justify-center text-center text-4xl font-bold">
        <StyledText text = "IMPLEMENTATION USING CNN" color = "#39FF14"/>
      </div>
      <div className="my-4 mt-16">
        <div className="mb-4">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-center gap-10">
          <Button onClick={handleUpload} color = "#39FF14" text = "Upload and Test"/>
          <Button onClick={clearFile} color="#39FF14" text="Clear" />
        </div>
  
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {loading && <p className="text-center mt-4">Loading...</p>}
        {selectedFile && (
          <div className="flex flex-wrap justify-between py-6">
            <div className="w-full sm:w-auto mb-5 mr-4">
              <div>
                <br></br>
                {/* Display the uploaded image */}
                <img src={imageUrl} alt="Uploaded File" className="w-48 h-48 object-contain border-4 border-gray-900 bg-white"/>
              </div>
            </div>
            <div className='w-full sm:w-auto text-2xl font-bold flex flex-col items-center justify-center ml-[-20px]'>
              <h2 className="mb-2 text-shadow underline shadow-2px-2px-4px">RESULT</h2>
              <p>{result}</p>
            </div>
          </div>
        )}
  
        {uploaded && (
          <div className="overflow-hidden" style={{ padding: '20px', margin: 'auto', width: '70%', height: '70%', backgroundColor: '#f2f2f2' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'linear-gradient(to right, #00b7ff, #009dff)',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px',
              textDecoration: 'underline',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Detection Chart
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
    </div>
  </>
  
  );
  
  }

export default Cnn