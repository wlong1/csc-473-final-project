import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>Location: 160 Convent Ave, New York</div>
      <div>Contact: info@email.com | (555) 555-7000</div>
    </footer>
  );
}