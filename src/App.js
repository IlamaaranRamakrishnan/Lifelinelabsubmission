import React from "react";
import './App.css';

import Login from "./Login";
import Display from "./Display";
import { Routes, Route } from "react-router-dom";


//import CryptoJS from "crypto-js";

function App() {

  

  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/display" element={<Display/>} />
      </Routes>



    </div>
  );
}

export default App;
