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

          </div>
          <div className={styles.sectionDivider}>
          
          </div>
          <div className={styles.sectionDivider}>
          
          </div>
          <div className={styles.contactButtonDivider}>
            <div className={styles.sectionDivider}>
            
            </div>
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
