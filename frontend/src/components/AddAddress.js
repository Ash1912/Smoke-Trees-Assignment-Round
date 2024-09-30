import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/css/AddAddress.css';  // Add the CSS file reference

const AddAddress = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/getusers')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error fetching users:', error);
        setErrorMessage('Failed to fetch users');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      setErrorMessage('Please select a user');
      return;
    }

    const addressData = {
      street,
      city,
      state,
      zip_code,
      country,
      user_id: selectedUser, // Sending user ID as per the backend
    };

    fetch('http://localhost:5000/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setSuccessMessage('Address added successfully!');
        setErrorMessage('');  // Clear any previous error messages
        
        // Reset form fields after submission
        setSelectedUser('');
        setStreet('');
        setCity('');
        setState('');
        setZipCode('');
        setCountry('');

        // Navigate to the user list page after a successful submission
        navigate('/'); // Change this to the correct path for your User List page
      })
      .catch((error) => {
        console.error('Error adding address:', error);
        setErrorMessage('Failed to add address');
        setSuccessMessage('');  // Clear success message in case of error
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Address</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="address-form" onSubmit={handleSubmit}>
        <select
          className="form-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <input
          className="form-input"
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Zip Code"
          value={zip_code}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <button className="form-button" type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default AddAddress;
