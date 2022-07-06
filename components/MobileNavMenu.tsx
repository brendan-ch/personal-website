import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/MobileNavMenu.module.css';
import Footer from './Footer';

interface ButtonProps {
  toggled?: boolean,
  text: string,
  href: string,
}

export function MobileNavMenuButton({ toggled, text, href }: ButtonProps) {
  return (
    <Link href={href}>
      <a className={styles.buttonWrapper}>
        <div className={styles.line} />
        <div className={styles.buttonTextContainer}>
          <h3 className={toggled ? styles.red : undefined}>
            {toggled ? (
              <b>
                {text}
              </b>
            ) : text}
          </h3>
        </div>
      </a>
    </Link>
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
      <Image
        src={require('../public/background-pattern.png')}
        layout="fill"
        objectFit="cover"
        style={{
          zIndex: 2
        }}
        alt="Background image"
      />
      <div className={styles.contentContainer}>
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
        <Footer
          style={{
            backgroundColor: 'transparent',
          }}
        />
      </div>
    </div>
  );
}