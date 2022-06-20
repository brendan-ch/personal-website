import { PROJECTS_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import getDatabaseBlocks from '../../helpers/getDatabaseBlocks';
import getPageProperties from '../../helpers/getPageProperties';
import { DatabaseItem } from '../../types';

export const getStaticPaths = async () => {
  // Get pages in database
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
    paths: items.map((value) => ({
      params: {
        id: value.id,
        title: value.title,
      }
    })),
    fallback: true,
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  let blocks = null;
  let dbItem: DatabaseItem | null;

  if (!params || typeof params.id !== 'string') return {
    props: {
      blocks,
      title: null,
      lastRegenerated: Date.now(),
    }
  };

  // Get block data
  try {
    blocks = await getChildrenBlocks(params.id);
    dbItem = await getPageProperties(params.id);
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
export default function ProjectPage({ blocks, title, lastRegenerated }: Props) {
  console.log(title);
  return (
    <div>
      <p>Hello there</p>
    </div>
  );
}