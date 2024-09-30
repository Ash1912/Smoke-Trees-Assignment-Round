import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/css/AddUser.css';

const AddUser = () => {
  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState([{ street: '', city: '', state: '', zip_code: '', country: '' }]);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index][name] = value;
    setAddresses(updatedAddresses);
  };

  const addAddress = () => {
    setAddresses([...addresses, { street: '', city: '', state: '', zip_code: '', country: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, addresses };

    fetch('http://localhost:5000/api/addusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // After successful submission, navigate to the UserList page
        navigate('/'); // Replace with your correct route
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        
        <h3 className="addresses-title">Addresses</h3>
        {addresses.map((address, index) => (
          <div key={index} className="address-section">
            <div className="form-group">
              <label htmlFor={`street-${index}`}>Street Address</label>
              <input
                id={`street-${index}`}
                type="text"
                name="street"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) => handleAddressChange(index, e)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`city-${index}`}>City</label>
              <input
                id={`city-${index}`}
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`state-${index}`}>State</label>
              <input
                id={`state-${index}`}
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`zip_code-${index}`}>Zip Code</label>
              <input
                id={`zip_code-${index}`}
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                value={address.zip_code}
                onChange={(e) => handleAddressChange(index, e)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`country-${index}`}>Country</label>
              <input
                id={`country-${index}`}
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={(e) => handleAddressChange(index, e)}
                required
                className="input-field"
              />
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button type="button" onClick={addAddress} className="btn btn-secondary">Add Another Address</button>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
