import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MobileNavBar from '../components/MobileNavBar';
import { REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { PageListResponse } from '../types';
import Database from '../components/Database';
import Head from 'next/head';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import getPages from '../helpers/getPages';
import Link from 'next/link';
import Next from '../components/icons-v2/ChevronRight';
import PageButton from '../components/PageButton';

/**
 * Generate file content.
 */
export async function getStaticProps() {
  const response = await getPages({
    prefix: 'work',
    filter: [
      {
        tags: {
          contains: ['Featured'],
        },
      },
    ],
    sort: [
      {
        property: 'order',
        order: 'asc',
      },
    ],
  });

  return {
    props: {
      lastRegenerated: Date.now(),
      workPageListResponse: response,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  // lastRegenerated: number,
  workPageListResponse?: PageListResponse,
}

/**
 * Home page.
 * @returns
 */
const Home = ({ workPageListResponse }: Props) => {
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
          
        </div>
        <div className={styles.content}>
          <div className={styles.pictureTextDivider}>

          </div>
          <div className={styles.sectionDivider}>
            <p>
              <b>
                Things I{'\''}m currently doing
              </b>
            </p>
            <ul>
              <li>Pursuing a bachelor’s degree in software engineering at Chapman University</li>
              <li>UX design, software engineering and project management at Techies Without Borders, a non-profit organization dedicated to helping underserved countries</li>
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
              <li>Designed Standard Catalog, a redesign of the college registration experience</li>
            </ul>
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
          <div className={styles.sectionDivider}>
            <p>
              <b>
                Interested in working together?
              </b>
            </p>
            <p>
              I’m fairly busy with college, but would love to hear from you! Shoot me a message and I’ll get back to you when I can.
            </p>
            <PageButton
              text="Contact Me"
              href="/contact"
              highlighted
            />
          </div>
        </div>
        <div className={utils.spacer} />
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Home;
