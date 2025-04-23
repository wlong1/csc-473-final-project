import { useState } from 'react';
import { Link } from 'react-router';
import { isAuthenticated } from '../lib/auth';
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

const UserButtons = () => (
  <>
    <button>Listing</button>
    <button>Dashboard</button>
    <button>Logout</button>
  </>
);

export default function Header() {
  const [isLoggedIn] = useState(isAuthenticated());

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Lost and Found
      </Link>
      <nav className={styles.nav}>
        {isLoggedIn ? <UserButtons /> : <AuthButtons />}
      </nav>
    </header>
  );
}