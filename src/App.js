import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Boards from './component/Boards';
import EachBoard from './EachBoard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Boards/>}></Route>
          <Route path='/boards/:id' element={<EachBoard></EachBoard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
