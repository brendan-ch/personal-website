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
import BackgroundPattern from '../public/background-pattern.png';
import Link from 'next/link';
import Down from '../components/icons-v2/ArrowDown';
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
      blogPageListResponse: null,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  // lastRegenerated: number,
  workPageListResponse?: PageListResponse,
  blogPageListResponse?: PageListResponse,
}

/**
 * Home page.
 * @returns
 */
const Home = ({ workPageListResponse, blogPageListResponse }: Props) => {
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
        <div className={styles.backgroundImageContainer}>
          <Image
            src={BackgroundPattern}
            alt="Background pattern"
            className={styles.backgroundImage}
            objectFit="cover"
            layout="fill"
            priority
          />
          <div className={`${utils.itemWrapper} ${styles.textBoxWrapper}`}>
            <div className={styles.textBox}>
              <div className={styles.line1}>
                <h1>I&apos;m Brendan, a</h1>
              </div>
              <div className={styles.line2}>
                <h1>designer and developer</h1>
              </div>
              <div className={styles.line3}>
                <h1>in Orange, CA.</h1>
              </div>
            </div>
          </div>
          <Link href="#featured">
            <a className={styles.arrowDown} id="featured">
              <Down
                width={56}
                height={56}
              />
            </a>
          </Link>
        </div>
        {/* <div className={utils.itemWrapper}>
          <PageHeader
            aboveText=""
            belowText="I’m Brendan, a developer and designer living in Orange, CA."
          />
        </div> */}
        {workPageListResponse && workPageListResponse.pageData.length > 0 ? (
          <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
            <h2>Featured Work</h2>
            <Database
              pageResponse={workPageListResponse}
              prefix="work"
            />
            <Link href="/work">
              <a className={styles.databaseEndLink}>
                <p>
                  View All Work
                </p>
                <Next
                  width={20}
                  height={20}
                />
              </a>
            </Link>
          </div>
        ) : undefined}
        {blogPageListResponse && blogPageListResponse.pageData.length > 0 ? (
          <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
            <h2>Featured Articles</h2>
            <Database
              pageResponse={blogPageListResponse}
              prefix="blog"
            />
          </div>
        ) : undefined}
        <div className={`${utils.itemWrapper}`}>
          <h2>About Me</h2>
          <p>
            I’m Brendan, a designer, developer, and college student living in Orange, California.
            I’m currently studying computer science at Chapman University, and am working towards a career in software development or UX design.
            Some of my hobbies are reading, photography, traveling, and brewing coffee.
          </p>
          <Link href="/about">
            <a className={styles.databaseEndLink}>
              <p>
                More About Me
              </p>
              <Next
                width={20}
                height={20}
              />
            </a>
          </Link>
        </div>
        <div className={`${utils.itemWrapper}`}>
          <PageButton
            text="Say Hello 👋"
            href="/contact"
          />
        </div>
        <div className={utils.spacer} style={{
          height: 20,
        }} />
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Home;
