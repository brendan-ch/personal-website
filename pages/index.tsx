import MobileNavBar from '../components/MobileNavBar';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { DatabaseItem } from '../types';
import Database from '../components/Database';
import getDatabaseBlocks from '../helpers/getDatabaseBlocks';
import Head from 'next/head';
import Image from 'next/image';

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
  const selected = "Featured";

  return (
    <div className={utils.rootContainer}>
      {/* <NavBar selected={selected} /> */}
      <Head>
        <title>Featured | Brendan Chen</title>
      </Head>
      <Image
        width={50}
        height={50}
        src="/link-preview-image.png"
        alt=""
        style={{
          display: 'none',
        }}
      />
      <main>
        <MobileNavBar
          title={selected}
          selected={selected}
          display="tabs"
        />
        <div className={utils.scrollable}>
          <Database
            items={dbItems}
            // tag={tagSelected}
          />
        </div>
      </main>
    </div>
  );
}

export default Projects;
