import styles from '../styles/MobileNavMenu.module.css';
import Footer from './Footer';

interface ButtonProps {
  toggled?: boolean,
  text: string,
  href: string,
}

export function MobileNavMenuButton({ toggled, text }: ButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.line} />
      <div className={styles.buttonTextContainer}>
        <h3>
          {toggled ? (
            <b>
              {text}
            </b>
          ) : text}
        </h3>
      </div>
    </div>
  );
}

interface Props {
  selected?: string,
  visible: boolean,
}

/**
 * Navigation menu that displays a list of links.
 * @param props
 * @returns
 */
export default function MobileNavMenu({ selected, visible }: Props) {
  return (
    <div className={visible ? `${styles.container} ${styles.containerVisible}` : styles.container}>
      <div className={styles.buttons}>
        <MobileNavMenuButton
          toggled={selected === 'Featured'}
          text="Home"
          href="/"
        />
        {/* <MobileNavMenuButton /> */}
        {/* <MobileNavMenuButton /> */}
        <MobileNavMenuButton
          toggled={selected === 'About Me'}
          text="About Me"
          href="/about"
        />
      </div>
      <Footer />
    </div>
  );
}