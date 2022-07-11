import { useState } from 'react';

import utils from '../styles/utils.module.css';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
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
  let items = await getDatabaseItems(PROJECTS_DATABASE_ID, {
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
  });

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

export default function Work({ dbItems }: Props) {
  const selected = 'Work';
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
            belowText="Work"
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <Database
            items={dbItems}
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