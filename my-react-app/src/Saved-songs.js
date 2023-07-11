import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Savedsongs() {
    return (
      <div className='body-Savedsongs'>
        <main className="mainContainerSavedsongs">
          <nav className='navBar'>
            <ul className='navBarContainer'>
              <li style={{ position: 'absolute', left: '0' }}><a className="logOutButton" href='/'>Log out</a></li>
              <li><a href='/dashboard'>Songs</a></li>
              <li><a href='/savedsongs'>Saved songs</a></li>
            </ul>
          </nav>
        </main>
      </div>
    );
  }
  
  export default Savedsongs;
   