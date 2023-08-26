import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Savedsongs() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    fetch('/api/saved_songs_list')
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setFilteredSongs(data);
      })
      .catch(error => console.error('Error retrieving data:', error));
  }, []);

  const handleGenreFilterChange = (event) => {
    const { value } = event.target;
    setGenreFilter(value);

    // Filter the songs based on genre
    const filtered = songs.filter(song => song.genre.toLowerCase().includes(value.toLowerCase()));
    setFilteredSongs(filtered);
  };

  return (
    <div className='body-Savedsongs'>
      <main className="mainContainerSavedsongs">
        <nav className='navBar'>
          <ul className='navBarContainer'>
            <li style={{ position: 'absolute', left: '0' }}><a href='/'>Log out</a></li>
            <li><a href='/dashboard'>Songs</a></li>
            <li><a href='/savedsongs'>Saved songs</a></li>
          </ul>
        </nav>

        <h1>Saved songs</h1>
        {genreFilter && (
          <input
            type="text"
            placeholder="Filter by genre"
            value={genreFilter}
            onChange={handleGenreFilterChange}
          />
        )}

        <ul className='songsList'>
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <div key={song.id}>
                <p>
                  {song.name} - {song.author} - {song.genre}
                </p>
              </div>
            ))
          ) : (
            <p>No songs found.</p>
          )}
        </ul>

      </main>
    </div>
  );
}

export default Savedsongs;
