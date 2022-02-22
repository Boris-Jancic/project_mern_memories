import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
      <Router>
          <div className="App">
              <Container maxWidth="lg">
                  <Navbar />
                  <Routes>
                      <Route exact path='/' element={< Home />} />
                      <Route exact path='/auth' element={< Auth />} />
                  </Routes>
              </Container>
          </div>
      </Router>
  );
};

export default App;
