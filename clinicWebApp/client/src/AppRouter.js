import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import DoctorDashBoardPage from './DoctorDashBoardPage';
import PatientDashboardPage from './PatientDashboardPage';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
