# Smoke-Trees-Assignment-Round

# Address Management System

This project is an Address Management System that allows users to add and manage addresses associated with registered users. It consists of a backend built with Node.js and Express, and a frontend developed using React.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
  - [Backend Directory Structure](#backend-directory-structure)
  - [Frontend Directory Structure](#frontend-directory-structure)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **Backend**: Flask, SQLAlchemy (for ORM)
- **Frontend**: React, Axios
- **Styling**: CSS
- **Others**: Postman (for testing APIs)

## Installation

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd backend

2. **Install Dependencies**: Make sure you have Python installed, then create a virtual environment and install the requirements:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt

3. **Set Up Environment Variables**: Create a .env file in the backend directory with the following content:
   ```bash
   DATABASE_URL=your_database_url
   FLASK_ENV=development


4. **Set Up Database**:
   - Create a database in your preferred SQL or NoSQL database.
   - Create the necessary tables:
     - Users Table: id, name
     - Addresses Table: id, user_id, street, city, state, zip_code, country

5. **Run Backend Application**:
   ```bash
   python app.py

  The backend will run on 
  ```bash
   http://localhost:5000
  ```

### Frontend Setup
1. **Create react app**:
   ```bash
   npx create-react-app frontend

2. **Navigate to Frontend Directory**:
   ```bash
   cd frontend

3. **Install Dependencies**:
   ```bash
   npm install

4. **Start the React Application**:
   ```bash
   npm start

The frontend will run on
```bash
http://localhost:3000
```

## Project Structure

### Backend Directory Structure

```bash
backend/
│
├── app.py                 # Main application code
├──database.py
├── .env                 # Environment variables
├── requirements.txt     # Python dependencies
└── models.py
```

### Frontend Directory Structure

```bash
frontend/
│
├── node_modules/
├── public/
|   ├── index.html
├── src/
│   ├── components/      # React components
│   ├── assets/          # Static assets (CSS, images)
│   ├── api.js
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point for the React app
|   ├── styles.css
│   └── package.json     # React dependencies
```

## API Endpoints

### Users
-GET /api/getusers - Fetch all users
-POST /api/addusers - Add a new user (requires name in the request body)

### Addresses
-POST /api/addresses - Add a new address associated with a user (requires street, city, state, zip_code, country, and user_id in the request body)

## Frontend Usage
1. **Home Page**:

Navigate to the home page where you can add a new address for a selected user.
The application allows you to select a user from the dropdown and enter the address details.

2. **Add User Submit Form**:

After filling out the form, click the "Register" button.

3. **View Users**:

Upon successful submission, you will be redirected to the User List page to view all users and their associated addresses.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue to suggest changes or report bugs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```bash

### Customization Tips:
- **Replace `<repository-url>`**: Update it with your actual repository URL.
- **Database URL**: Ensure that you provide specific instructions on how to set up the database URL in the `.env` file.
- **Dependencies**: Include any other specific dependencies that might be relevant for your Flask project.

Let me know if you need further adjustments or additions!
```


