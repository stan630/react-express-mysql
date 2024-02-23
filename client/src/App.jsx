import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import Roster from './pages/Roster'
import AddPlayer from "./pages/AddPlayer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
            <Route exact path="/" element={<Roster />}/>
            <Route path="/add" element={<AddPlayer/>}/>
            <Route path="/update/:id" element={<AddPlayer/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
