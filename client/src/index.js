import './index.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes,Outlet } from 'react-router-dom';
import {StrictMode} from 'react';
import App from './App';
import LoginPage from './LoginPage';
import { createRoot } from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.css';



const Root = () => {

  function ProtectedRoutes() {
    const token = localStorage.getItem('token');
  
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
  // Check if the user is logged in based on the token in local storage
// Empty dependency array ensures the effect runs once after the initial render

  return (
    <Router>
      <Routes>   
      <Route element={<ProtectedRoutes />}>  
      <Route
        exact
        path="/"
        element={(<App /> )}
      />
       </Route>
      <Route
        exact
        path="/login"
        element={(<LoginPage/> )}
      />
      </Routes> 
    </Router>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<StrictMode>
  <Root />
</StrictMode>);

