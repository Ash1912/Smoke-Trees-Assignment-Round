// src/api.js

const API_URL = 'http://127.0.0.1:5000/api/users';

export const addUser = async (userData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const getUsers = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.ok;
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};
