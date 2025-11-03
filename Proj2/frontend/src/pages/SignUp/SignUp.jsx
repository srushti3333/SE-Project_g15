// src/pages/SignUp/SignUp.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { signupUser } from '../../api/auth';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import './SignUp.css';

const validateSignup = (values) => {
  const errors = {};
  
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match!';
  }
  
  if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return errors;
};

const SignUp = () => {
  const navigate = useNavigate();
  
  const { values, errors, loading, handleChange, handleSubmit, setErrors, setLoading, reset } = useForm(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validateSignup
  );

  const onSubmit = async (formValues) => {
    try {
      const response = await signupUser(
        formValues.username,
        formValues.email,
        formValues.password
      );
      
      const data = await response.json();
      console.log('Signup response:', data);
      
      alert('Signup successful! You can now login.');
      reset();
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setErrors({ submit: 'Signup failed. Please try again.' });
      setLoading(false);
    }
  };

  const isFormValid = 
    values.username.trim() !== '' && 
    values.email.trim() !== '' && 
    values.password.trim() !== '' && 
    values.confirmPassword.trim() !== '' &&
    values.password === values.confirmPassword;

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
        
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={!isFormValid}
          loading={loading}
        >
          Sign Up
        </Button>

        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </form>

      <div className="login-section">
        <p>Already have an account?</p>
        <Button
          variant="secondary"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignUp;