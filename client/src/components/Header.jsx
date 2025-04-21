import { useState } from 'react';
import { Link } from 'react-router';
import styles from './Header.module.css';

const AuthButtons = () => (
  <>
    <button>Login</button>
    <button>Register</button>
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
  const [isLoggedIn] = useState(false); // change later

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        Lost and Found
      </Link>
      <nav className={styles.nav}>
        {isLoggedIn ? <UserButtons /> : <AuthButtons />}
      </nav>
    </header>
  );
}