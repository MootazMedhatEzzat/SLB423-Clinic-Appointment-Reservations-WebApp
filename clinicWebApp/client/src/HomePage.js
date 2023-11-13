import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import './css/HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
  <div className="home-container">
    <h1>Welcome to Clinic Appointment Reservations</h1>
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/signin">
                        SignIn
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/signup">
                         SignUp
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    </div>
  );
}

export default HomePage;
