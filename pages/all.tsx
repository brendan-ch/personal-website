import { useState } from 'react';

import MobileNavBar from '../components/MobileNavBar';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { DatabaseDropdownFilter, DatabaseItem } from '../types';
import Database from '../components/Database';
import getDatabaseBlocks from '../helpers/getDatabaseBlocks';

/**
 * Generate Notion database content.
 */
export async function getStaticProps() {
  const items = await getDatabaseBlocks(PROJECTS_DATABASE_ID, {
    and: [
      {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
    ],
  });
  
  return {
    props: {
      lastRegenerated: Date.now(),
      dbItems: items,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  // lastRegenerated: number,
  dbItems: DatabaseItem[],
}

/**
 * Projects page.
 * @returns
 */
const All = ({ dbItems }: Props) => {
  const selected = "All";

  return (
    <div className={utils.rootContainer}>
      {/* <NavBar selected={selected} /> */}
      <main>
        <MobileNavBar
          title={selected}
          selected={selected}
          display="tabs"
        />
        <Database
          items={dbItems}
          // tag={tagSelected}
        />
      </main>
    </div>
  );
}

export default All;