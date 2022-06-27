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
import Image from 'next/image';
import Link from 'next/link';

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
      props: errorProps,
    };
  }

  return {
    props: {
      blocks,
      title: dbItem.title,
      imageLink: dbItem.imageLink,
      lastRegenerated: Date.now(),
    },
    revalidate: REVALIDATE,
  };
};

interface Props {
  blocks?: any[],
  previewImageLink?: string,
  coverImageLink?: string,
  title?: string,
  description?: string,
  error?: string,
}

/**
 * Page that displays project information.
 * @returns
 */
export default function ProjectPage({
  blocks,
  previewImageLink,
  coverImageLink,
  title,
  description,
  error
}: Props) {
  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>{title} | Brendan Chen</title>

        {previewImageLink ? (
          <meta name="og:image" content={previewImageLink}></meta>
        ) : undefined}

        {description ? (
          <meta name="description" content={description}></meta>
        ) : undefined}
      </Head>
      <MobileNavBar
        title={title}
        display="project"
      />
      {error ? (
        <main>
          <div className={utils.spacer} />
          <div className={utils.itemWrapper}>
            <PageHeader
              aboveText="Back"
              belowText={title || ''}
              includeBackButton
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
              aboveText="Back"
              belowText={title || ''}
              includeBackButton
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