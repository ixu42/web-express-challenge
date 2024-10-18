import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Pokedex from './pages/pokedex';
import Profile from './pages/profile';
import Login from './pages/login';
import './App.css';
import PokemonProfile from './pages/pokemon_profile';
import './index.css'
import Footer from './components/footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ErrorBoundary>
                  <Pokedex />
                </ErrorBoundary>
              }
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/pokemon/:name" element={<PokemonProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
