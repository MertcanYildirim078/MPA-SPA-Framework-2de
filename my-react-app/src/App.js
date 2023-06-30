import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// use effect is dat het 1 keer called en wanneer het veranderd dan pas rope het nog ee keer

function App() {
  const [data, setData] = useState(null);
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('/api/songs')
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error('Error retrieving data:', error));
  }, []);


  return (
    <div className="body-login">
      	<main className="mainContainerLogin">

        <h2>Songs List</h2>

      <ul>
        {songs.map((song) => (
          <div key={song.id}>
          <p>{song.name} - {song.author}</p>
          </div>
        ))}
      </ul>

        
            <h1 className="h1-login">Login screen</h1>
            <input type={"text"} placeholder={"Input username"} id='username' onChange={(event) => setUsername(event.target.value)}/>
            <input type={"text"} placeholder={"Input password"} id='password'onChange={(event) => setPassword(event.target.value)}/> 
            <button type="submit" onClick={() => console.log(username)}>Submit</button>
        
        </main>
    </div>
  );
}

export default App;
