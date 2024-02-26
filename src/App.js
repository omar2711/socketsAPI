import React from 'react';
import ServerComponent from './components/servercomponent.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClientPage } from './pages/clientPage.js';
import { server } from './pages/serverPage.js';
import { Button } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientPage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
