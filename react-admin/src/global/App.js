import React from 'react';
import './App.css';
import Home from './Home';
import Register from '../auth/register';
import Login2 from '../auth/login2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beauticians2 from './beauticians2';
import ClientsList from './clients';
import ServicesList from './services';
import BeauticiansList from './beauticians';
import Clients2 from './clients2';
import Services2 from './services2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login2" element={<Login2 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/beauticians" element={<BeauticiansList />} />
        <Route path="/clients2" element={<Clients2 />} />
        <Route path="/beauticians2" element={<Beauticians2 />} />
        <Route path="/services2" element={<Services2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
