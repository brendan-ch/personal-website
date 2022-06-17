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

/**
 * Generate Notion database content.
 */
export async function getStaticProps() {
  const token = process.env.NOTION_TOKEN;

  // Get featured projects from Notion
  const client = new Client({
    auth: token,
  });

  const response = await client.databases.query({
    database_id: PROJECTS_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });
  
  return {
    props: {
      lastRegenerated: Date.now(),
      dbItems: response.results.map((value: any) => {

        let description = '';
        value.properties.Description.rich_text.map((textItem: any) => {
          description += textItem.text.content;
        });

        return {
          title: value.properties.Name.title[0].plain_text,
          description,
          imageLink: value.properties['Preview Image'].files && value.properties['Preview Image'].files.length > 0
            ? value.properties['Preview Image'].files[0].file.url
            : null,
          id: value.id,
          tags: value.properties['Tags'].multi_select.map((item: any) => item.name),
        };
      }),
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
  const selected = "Projects";

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

    console.log(top);

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

  return process.env.NODE_ENV !== 'production' ? (
    <div className={utils.rootContainer}>
      <NavBar selected={selected} />
      <MobileNavBar
        title={selected}
        button="hamburger"
        onPress={() => setMenuToggled(!menuToggled)}
      />
      <main>
        <PageHeader
          aboveText="Brendan Chen"
          belowText="Developer and Designer"
          includeLogo
        />
        {/* Debug information */}
        <p>Last regenerated: {(new Date(lastRegenerated)).toDateString()} {(new Date(lastRegenerated)).toTimeString()}</p>
        <Database
          items={items}
          dropdownFilter={dropdownFilter}
          // tag={tagSelected}
          onDropdownButtonPress={(top, left) => handleDropdownButtonPress(top, left)}
          onDropdownButtonPosChange={(top, left) => handleDropdownButtonPosChange(top, left)}
        />
      </main>
      <Dropdown
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
      />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 30,
      }}
    >
      <p>Coming soon...</p>
      <Link
        href="https://github.com/brendan-ch"
      >
        <a>
          GitHub (brendan-ch)
        </a>
      </Link>
    </div>
  );
}

export default Projects;
