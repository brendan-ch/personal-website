import Link from 'next/link';
import styles from '../styles/MobileNavBar.module.css';
import Back from './icons/Back';
import Hamburger from './icons/Hamburger';

interface TabProps {
  selected: boolean,
  text: string,
  href: string,
}

function MobileNavBarTab({ selected, text, href }: TabProps) {
  return (
    <div className={styles.tab}>
      <Link href={href}>
        <a>
          <p>{text}</p>
          {selected ? (
            <div className={styles.tabLine} />
          ) : undefined}
        </a>
      </Link>
    </div>
  )
}

interface Props {
  // button?: 'none' | 'hamburger' | 'back',
  display: 'tabs' | 'project',
  /**
   * Only shown if `display` is set to `project`.
   */
  title?: string,
  selected?: string,
}

/**
 * Navigation bar on mobile. Includes a hamburger menu/back button.
 * The hamburger menu opens up an overlay with links to the other pages.
 * @param props
 */
export default function MobileNavBar({ title, display, selected }: Props) {
  return (
    <div className={styles.container}>
      {/* Hamburger menu */}
      {/* {button && button !== 'none' ? (
        <button
          className={styles.navBarButton}
          onClick={onPress ? () => onPress() : undefined}>
          {button === 'hamburger' ? (
            <Hamburger width={40} height={40} />
          ) : (
            <Back width={40} height={40} />
          )}
        </button>
      ) : undefined} */}
      {/* <div className={styles.line} /> */}
      {display === 'tabs' ? (
        <div className={styles.buttonsContainer}>
          <MobileNavBarTab
            href="/"
            selected={selected === 'Featured'}
            text="Featured"
          />
          <MobileNavBarTab
            href="/all"
            selected={selected === 'All'}
            text="All"
          />
          <MobileNavBarTab
            href="/about"
            selected={selected === 'About Me'}
            text="About Me"
          />
        </div>
      ) : (
        <h3>{title}</h3>
      )}
    </div>
  );
}