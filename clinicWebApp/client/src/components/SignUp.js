import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/SignUp.css';

const SignUp = () => {

  // Initialize the useNavigate hook
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signup', user);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('userId', response.data.userId); 
      localStorage.setItem('name', user.name); 
      if (user.role === 'doctor') {
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
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
