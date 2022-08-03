import utils from '../../styles/utils.module.css';
import { REVALIDATE } from '../../helpers/Constants';
import { PageData } from '../../types';
import MobileNavBar from '../../components/MobileNavBar';
import DatabaseItemHead from '../../components/DatabaseItemHead';
import MobileNavMenu from '../../components/MobileNavMenu';
import { useState } from 'react';
import DatabaseItemContent from '../../components/DatabaseItemContent';
import getPages from '../../helpers/getPages';
import getPage from '../../helpers/getPage';

export const getStaticPaths = async () => {
  // Get pages
  let pageResponse = await getPages({
    prefix: 'work',
  });

  return {
    paths: pageResponse.pageData.map((value) => ({
      params: {
        prettyLink: value.id,
      }
    })),
    fallback: false,
  }
};

export const getStaticProps = async ({ params }: { params: any }) => {
  try {
    const { prettyLink } = params;
    const pageData = await getPage({
      prefix: 'work',
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
export default function WorkPage({
  content,
  previewImage,
  coverImage,
  title,
  description,
  id,
  prefix,
  tags,
  imageAspectRatio,
}: PageData) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      <DatabaseItemHead
        title={title}
        description={description}
        previewImageLink={previewImage}
      />
      <MobileNavBar
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <DatabaseItemContent
        content={content}
        coverImage={coverImage}
        previewImage={previewImage}
        title={title}
        description={description}
        id={id}
        prefix={prefix}
        tags={tags}
        backButtonText="Work"
        backButtonHref="/work"
        imageAspectRatio={imageAspectRatio}
      />
    </div>
  );
}