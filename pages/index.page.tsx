import MobileNavBar from '../components/MobileNavBar';
import { BLOG_DATABASE_ID, PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { DatabaseItem } from '../types';
import Database from '../components/Database';
import getDatabaseBlocks from '../helpers/getDatabaseItems';
import Head from 'next/head';
import updatePreviewImages from '../helpers/updatePreviewImages';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';

/**
 * Generate Notion database content.
 */
export async function getStaticProps() {
  let items = await getDatabaseBlocks(PROJECTS_DATABASE_ID, {
    and: [
      {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      {
        property: 'Tags',
        multi_select: {
          contains: 'Featured',
        },
      },
      {
        property: 'Pretty Link',
        rich_text: {
          is_not_empty: true,
        },
      },
    ],
  });

  items = await updatePreviewImages(items);

  let blogItems = await getDatabaseBlocks(BLOG_DATABASE_ID, {
    and: [
      {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      {
        property: 'Tags',
        multi_select: {
          contains: 'Featured',
        },
      },
      {
        property: 'Pretty Link',
        rich_text: {
          is_not_empty: true,
        },
      },
    ],
  });

  blogItems = await updatePreviewImages(blogItems);
  
  return {
    props: {
      lastRegenerated: Date.now(),
      dbItems: items,
      blogItems: blogItems,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  // lastRegenerated: number,
  dbItems: DatabaseItem[],
  blogItems: DatabaseItem[],
}

/**
 * Home page.
 * @returns
 */
const Home = ({ dbItems, blogItems }: Props) => {
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
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <h2>Featured Work</h2>
          <Database
            items={dbItems}
            prefix="work"
          />
        </div>
        {blogItems && blogItems.length > 0 ? (
          <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
            <h2>Featured Articles</h2>
            <Database
              items={blogItems}
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
