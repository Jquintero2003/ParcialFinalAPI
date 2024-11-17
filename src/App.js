import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilmList from './components/FilmList';
import FilmDetails from './components/FilmDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path="/film/:id" element={<FilmDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
