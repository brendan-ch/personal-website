import utils from '../../styles/utils.module.css';
import { ADDITIONAL_DOCS_DATABASE_ID, BLOG_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import { DatabaseItem } from '../../types';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import MobileNavBar from '../../components/MobileNavBar';
import updateImageBlocks from '../../helpers/updateImageBlocks';
import updatePreviewImages from '../../helpers/updatePreviewImages';
import DatabaseItemHead from '../../components/DatabaseItemHead';
import MobileNavMenu from '../../components/MobileNavMenu';
import { useState } from 'react';
import getDatabaseItems from '../../helpers/getDatabaseItems';
import getPageProperties from '../../helpers/getPageProperties';
import DatabaseItemContent from '../../components/DatabaseItemContent';

export const getStaticPaths = async () => {
  // Get pages in database
  let items = await getDatabaseItems(BLOG_DATABASE_ID, {
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
    paths: items.map((value: DatabaseItem) => ({
      params: {
        prettyLink: value.prettyLink!,
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
    dbItem = await getPageProperties(BLOG_DATABASE_ID, params.prettyLink);
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
      coverImageLink: dbItem.coverImageLink || null,
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
 export default function BlogPage({
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
        header={{
          aboveText: 'Blog',
          belowText: title || '',
          backButtonHref: '/blog'
        }}
      />
    </div>
  );
}