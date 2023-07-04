import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    return (
      <div className='body-dashboard'>
        <main className="mainContainerDashboard">
          <nav className='navBarDashboard'>
            <ul>
              <li><a href='/'>Log out</a></li>
              <li><a href='/'>Log out</a></li>
              <li><a href='/'>Log out</a></li>
            </ul>
          </nav>
        </main>
      </div>
    );
  }
  
  export default Dashboard;
   