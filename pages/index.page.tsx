import MobileNavBar from '../components/MobileNavBar';
import { REVALIDATE } from '../helpers/Constants';
import utils from '../styles/utils.module.css';
import { ProjectDatabaseItem } from '../types';
import Database from '../components/Database';
import getDatabaseBlocks from '../helpers/project/getProjectDatabaseBlocks';
import Head from 'next/head';
import updatePreviewImages from '../helpers/updatePreviewImages';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

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
      <MobileNavBar
        selected={selected}
      />
      <main>
        <div className={utils.spacer} />
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText=""
            belowText="I’m Brendan, a developer and designer living in Orange, CA."
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

export default Projects;
