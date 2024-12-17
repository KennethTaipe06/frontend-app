import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [deleteUsername, setDeleteUsername] = useState('');

  useEffect(() => {
    axios.get('http://34.203.236.230:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    axios.post('http://34.203.236.230:5000/users', { username, email })
      .then(response => {
        alert('User added successfully');
        setUsers([...users, response.data]);
        setUsername('');
        setEmail('');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  const handleDeleteUser = () => {
    axios.delete(`http://34.203.236.230:5000/users/${deleteUsername}`)
      .then(response => {
        alert('User deleted successfully');
        setUsers(users.filter(user => user.username !== deleteUsername));
        setDeleteUsername('');
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Frontend App</h1>
      </header>
      <main>
        <div>
          <h2>User List</h2>
          <ul>
            {users.map(user => (
              <li key={user.username}>{user.username} - {user.email}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Add User</h2>
          <form onSubmit={handleAddUser}>
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Add User</button>
          </form>
        </div>
        <div>
          <h2>Delete User</h2>
          <input type="text" value={deleteUsername} onChange={(e) => setDeleteUsername(e.target.value)} placeholder="Username" required />
          <button onClick={handleDeleteUser}>Delete User</button>
        </div>
      </main>
    </div>
  );
}

export default App;
