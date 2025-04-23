import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../lib/api';
import { setAuthToken } from '../lib/auth';

import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    try {
      const { token, role } = await login({
        username: formData.username,
        password: formData.password
      });
      setAuthToken(token, role);
      navigate('/listing');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h1>Login</h1>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-invalid={error.includes('password') ? 'true' : 'false'}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
