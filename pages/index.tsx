import type { NextPage } from 'next';
import { useState } from 'react';
import { Client } from '@notionhq/client';

import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { DatabaseItem } from '../types';
import Database from '../components/Database';

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

  // Set all items in memory here
  const [items, setItems] = useState(dbItems);

  // Filter system to apply to with dropdown
  // const [filter, setFilter] = useState({});

  return (
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
        {/* <div>
          {items.map((item, index) => {
            // console.log(item);

            return (
              <p key={item.id}>{item.title} ({item.id})</p>
            );
          })}
        </div> */}
        <Database
          items={items}
          tagOptions={['Featured']}
        />
      </main>
      <MobileNavMenu
        selected={selected}
        visible={menuToggled}
        onClose={() => setMenuToggled(false)}
      />
    </div>
  )
}

export default Projects;
