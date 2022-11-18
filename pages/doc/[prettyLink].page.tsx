import utils from '../../styles/utils.module.css';
import { REVALIDATE } from '../../helpers/Constants';
import { PageData } from '../../types';
import MobileNavBar from '../../components/MobileNavBar';
import DatabaseItemHead from '../../components/DatabaseItemHead';
import MobileNavMenu from '../../components/MobileNavMenu';
import { useEffect, useState } from 'react';
import DatabaseItemContent from '../../components/DatabaseItemContent';
import getPages from '../../helpers/getPages';
import getPage from '../../helpers/getPage';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
  // Get pages
  const pageResponse = await getPages({
    prefix: 'doc',
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
      prefix: 'doc',
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
export default function DocumentPage(pageData: PageData) {
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
      />
    </main>
  );
}