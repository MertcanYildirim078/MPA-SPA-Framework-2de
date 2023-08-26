import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]); // Initialize as an empty array
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setFilteredSongs(data);
      })
      .catch(error => console.error('Error retrieving data:', error));

    // Fetch saved songs list
    fetch('/api/saved_songs_list')
      .then(response => response.json())
      .then(data => setSavedSongs(data))
      .catch(error => console.error('Error retrieving saved songs:', error));
  }, []);

  const handleGenreFilterChange = (event) => {
    const { value } = event.target;
    setGenreFilter(value);

    // Filter songs by genre
    const filtered = songs.filter(song => song.genre.toLowerCase().includes(value.toLowerCase()));
    setFilteredSongs(filtered);
  };

  const handleAddToSavedSongs = (songId) => {
    const songToAdd = songs.find(song => song.id === songId);

    // Check if the song is already in the saved songs list
    const isSongAlreadySaved = savedSongs.some(savedSong => savedSong.id === songToAdd.id);

    if (!isSongAlreadySaved) {
      // Add the song to the saved songs list in the database
      axios.post('/api/saved_songs_list', songToAdd)
        .then(response => {
          // Handle success, such as showing a notification
          // Fetch updated saved songs list to reflect the newly added song
          fetch('/api/saved_songs_list')
            .then(response => response.json())
            .then(data => setSavedSongs(data))
            .catch(error => console.error('Error retrieving saved songs:', error));
        })
        .catch(error => {
          // Handle error, such as showing an error message
          console.error(error);
        });
    } else {
      // Handle case when the song is already saved
      // For example, show a message saying "Song already saved"
      alert('Already saved!')
    }
  };

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
        <input type="text" placeholder="Filter by genre" value={genreFilter} onChange={handleGenreFilterChange} />

        <ul className='songsList'>
          {filteredSongs.map(song => (
            <div key={song.id}>
              <p>
                {song.name} - {song.author} - {song.genre}
              </p>
              <button onClick={() => handleAddToSavedSongs(song.id)}>Add to Saved songs</button>
            </div>
          ))}
        </ul> 

      </main>
    </div>
  );
}

export default Dashboard;
