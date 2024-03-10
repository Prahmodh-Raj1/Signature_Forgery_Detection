import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Button from './Button';
import StyledText from './StyledText';
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
        
        <StyledText text= "SIGNATURE FORGERY DETECTION"/>
    </div>
    <div className="flex space-x-36 mt-12">
    
    <Button text = "ML ALGORITHMS" color = "#0FF0FC" onClick={handleClickAlgo}/>
    <Button text = "ARTIFICIAL NEURAL NETWORK" color = "#f44c4c" onClick={handleClickANN}/>
    <Button text = "CONVOLUTIONAL NEURAL NETWORK" color = "#39FF14" onClick={handleClickCNN}/>
    </div>
    </>
  )
}

export default Home
