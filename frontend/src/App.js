import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import User from './Components/Users/User';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/user" exact element={<User />} />
      </Routes>
    </>
  );
}

export default App;
