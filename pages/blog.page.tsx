import { useState } from 'react';

import utils from '../styles/utils.module.css';
import { BLOG_DATABASE_ID, PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import getDatabaseItems from '../helpers/getDatabaseItems';
import updatePreviewImages from '../helpers/updatePreviewImages';
import { DatabaseItem, PageData } from '../types';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import PageHeader from '../components/PageHeader';
import Database from '../components/Database';
import Footer from '../components/Footer';
import getPages from '../helpers/getPages';


export async function getStaticProps() {
  const items = await getPages({
    prefix: 'blog',
  });

  return {
    props: {
      dbItems: items,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  dbItems: PageData[],
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