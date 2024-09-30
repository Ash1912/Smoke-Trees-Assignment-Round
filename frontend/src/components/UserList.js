import React, { useEffect, useState } from 'react';
import '../assets/css/UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getusers');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getusers/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json(); // Get the success message
        console.log(data.message); // Optional: log success message to console
        fetchUsers(); // Refresh the user list
      } else {
        const errorData = await response.json(); // Get error from response
        setError(`Failed to delete user: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  // Update user function
  const updateUser = (id) => {
    const newName = prompt("Enter the new name for the user:");
    if (newName) {
      fetch(`http://localhost:5000/api/getusers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),  // Assuming you're only updating the name
      })
        .then(() => {
          fetchUsers(); // Refresh after update
        })
        .catch((error) => console.error('Error updating user:', error));
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User List</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Addresses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <table className="inner-table">
                  <tbody>
                    {user.addresses.map((address, index) => (
                      <tr key={index}>
                        <td>{address.street}, {address.city}, {address.state}, {address.zip_code}, {address.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="actions-column">
                <button className="btn delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                <button className="btn update-btn" onClick={() => updateUser(user.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
