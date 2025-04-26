import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { isAuthenticated, clearAuthToken, clearRole } from '../lib/auth';
import styles from './Header.module.css';

const AuthButtons = () => (
  <>
    <Link to="/login">
      <button>Login</button>
    </Link>
    <Link to="/register">
      <button>Register</button>
    </Link>
  </>
);

const UserButtons = ({ onLogout }) => (
  <>
    <Link to="/listing">
      <button>Listing</button>
    </Link>
    <Link to="/dashboard">
      <button>Dashboard</button>
    </Link>
    <button onClick={onLogout}>Logout</button>
  </>
);

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    clearRole();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Lost and Found
      </Link>
      <nav className={styles.nav}>
        {isLoggedIn ? <UserButtons onLogout={handleLogout} /> : <AuthButtons />}
      </nav>
    </header>
  );
}