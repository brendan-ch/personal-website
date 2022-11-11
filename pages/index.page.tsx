import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import Head from 'next/head';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';

import AboutImage from '../public/about.jpeg';
import LogoStandaloneWithoutBorder from '../components/icons/LogoStandaloneWithoutBorder';
import Link from 'next/link';
import ChevronRight from '../components/icons-v2/ChevronRight';

/**
 * Home page.
 * @returns
 */
const Home = () => {
  const selected = "Featured";

  /**
   * @todo move this to the _app page
   */
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      {/* <NavBar selected={selected} /> */}
      <Head>
        <title>Brendan Chen</title>
      </Head>
      <MobileNavBar
        selected={selected}
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        selected={selected}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <main>
        <div className={styles.titleLogoDivider}>
          <div className={styles.titleDivider}>
            <h1>
              I{'\''}m Brendan, a
            </h1>
            <h1>
              designer and developer
            </h1>
            <h1>
              in Orange, CA.
            </h1>
          </div>
          <div className={styles.logoDivider}>
            <LogoStandaloneWithoutBorder
              width={145.84931482}
              height={168}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.sectionDivider}>
            <Image
              src={AboutImage}
              alt="Capybara in bath"
            />
            <p>Hi there! I’m Brendan, a designer, developer, and college student living in Orange, California. I’m currently studying computer science at Chapman University, and am working towards a career in software development or UX design. Some of my hobbies are reading, photography, traveling, and brewing coffee.</p>
          </div>
          <div className={styles.sectionDivider}>
            <p>
              <b>
                Things I{'\''}m currently doing
              </b>
            </p>
            <ul>
              <li>Pursuing a bachelor’s degree in software engineering at Chapman University</li>
              <li>UX design, software engineering and project management at <a href="https://techieswithoutborders.us"><u>Techies Without Borders</u></a>, a non-profit organization dedicated to helping underserved countries</li>
            </ul>
          </div>
          <div className={styles.sectionDivider}>
            <p>
              <b>
                Things I{'\''}ve done in the past
              </b>
            </p>
            <ul>
              <li>Designed and developed <a href="https://clockwise.bchen.dev" target="_blank" rel="noreferrer"><u>Clockwise</u></a>, a Pomodoro timer designed to help you focus</li>
              <li>Created <Link href="/work/standard-catalog"><a><u>Standard Catalog</u></a></Link>, a redesign of the college registration experience</li>
            </ul>
            <Link href="/work">
              <a className={styles.databaseEndLink}>
                <p>
                  And much, much more
                </p>
                <ChevronRight
                  width={20}
                  height={20}
                />
              </a>
            </Link>
          </div>
          <div className={styles.sectionDivider}>
            <p>
              <b>
                Things I{'\''}m capable of
              </b>
            </p>
            <ul>
              <li>Web development using React.js, Next.js, Angular, and TypeScript</li>
              <li>Application development using React Native and Capacitor</li>
              <li>Project management and documentation using Notion</li>
              <li>High-fidelity prototyping and wireframing using Figma</li>
              <li>Understanding and working with team and user needs</li>
            </ul>
          </div>
          <div className={`${styles.sectionDivider}`}>
            <p>
              <b>
                Interested in working together?
              </b>
            </p>
            <p>
              I’m fairly busy with college, but would love to hear from you! Shoot me a message and I’ll get back to you when I can.
            </p>
            <Link href="/contact">
              <a className={styles.databaseEndLink}>
                <p>
                  Contact Me
                </p>
                <ChevronRight
                  width={20}
                  height={20}
                />
              </a>
            </Link>
          </div>
        </div>
      </main>
      <div className={utils.spacer} />
      <div className={utils.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
