import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>© 2022 Brendan Chen</p>
        <p>Privacy Policy | Licenses</p>
      </div>
    </div>
  );
}