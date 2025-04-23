import { useState } from 'react';
import { Link } from 'react-router';
import { isAuthenticated } from '../lib/auth';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isLoggedIn] = useState(isAuthenticated());

  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1>Welcome to Lost and Found</h1>
          {isLoggedIn ? (
            <p>
              Browse <Link to="/listing">listings</Link> or check your <Link to="/daskboard">dashboard</Link> to manage your items.
            </p>
          ) : (
            <p>
              Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to check for lost items.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
