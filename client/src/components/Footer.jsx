import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>Location: 160 Convent Ave, New York</div>
      <div>Contact: info@email.com | (555) 555-7000</div>
      <div>Magnifying glass favicon created by <a href="https://www.flaticon.com/free-icons/search" title="search icons">Dewi Sari</a></div>
    </footer>
  );
}