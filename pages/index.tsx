import type { NextPage } from 'next';
import { MouseEvent, useEffect, useState } from 'react';
import { Client } from '@notionhq/client';

import MobileNavBar from '../components/MobileNavBar';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { DatabaseDropdownFilter, DatabaseItem } from '../types';
import Database from '../components/Database';
import getDatabaseBlocks from '../helpers/getDatabaseBlocks';
import Head from 'next/head';

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
      {
        property: 'Tags',
        multi_select: {
          contains: 'Featured',
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
const Projects = ({ dbItems }: Props) => {
  // Whether the navigation menu is open
  const [menuToggled, setMenuToggled] = useState(false);
  const selected = "Featured";

  // To control the dropdown menu
  const [dropdownSelected, setDropdownSelected] = useState('Featured');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const dropdownFilters: DatabaseDropdownFilter[] = [
    {
      dropdownName: 'Featured',
      tagName: 'Featured',
      type: 'list',
    },
    {
      dropdownName: 'All Projects',
      type: 'list'
    },
  ];

  let dropdownFilter = dropdownFilters.find((value) => value.dropdownName === dropdownSelected);
  if (!dropdownFilter) {
    dropdownFilter = {
      dropdownName: 'All Projects',
      type: 'list',
    };
  }

  return (
    <div className={utils.rootContainer}>
      {/* <NavBar selected={selected} /> */}
      <Head>
        <title>Featured | Brendan Chen</title>
      </Head>
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

export default Projects;
