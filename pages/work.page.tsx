import utils from '../styles/utils.module.css';
import { PageListResponse, TagObject } from '../types';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import Database from '../components/database/Database';
import getPages from '../helpers/getPages';
import getTags from '../helpers/getTags';


export async function getStaticProps() {
  const response = await getPages({
    prefix: 'work',
    sort: [
      {
        property: 'order',
        order: 'asc',
      },
    ],
  });

  const allPages = await getPages({
    prefix: 'work',
  });
  const tags = getTags(allPages.pageData);

  return {
    props: {
      listResponse: response,
      availableTags: tags,
    },
  };
}

interface Props {
  listResponse: PageListResponse,
  availableTags: TagObject[],
}

export default function Work({ listResponse, availableTags }: Props) {
  return (
    <main>
      <Head>
        <title>My Work | Brendan Chen</title>
      </Head>
      <div className={utils.itemWrapper}>
        <PageHeader
          belowText="My Work"
        />
      </div>
      <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
        <Database
          pageResponse={listResponse}
          prefix="work"
          availableTags={availableTags}
        />
      </div>
    </main>
  );
}