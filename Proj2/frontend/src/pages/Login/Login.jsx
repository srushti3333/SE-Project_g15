import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../../api/auth';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Check if both inputs are filled
    const isFormValid = username.trim() !== '' && password.trim() !== '';

    const handlelogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Dummy API call 
            const response = await loginUser(username, password);

            const data = await response.json();
            console.log('API response:', data);

            alert('Login successful!');
            navigate('/dashboard');  // go to dashboard if the user is successfully logged in
            setPassword('');
            setUsername('');

            // Handle successful login (e.g., redirect, store token, etc.)

        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Log In</h1>

            <form className="login-form" onSubmit={handlelogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button
                    type="submit"
                    className={isFormValid ? 'active' : ''}
                    disabled={loading || !isFormValid}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>

            <p className="signup-redirect">
                Don't have an account?{' '}
                <span onClick={() => navigate('/signup')} className="signup-link">
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default Login;
