import utils from '../../styles/utils.module.css';
import { ADDITIONAL_DOCS_DATABASE_ID, BLOG_DATABASE_ID, REVALIDATE } from '../../helpers/Constants';
import { DatabaseItem, PageData } from '../../types';
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
import getPages from '../../helpers/getPages';
import getPage from '../../helpers/getPage';

export const getStaticPaths = async () => {
  // Get pages in database
  const items = await getPages({
    prefix: 'blog',
  });

  return {
    paths: items.map((value: PageData) => ({
      params: {
        prettyLink: value.id,
      }
    })),
    fallback: 'blocking',
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  try {
    const { prettyLink } = params;
    const pageData = await getPage({
      prefix: 'blog',
      id: prettyLink,
      withContent: true,
    });

    return {
      props: {
        ...pageData,
      },
      revalidate: REVALIDATE,
    };
  } catch(e) {
    return {
      notFound: true,
    }
  }
};

/**
 * Page that displays project information.
 * @returns
 */
 export default function BlogPage(props: PageData) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      <DatabaseItemHead
        title={props.title}
        description={props.description}
        previewImageLink={props.previewImage}
      />
      <MobileNavBar
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <DatabaseItemContent
        {...props}
      />
    </div>
  );
}