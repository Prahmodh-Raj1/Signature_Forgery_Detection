import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
    const navigate = useNavigate()
const handleClickAlgo = ()=>{
    navigate('/algo')
}

const handleClickANN= ()=>{
    navigate('/ann')
}

const handleClickCNN = ()=>{
    navigate('/cnn')
}
  return (
    <>
    <div className='p-4'>
        <h2 className="text-5xl font-bold text-black mb-36">Signature Forgery Detection</h2>
    </div>
    <div className="flex space-x-4">
        <button onClick={handleClickAlgo} className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-3 px-6 rounded-lg">
          ML Algorithms
        </button>
        <button onClick={handleClickANN} className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-3 px-6 rounded-lg">
          Artificial Neural Nets
        </button>
        <button onClick={handleClickCNN} className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-3 px-6 rounded-lg">
          Conv Neural Nets
        </button>
      </div>
    </>
  )
}

export default Home