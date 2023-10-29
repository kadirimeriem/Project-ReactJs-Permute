import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication successful, redirect or handle as needed
        console.log('Authentication successful!');
        const res = await response.json();
        console.log(res);
        await localStorage.setItem('token', JSON.stringify(res));

        navigate('/');
      } else {
        // Authentication failed, display error message
        setError('Invalid username or password');
      }
    } catch (error) {
      alert('Invalid username or password');
      console.error('Error during login:', error);
      setError('Error during login, please try again later');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Login</h1>
      
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Link to="/registartionPage">
        <p>Créer un compte ?</p>
      </Link>
        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>

        {error && <div className="mt-3 text-danger">{error}</div>}
      </Form>
    </Container>
  );
};

export default LoginPage;
