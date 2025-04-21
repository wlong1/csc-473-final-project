import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Home() {
  const [isLoggedIn] = useState(false);  // replace later

  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1>Welcome to Lost and Found</h1>
          {isLoggedIn ? (
            <p>
              Browse <Link href="/listing">listings</Link> or check your dashboard to manage your items.
            </p>
          ) : (
            <p>
              Please <Link href="/login">login</Link> or <Link href="/register">register</Link> to check for lost items.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
