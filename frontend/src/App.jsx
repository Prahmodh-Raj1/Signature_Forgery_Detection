import { useState } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Algo from './Algo';
import Ann from './Ann';
import Cnn from './Cnn';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/algo" element={<Algo/>} />
          <Route path="/ann" element={<Ann/>}/>
          <Route path='/cnn' element={<Cnn/>}></Route>
          
        </Routes>
      </BrowserRouter>

      {/* The rest of your content goes here */}
    
    </>
  );
}

export default App;
