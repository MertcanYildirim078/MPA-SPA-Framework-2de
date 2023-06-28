import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('/api/songs')
      .then((response) => {
        const songsData = response.data.map((songs) => {
          // Map the attributes to a simplified object
          return {
            id: songs.id,
            name: songs.Name,
            artist: songs.Artist,
            genre: songs.Genre,
          };
        });
        setSongs(songsData);
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
        // Handle error and set an appropriate state
      });
  }, []);

  return (
    <div className="body-login">
      	<main className="mainContainerLogin">

          <h1>Songs</h1>

          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.name} - {song.artist} ({song.genre})
              </li>
            ))}
          </ul>

          <form className="form-login">
            <h1 className="h1-login">Login screen</h1>
            <input type={"text"} placeholder={"Input username"}/>
            <input type={"text"} placeholder={"Input password"}/>
            <button type="submit">Submit</button>
          </form>
          
        </main>
    </div>
  );
}

export default App;
