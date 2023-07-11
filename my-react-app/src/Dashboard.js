import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Dashboard() {

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error('Error retrieving data:', error));
  }, []);

    return (
      <div className='body-dashboard'>
        <main className="mainContainerDashboard">

          <nav className='navBar'>
            <ul className='navBarContainer'>
              <li style={{ position: 'absolute', left: '0' }}><a href='/'>Log out</a></li>
              <li><a href='/dashboard'>Songs</a></li>
              <li><a href='/savedsongs'>Saved songs</a></li>
            </ul>
          </nav>

          <h1>Songs List</h1>
        <ul className='songsList'>
          {songs.map(song => (
            <div key={song.id}>
              <p>
                {song.name} - {song.author}
              </p>
            </div>
          ))}
        </ul> 

        </main>
      </div>
    );
  }
  
  export default Dashboard;
   