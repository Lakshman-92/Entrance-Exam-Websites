import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const passwordStrength = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordStrength.test(password)) {
      setError('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    setError('');
    setSuccess(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-lg p-8 bg-gray-800 shadow-xl rounded-lg transform transition-all duration-500 ease-in-out opacity-100 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">NATIONAL INSTITUTE OF TECHNOLOGY JALANDHAR</h1>
          <p className="text-lg text-gray-400 mt-2">Entrance Exam Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-100">Register</h2>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
              aria-label="Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              required
              aria-label="Confirm Password"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">Registration successful! Please log in.</p>}

          {!success ? (
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Register
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
