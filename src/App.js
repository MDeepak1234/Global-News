import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <>
          {isLoggedIn && <NavBar />}
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Login onLogin={this.handleLogin} />
              }
            />
            {isLoggedIn ? (
              <>
                <Route path="/" element={<News key="general" pageSize={18} category="general" />} />
                <Route path="/business" element={<News key="business" pageSize={18} category="business" />} />
                <Route path="/entertainment" element={<News key="entertainment" pageSize={18} category="entertainment" />} />
                <Route path="/general" element={<News key="general" pageSize={18} category="general" />} />
                <Route path="/health" element={<News key="health" pageSize={18} category="health" />} />
                <Route path="/science" element={<News key="science" pageSize={18} category="science" />} />
                <Route path="/sports" element={<News key="sports" pageSize={18} category="sports" />} />
                <Route path="/technology" element={<News key="technology" pageSize={18} category="technology" />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </>
      </Router>
    );
  }
}
