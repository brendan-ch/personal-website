import utils from '../../styles/utils.module.css';
import { ADDITIONAL_DOCS_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import { DatabaseItem } from '../../types';
import getChildrenBlocks from '../../helpers/getChildrenBlocks';
import MobileNavBar from '../../components/MobileNavBar';
import NotionRenderer from '../../components/NotionRenderer';
import updateImageBlocks from '../../helpers/updateImageBlocks';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import updatePreviewImages from '../../helpers/updatePreviewImages';
import DatabaseItemHead from '../../components/DatabaseItemHead';
import ImageWithFadeIn from '../../components/ImageWithFadeIn';
import MobileNavMenu from '../../components/MobileNavMenu';
import { useState } from 'react';
import getDatabaseItems from '../../helpers/getDatabaseItems';
import getPageProperties from '../../helpers/getPageProperties';

export const getStaticPaths = async () => {
  // Get pages in database
  let items = await getDatabaseItems(ADDITIONAL_DOCS_DATABASE_ID, {
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
    dbItem = await getPageProperties(ADDITIONAL_DOCS_DATABASE_ID, params.prettyLink);
    if (dbItem) {
      blocks = await getChildrenBlocks(dbItem.id);
    } else {
      throw new Error('Page not published');
    }

    if (blocks) {
      blocks = await updateImageBlocks(blocks);
    }

  } catch(e) {
    console.error(e);
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
 export default function DocumentPage({
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
          {coverImageLink ? (
            <div className={utils.fullWidthImageWrapper}>
              <ImageWithFadeIn
                alt={`${title} preview image`}
                src={coverImageLink}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : undefined}
          <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
            <NotionRenderer
              blocks={blocks || []}
            />
          </div>
          <div className={utils.spacer} />
          <div className={utils.footerWrapper}>
            <Footer />
          </div>
        </main>
      )}
    </div>
  );
}