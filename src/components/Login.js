import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate('/');
  };

  return (
    <div className="container" style={{"padding":"1rem","height":"100%"}}>
      <form onSubmit={handleSubmit}>
        <h2 style={{"margin":"1rem"}}>Login</h2>
        <input style={{"margin":"1rem"}}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input style={{"margin":"1rem"}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button style={{"margin":"1rem"}} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
