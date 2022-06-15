import type { NextPage } from 'next';
import { useState } from 'react';
import { Client } from '@notionhq/client';

import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import Link from 'next/link';

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
          property: 'Tags',
          multi_select: {
            contains: 'Featured',
          }
        },
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    // sorts: [
    //   {
    //     property: 
    //   }
    // ]
  });

  return {
    props: {
      lastRegenerated: Date.now(),
      dbItems: response.results,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  lastRegenerated: number,
  dbItems: any[],
}

/**
 * Projects page.
 * @returns
 */
const Projects = ({ lastRegenerated, dbItems }: Props) => {
  // Whether the navigation menu is open
  const [menuToggled, setMenuToggled] = useState(false);
  const selected = "Projects";

  // Set all items in memory here
  const [items, setItems] = useState(dbItems);

  // Filter system to apply to with dropdown
  const [filter, setFilter] = useState({});

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
        <div>
          {items.map((item, index) => {
            return (
              <p key={item.id}>{item.properties.Name.title[0].plain_text} ({item.id})</p>
            );
          })}
        </div>
      </main>
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
