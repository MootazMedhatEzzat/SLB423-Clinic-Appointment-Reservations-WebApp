import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import DoctorDashBoardPage from './DoctorDashBoardPage';
import PatientDashboardPage from './PatientDashboardPage';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/doctors/dashboard" element={<DoctorDashBoardPage />} />
          <Route path="/patients/dashboard" element={<PatientDashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;