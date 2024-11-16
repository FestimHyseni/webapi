// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';

import NoMatch from './components/nomatch/noMatch';
import Register from './components/Register';
import Login from './components/Login';
import { AddItem, EditItem, ItemList } from './components/CrudTest'; // Import CRUD components
import Home from './components/Home';
import "./App.css"



function App() {

 

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="ItemList" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/items" element={<ItemList />} />
            <Route path="/add" element={<AddItem />} /> 
            <Route path="/edit/:id" element={<EditItem />} /> 

          <Route path="*" element={<NoMatch />} /> {/* Për rrugët e paidentifikuara */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
