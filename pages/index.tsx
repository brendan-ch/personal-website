import MobileNavBar from '../components/MobileNavBar';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { ProjectDatabaseItem } from '../types';
import Database from '../components/Database';
import getDatabaseBlocks from '../helpers/project/getProjectDatabaseBlocks';
import Head from 'next/head';
import updatePreviewImages from '../helpers/updatePreviewImages';

/**
 * Generate Notion database content.
 */
export async function getStaticProps() {
  let items = await getDatabaseBlocks({
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
      lastRegenerated: Date.now(),
      dbItems: items,
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  // lastRegenerated: number,
  dbItems: ProjectDatabaseItem[],
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
        <title>Brendan Chen</title>
      </Head>
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
