import utils from '../../styles/utils.module.css';
import { PROJECTS_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import getDatabaseBlocks from '../../helpers/getDatabaseItems';
import getPageProperties from '../../helpers/getPageProperties';
import { DatabaseItem } from '../../types';
import MobileNavBar from '../../components/MobileNavBar';
import NotionRenderer from '../../components/NotionRenderer';
import updateImageBlocks from '../../helpers/updateImageBlocks';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import DatabaseItemHead from '../../components/DatabaseItemHead';
import ImageWithFadeIn from '../../components/ImageWithFadeIn';
import MobileNavMenu from '../../components/MobileNavMenu';
import { useState } from 'react';
import DatabaseItemContent from '../../components/DatabaseItemContent';

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
        prettyLink: value.prettyLink,
        title: value.title,
      }
    })),
    fallback: 'blocking',
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  let blocks = null;
  let dbItem: DatabaseItem | null;

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
    dbItem = await getPageProperties(PROJECTS_DATABASE_ID, params.prettyLink);
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
      coverImageLink: dbItem.coverImageLink || null,
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
export default function WorkPage({
  blocks,
  previewImageLink,
  coverImageLink,
  title,
  description,
  error
}: Props) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      <DatabaseItemHead
        title={title}
        description={description}
        previewImageLink={previewImageLink}
      />
      <MobileNavBar
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <DatabaseItemContent
        title={title}
        coverImageLink={coverImageLink}
        blocks={blocks}
        error={error}
      />
    </div>
  );
}