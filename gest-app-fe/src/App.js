import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './Utils/PrivateRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';



import './App.css';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:3010/auth/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.correo);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
 return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="content">
              <Routes>
                <Route path="/" exact="true" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={
                      <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }  
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
}

export default App;
