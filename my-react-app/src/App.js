import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';

function App() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(username);
    console.log(password);
    axios
      .post('/api/login', { username: username, password: password })
      .then(response => {
        navigate('/dashboard');
      })
      .catch(error => {
        setLoginError('Invalid username or password');
        console.error(error);
      });
  };

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error('Error retrieving data:', error));
  }, []);

  return (
    <div className="body-login">
      <main className="mainContainerLogin">
        {/* <h2>Songs List</h2>
        <ul>
          {songs.map(song => (
            <div key={song.id}>
              <p>
                {song.name} - {song.author}
              </p>
            </div>
          ))}
        </ul> */}
        <h1 className="h1-login">Login screen</h1>
        <input type="text" placeholder="Input username" onChange={event => setUsername(event.target.value)} />
        <input type="text" placeholder="Input password" onChange={event => setPassword(event.target.value)} />
        <button type="submit" onClick={handleSubmit} id='submitButton'>
          Log in
        </button>
        {loginError && <p className="login-error">{loginError}</p>}
      </main>
    </div>
  );
}

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
