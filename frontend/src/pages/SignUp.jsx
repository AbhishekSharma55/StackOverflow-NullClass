import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        username: name,
        email : email,
        password : password,
      });

      if (response.status === 200) {  // Assuming 201 Created is the success status code
        // Save the token in local storage or cookies if necessary
        localStorage.setItem('token', response.data.token);
        // Redirect to the homepage or any other page
        navigate('/', { state: { verificationMessage: 'Signup successful! You can now login.' } });
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <img src="/minimallogo.png" alt="StackOverflow Logo" width={40} height={40} />
            <h2 className="text-2xl">Create an account</h2>
            <p>Enter your details below to sign up for a new account.</p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4 mt-4" onSubmit={handleSignup}>
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Enter your full name"
                className="border p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border p-2 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                className="border p-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="border p-2 rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
              <button type="submit" className="w-full sm:w-auto bg-orange-500 text-white p-2 rounded">
                Sign up
              </button>
              <div className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-gray-900 hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
