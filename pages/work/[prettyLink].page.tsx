import { REVALIDATE } from '../../helpers/Constants';
import { PageData } from '../../types';
import DatabaseItemHead from '../../components/DatabaseItemHead';
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
export default function WorkPage(pageData: PageData) {
  const {
    previewImage,
    title,
    description,
  } = pageData;
  
  return (
    <main>
      <DatabaseItemHead
        title={title}
        description={description}
        previewImageLink={previewImage}
      />
      <DatabaseItemContent
        {...pageData}
        backButtonText="My Work"
        backButtonHref="/work"
        shareCTA
      />
    </main>
  );
}