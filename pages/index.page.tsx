import MobileNavBar from '../components/MobileNavBar';
import { REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { PageListResponse } from '../types';
import Database from '../components/Database';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import getPages from '../helpers/getPages';

/**
 * Generate file content.
 */
export async function getStaticProps() {
  const response = await getPages({
    prefix: 'work',
    pageSize: 2,
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
        <div className={utils.spacer} />
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText=""
            belowText="I’m Brendan, a developer and designer living in Orange, CA."
          />
        </div>
        {workPageListResponse && workPageListResponse.pageData.length > 0 ? (
          <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
            <h2>Featured Work</h2>
            <Database
              pageResponse={workPageListResponse}
              prefix="work"
            />
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
        <div className={utils.spacer} />
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default Home;
