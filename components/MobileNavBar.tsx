import Link from 'next/link';
import { useRouter } from 'next/router';
import { BLUE, CYAN, RED } from '../helpers/Constants';
import styles from '../styles/MobileNavBar.module.css';
import Back from './icons/Back';

interface TabProps {
  selected: boolean,
  text: string,
  href: string,
  selectedColor?: string,
}

function MobileNavBarTab({
  selected,
  text,
  href,
  selectedColor,
}: TabProps) {
  return (
    <div className={styles.tab}>
      <Link href={href}>
        <a>
          <div
            className={selected ? `${styles.tabLineMobile} ${styles.tabLine} ${styles.tabLineSelected}` : `${styles.tabLineMobile} ${styles.tabLine}`}
            style={{
              backgroundColor: selected && selectedColor ? selectedColor : undefined,
            }}
          />
          <p
            style={{
              color: selected && selectedColor ? selectedColor : undefined,
            }}
          >
            {text}
          </p>
          <div
            className={selected ? `${styles.tabLineDesktop} ${styles.tabLine} ${styles.tabLineSelected}` : `${styles.tabLineDesktop} ${styles.tabLine}`}
            style={{
              backgroundColor: selected && selectedColor ? selectedColor : undefined,
            }}
          />
        </a>
      </Link>
    </div>
  )
}

interface Props {
  /**|
   * If set to `tabs`, display a set of tabs
   * to navigate to different parts of the site.
   * If set to `project`, display the project title and a back button.
   * If set to `title`, display only a title without a back button.
   */
  display: 'tabs' | 'project' | 'title',
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
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={`${styles.line} ${styles.lineMobile}`} />
      <div className={styles.contentContainer}>
        {display === 'tabs' ? (
          <div className={styles.buttonsContainer}>
            <MobileNavBarTab
              href="/"
              selected={selected === 'Featured'}
              text="Featured"
              selectedColor={RED}
            />
            <MobileNavBarTab
              href="/all"
              selected={selected === 'All'}
              text="All"
              selectedColor={CYAN}
            />
            <MobileNavBarTab
              href="/about"
              selected={selected === 'About Me'}
              text="About Me"
              selectedColor={BLUE}
            />
          </div>
        ) : (
          <button className={styles.projectContainer} onClick={display === 'project' ? () => router.back() : undefined}>
            {display === 'project' ? (
              <Back
                width={40}
                height={40}
              />
            ) : undefined}
            <p>{title}</p>
          </button>
        )}
      </div>
      <div className={`${styles.line} ${styles.lineDesktop}`} />
    </div>
  );
}