import type { NextPage } from 'next';
import { MouseEvent, useEffect, useState } from 'react';
import { Client } from '@notionhq/client';

import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { DatabaseDropdownFilter, DatabaseItem } from '../types';
import Database from '../components/Database';
import Link from 'next/link';
import Dropdown from '../components/Dropdown';
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
  lastRegenerated: number,
  dbItems: DatabaseItem[],
}

/**
 * Projects page.
 * @returns
 */
const Projects = ({ lastRegenerated, dbItems }: Props) => {
  // Whether the navigation menu is open
  const [menuToggled, setMenuToggled] = useState(false);
  const selected = "Featured";

  // To control the dropdown menu
  const [dropdownSelected, setDropdownSelected] = useState('Featured');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  // Set all items in memory here
  const [items, setItems] = useState(dbItems);

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

  /**
   * Handle the press of the dropdown menu button.
   * @param e
   */
  function handleDropdownButtonPress(top: number, left: number) {
    setTop(top);
    setLeft(left);

    setDropdownVisible(true);
  }

  /**
   * Handle re-setting the dropdown menu button position.
   * @param top
   * @param left
   */
  function handleDropdownButtonPosChange(top: number, left: number) {
    setTop(top);
    setLeft(left);
  }

  return (
    <div className={utils.rootContainer}>
      {/* <NavBar selected={selected} /> */}
      <main>
        <MobileNavBar
          title={selected}
          selected={selected}
          display="tabs"
        />
        {/* <PageHeader
          aboveText="Brendan Chen"
          belowText="Developer and Designer"
          includeLogo
        /> */}
        {/* Debug information */}
        {/* <p>Last regenerated: {(new Date(lastRegenerated)).toDateString()} {(new Date(lastRegenerated)).toTimeString()}</p> */}
        <Database
          items={items}
          dropdownFilter={dropdownFilter}
          // tag={tagSelected}
          onDropdownButtonPress={(top, left) => handleDropdownButtonPress(top, left)}
          onDropdownButtonPosChange={(top, left) => handleDropdownButtonPosChange(top, left)}
        />
      </main>
      {/* <Dropdown
        visible={dropdownVisible}
        options={dropdownFilters.map((value) => value.dropdownName)}
        onSelect={(selected) => setDropdownSelected(selected)}
        onClose={() => setDropdownVisible(false)}
        top={top}
        left={left}
      />
      <MobileNavMenu
        selected={selected}
        visible={menuToggled}
        onClose={() => setMenuToggled(false)}
      /> */}
    </div>
  );
}

export default Projects;
