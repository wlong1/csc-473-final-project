import { useState } from 'react';
import { useNavigate } from 'react-router';
import { register } from '../lib/api';
import { setAuthToken } from '../lib/auth';

import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';


export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setIsSubmitting(false);
      return setError('Passwords do not match');
    }

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      console.log('Registered!', result);
      setAuthToken(result);
      navigate('/listing'); // OK, redirect
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h1>Create Account</h1>
          {error && (
            <div
              className={styles.error}
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                aria-invalid={error.includes('username') ? 'true' : 'false'}
                aria-describedby={error ? 'error-message' : undefined}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-invalid={error.includes('email') ? 'true' : 'false'}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                aria-invalid={error.includes('password') ? 'true' : 'false'}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                aria-invalid={error.includes('Passwords do not match') ? 'true' : 'false'}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
