import styles from '../styles/Footer.module.css';
import LogoFull from './icons/LogoFull';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LogoFull
          width={272}
          height={1}
        />
        <p>© 2022 Brendan Chen</p>
        <p>Privacy Policy | Licenses</p>
      </div>
    </div>
  );
}