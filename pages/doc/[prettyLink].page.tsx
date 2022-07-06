import utils from '../../styles/utils.module.css';
import { ADDITIONAL_DOCS_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import getDocumentDatabaseBlocks from '../../helpers/document/getDocumentDatabaseBlocks';
import { DocumentDatabaseItem } from '../../types';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import getDocumentPageProperties from '../../helpers/document/getDocumentPageProperties';
import Head from 'next/head';
import MobileNavBar from '../../components/MobileNavBar';
import NotionRenderer from '../../components/NotionRenderer';
import updateImageBlocks from '../../helpers/updateImageBlocks';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import updatePreviewImages from '../../helpers/updatePreviewImages';
import Link from 'next/link';
import DatabaseItemHead from '../../components/DatabaseItemHead';

export const getStaticPaths = async () => {
  // Get pages in database
  let items = await getDocumentDatabaseBlocks(ADDITIONAL_DOCS_DATABASE_ID, {
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

  items = await updatePreviewImages(items);

  return {
    paths: items.map((value: DocumentDatabaseItem) => ({
      params: {
        prettyLink: value.prettyLink!,
      }
    })),
    fallback: 'blocking',
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  let blocks = null;
  let dbItem: DocumentDatabaseItem | null;

  const errorProps = {
    blocks: [],
    title: 'Page not found',
    lastRegenerated: Date.now(),
    error: 'We couldn\'t find the page you were looking for.',
  };

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

    if (blocks) {
      blocks = await updateImageBlocks(blocks);
    }

  } catch(e) {
    return {
      props: errorProps,
    };
  }

  return {
    props: {
      blocks,
      title: dbItem.title,
      description: dbItem.description || null,
      previewImageLink: dbItem.imageLink || null,
      lastRegenerated: Date.now(),
    },
    revalidate: REVALIDATE,
  };
};

interface Props {
  blocks?: any[],
  title?: string,
  description?: string,
  previewImageLink?: string,
  coverImageLink?: string,
  error?: string,
}

/**
 * Page that displays project information.
 * @returns
 */
 export default function DocumentPage({
  blocks,
  previewImageLink,
  coverImageLink,
  title,
  description,
  error
}: Props) {
  return (
    <div className={utils.rootContainer}>
      <DatabaseItemHead
        title={title}
        description={description}
        previewImageLink={previewImageLink}
      />
      <MobileNavBar />
      {error ? (
        <main>
          <div className={utils.spacer} />
          <div className={utils.itemWrapper}>
            <PageHeader
              aboveText="Home"
              belowText={title || ''}
              includeBackButton
              backButtonHref="/"
            />
          </div>
          <div className={utils.itemWrapper}>
            <p>
              {error}
            </p>
          </div>
        </main>
      ) : (
        <main>
          <div className={utils.spacer} />
          <div className={utils.itemWrapper}>
            <PageHeader
              aboveText="Home"
              belowText={title || ''}
              includeBackButton
              backButtonHref="/"
            />
          </div>
          {/* {imageLink ? (
            <div className={utils.fullWidthImageWrapper}>
              <Image
                alt={`${title} preview image`}
                src={imageLink}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : undefined} */}
          <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
            <NotionRenderer
              blocks={blocks || []}
            />
          </div>
          <Footer />
        </main>
      )}
    </div>
  );
}