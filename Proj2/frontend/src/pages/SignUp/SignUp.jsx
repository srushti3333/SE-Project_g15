import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 
import { signupUser } from '../../api/auth';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // Check if all inputs are filled
    const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword && password === confirmPassword;

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            // Dummy API call using Axios
            const response = await signupUser(username, email, password);

            const data = await response.json();
            console.log('Signup response:', data);

            alert('Signup successful! You can now login.');

            // Clear inputs
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Redirect to login page after signup
            navigate('/login');

        } catch (err) {
            console.error('Signup error:', err);
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={isFormValid ? 'active' : ''}
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                {error && <p className="error-message">{error}</p>}
            </form>

            <div className="login-section">
                <p>Already have an account?</p>
                <button
                    type="button"
                    className="login-button"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignUp;
