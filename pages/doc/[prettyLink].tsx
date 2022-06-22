import utils from '../../styles/utils.module.css';
import { ADDITIONAL_DOCS_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import getDocumentDatabaseBlocks from '../../helpers/document/getDocumentDatabaseBlocks';
import { DocumentDatabaseItem } from '../../types';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import getDocumentPageProperties from '../../helpers/document/getDocumentPageProperties';
import Head from 'next/head';
import MobileNavBar from '../../components/MobileNavBar';
import NotionRenderer from '../../components/NotionRenderer';

export const getStaticPaths = async () => {
  // Get pages in database
  const items = await getDocumentDatabaseBlocks(ADDITIONAL_DOCS_DATABASE_ID, {
    and: [
      {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      {
        property: 'Pretty Link',
        rich_text: {
          is_not_empty: true,
        },
      }
    ],
  });

  return {
    paths: items.map((value: DocumentDatabaseItem) => ({
      params: {
        prettyLink: value.prettyLink!,
      }
    })),
    fallback: true,
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  let blocks = null;
  let dbItem: DocumentDatabaseItem | null;

  if (!params || typeof params.prettyLink !== 'string') return {
    props: {
      blocks,
      title: null,
      lastRegenerated: Date.now(),
    }
  };

  // Get block data
  try {
    dbItem = await getDocumentPageProperties(params.prettyLink);
    if (dbItem) {
      blocks = await getChildrenBlocks(dbItem.id);
    } else {
      throw new Error('Page not published');
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
}

/**
 * Page that displays project information.
 * @returns
 */
 export default function DocumentPage({ blocks, title }: Props) {
  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>{title} | Brendan Chen</title>
        {/* Block indexing */}
        <meta name="robots" content="noindex"></meta>
      </Head>
      <main>
        <MobileNavBar
          title={title}
          display="title"
        />
        <div className={utils.scrollable}>
          <NotionRenderer
            blocks={blocks || []}
          />
        </div>
      </main>
    </div>
  );
}