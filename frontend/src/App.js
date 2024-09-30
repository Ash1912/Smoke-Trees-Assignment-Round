import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import AddAddress from './components/AddAddress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-address" element={<AddAddress />} />
      </Routes>
      {/* Render Footer only on specific routes */}
      {location.pathname !== '/add-user' && <Footer />}
    </>
  );
};

// Wrap the entire App component in Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
