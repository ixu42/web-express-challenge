import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Pokedex from './pages/pokedex';
import Profile from './pages/profile';
import Login from './pages/login';
import './App.css';
import PokemonProfile from './pages/pokemon_profile';
import './index.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Pokedex/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/pokemon/:name" element={<PokemonProfile />} />
      </Routes>
    </Router>
  )
}

export default App
