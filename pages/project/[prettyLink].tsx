import utils from '../../styles/utils.module.css';
import { REVALIDATE } from '../../helpers/Constants';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import getDatabaseBlocks from '../../helpers/project/getProjectDatabaseBlocks';
import getPageProperties from '../../helpers/project/getProjectPageProperties';
import { ProjectDatabaseItem } from '../../types';
import MobileNavBar from '../../components/MobileNavBar';
import NotionRenderer from '../../components/NotionRenderer';
import Head from 'next/head';
import updateImageBlocks from '../../helpers/updateImageBlocks';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';

export const getStaticPaths = async () => {
  // Get pages in database
  const items = await getDatabaseBlocks({
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
    paths: items.map((value) => ({
      params: {
        prettyLink: value.prettyLink,
        title: value.title,
      }
    })),
    fallback: true,
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  let blocks = null;
  let dbItem: ProjectDatabaseItem | null;

  if (!params || typeof params.prettyLink !== 'string') return {
    props: {
      blocks,
      title: null,
      lastRegenerated: Date.now(),
    }
  };

  // Get block data
  try {
    dbItem = await getPageProperties(params.prettyLink);
    if (dbItem) {
      blocks = await getChildrenBlocks(dbItem.id);
    } else {
      throw new Error('Page not published');
    }

    if (blocks) {
      blocks = await updateImageBlocks(blocks);
    }

  } catch(e) {
    return {
      props: {
        blocks,
        title: null,
        lastRegenerated: Date.now(),
      }
    };
  }

  return {
    props: {
      blocks,
      title: dbItem.title,
      lastRegenerated: Date.now(),
    },
    revalidate: REVALIDATE,
  };
};

interface Props {
  blocks?: any[],
  title?: string,
  /**
   * Time in milliseconds when the page was last regenerated.
   */
  lastRegenerated: number,
}

/**
 * Page that displays project information.
 * @returns
 */
export default function ProjectPage({ blocks, title }: Props) {
  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>{title} | Brendan Chen</title>
      </Head>
      <MobileNavBar
        title={title}
        display="project"
      />
      <main>
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText="Back"
            belowText={title || ''}
            includeBackButton
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <NotionRenderer
            blocks={blocks || []}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}