import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import CreatePlaylists from './components/CreatePlaylists';
import Playlists from './components/Playlists';
import Player from './components/Player';
import './assets/styles/App.css'

export default function App() {
  return (
    <Router>
      <div style={{
        display: "flex",
        background: 'black',
        padding: '5px 0 5px 5px',
        fontSize: '20px'
      }}>
        <div style={{ margin: '10px' }}>
          <NavLink to="/" style={({ isActive }) => ({
            color: isActive ? 'greenyellow' : 'white'
          })}>
            Create
          </NavLink>
        </div>
        <div style={{ margin: '10px' }}>
          <NavLink to="/playlists" style={({ isActive }) => ({
            color: isActive ? 'greenyellow' : 'white'
          })}>
            Playlists
          </NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<CreatePlaylists />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:id" element={<Player />} />
      </Routes>
    </Router>
  );
}
