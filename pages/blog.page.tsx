import { useState } from 'react';

import utils from '../styles/utils.module.css';
import { BLOG_DATABASE_ID, PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import getDatabaseItems from '../helpers/getDatabaseItems';
import updatePreviewImages from '../helpers/updatePreviewImages';
import { DatabaseItem } from '../types';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import PageHeader from '../components/PageHeader';
import Database from '../components/Database';
import Footer from '../components/Footer';


export async function getStaticProps() {
  let items = await getDatabaseItems(BLOG_DATABASE_ID, {
    and: [
      {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      {
        property: 'Pretty Link',
        rich_text: {
          is_not_empty: true,
        },
      },
    ],
  }, [
    {
      timestamp: 'created_time',
      direction: 'descending',
    },
  ]);

  items = await updatePreviewImages(items);

  return {
    props: {
      dbItems: items,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  dbItems: DatabaseItem[],
}

export default function Blog({ dbItems }: Props) {
  const selected = 'Blog';
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      {/* <NavBar selected={selected} /> */}
      <Head>
        <title>Blog | Brendan Chen</title>
        <meta name="robots" content="noindex"></meta>
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
            belowText="Blog"
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <Database
            items={dbItems}
            prefix="blog"
          />
        </div>
        <div className={utils.spacer} />
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}