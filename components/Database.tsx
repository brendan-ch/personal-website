import { PageData, PageListResponse } from '../types';
import styles from '../styles/Database.module.css';
import GalleryItem from './GalleryItem';
import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PageButton from './PageButton';

interface GroupProps {
  startIndex: number,
  prefix: string,
  onLoadStart?: () => any,
  onLoadComplete?: () => any,
}

const GROUP_PAGE_SIZE = 2;

export function Group({
  startIndex,
  prefix,
  onLoadComplete,
  onLoadStart,
}: GroupProps) {
  const fetcher = async (url: string, config: any) => {
    return await axios.post(url, config);
  };

  // Handle data fetching
  const { data, error } = useSWR(['/api/query/pages', {
    prefix,
    startIndex,
    pageSize: GROUP_PAGE_SIZE,
  }], fetcher);

  useEffect(() => {
    if (!data && !error && onLoadStart) {
      onLoadStart();
    }

    if ((data || error) && onLoadComplete) {
      onLoadComplete();
    }
  }, [data, error, onLoadStart, onLoadComplete]);

  const pageResponse: PageListResponse = data?.data.data;

  if (error) {
    return (
      <p>There was an issue loading this component. Please try again later.</p>
    );
  }

  if (!pageResponse) {
    // Return nothing
    return <></>;
  }

  // Return fragment with gallery items
  return (
    <>
      {pageResponse.pageData.map((item: PageData) => (
        <GalleryItem
          key={item.id}
          title={item.title || ''}
          imageLink={item.previewImage || ''}
          link={`/${prefix}/${item.id}`}
        />
      ))}
    </>
  )
}

interface Props {
  /**
   * Initial page response object from static rendering.
   * Use as a starting point for further requests.
   */
  pageResponse: PageListResponse,
  prefix: 'blog' | 'work' | 'doc',
}

export default function Database({
  pageResponse,
  prefix,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const groups = [];
  if (pageResponse.nextIndex) {
    for (let i = 0; i < count; i++) {
      groups.push(<Group
        key={i}
        startIndex={pageResponse.nextIndex + (GROUP_PAGE_SIZE * (count - 1))}
        prefix={prefix}
        onLoadStart={() => setLoading(true)}
        onLoadComplete={() => setLoading(false)}
      />);
    }
  }

  /**
   * Handle setting the count state.
   */
  function handleSetCount() {
    if (pageResponse.nextIndex && pageResponse.nextIndex + (GROUP_PAGE_SIZE * count) < pageResponse.totalCount) {
      setCount(count + 1);
    }
  }

  return (
    <div className={styles.container}>
      {/* Content */}
      {pageResponse.pageData.map((item) => (
        <GalleryItem
          key={item.id}
          title={item.title || ''}
          imageLink={item.previewImage || ''}
          link={`/${prefix}/${item.id}`}
        />
      ))}
      {groups}
      {/* Add load button here */}
      <PageButton
        onClick={handleSetCount}
        text={loading ? "Loading..." : "Load More"}
        disabled={loading}
      />
    </div>
  );
}