import { useState } from 'react';

import utils from '../styles/utils.module.css';
import { PAGINATION_LIMIT, REVALIDATE } from '../helpers/Constants';
import { PageData, PageListResponse } from '../types';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import PageHeader from '../components/PageHeader';
import Database from '../components/Database';
import Footer from '../components/Footer';
import getPages from '../helpers/getPages';


export async function getStaticProps() {
  const response = await getPages({
    prefix: 'blog',
    pageSize: PAGINATION_LIMIT,
  });

  return {
    props: {
      listResponse: response,
    },
    revalidate: REVALIDATE,
  };
}

interface Props {
  listResponse: PageListResponse,
}

export default function Blog({ listResponse }: Props) {
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
            pageResponse={listResponse}
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