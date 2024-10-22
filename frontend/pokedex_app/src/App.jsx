import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import './index.css'
import ErrorBoundary from './ErrorBoundary';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/footer';
import Pokedex from './pages/pokedex';
import Login from './pages/login';
import Profile from './pages/profile';
import PokemonProfile from './pages/pokemon_profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Community from "./components/Community";
import PageNotFound from './pages/pageNotFound';

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
            <Route path="/Community" element={<Community/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
