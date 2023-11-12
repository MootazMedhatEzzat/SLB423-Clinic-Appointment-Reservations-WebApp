import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/SignIn.css';

const SignIn = () => {

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signin', user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userRole', response.data.role);
      if (response.data.role === 'doctor') {
        navigate('/doctors/dashboard');
      } else {
        navigate('/patients/dashboard');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;