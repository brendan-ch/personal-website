import { PageData, PageListResponse } from '../types';
import styles from '../styles/Database.module.css';
import GalleryItem from './GalleryItem';
import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PageButton from './PageButton';
import { GROUP_PAGE_SIZE } from '../helpers/Constants';

interface RowProps {
  children: JSX.Element | JSX.Element[],
}

export function GalleryItemRow({ children }: RowProps) {
  return (
    <div className={styles.row}>
      {children}
    </div>
  );
}

interface GroupProps {
  startIndex: number,
  prefix: string,
  onLoadStart?: () => any,
  onLoadComplete?: () => any,
}

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
      {pageResponse.pageData.map((item: PageData, index: number) => {
        if (index % 2 == 0) {
          return (
            <GalleryItemRow>
              {pageResponse.pageData[index] ? (
                <GalleryItem
                  title={pageResponse.pageData[index].title || ''}
                  imageLink={pageResponse.pageData[index].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index].id}`}
                />
              ) : <></>}
              {pageResponse.pageData[index + 1] ? (
                <GalleryItem
                  title={pageResponse.pageData[index + 1].title || ''}
                  imageLink={pageResponse.pageData[index + 1].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index + 1].id}`}
                />
              ) : <></>}
            </GalleryItemRow>
          )
        } else {
          return <></>;
        }
      })}
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

  // Add groups
  const groups = [];
  if (pageResponse.nextIndex) {
    for (let i = 0; i < count; i++) {
      groups.push(<Group
        key={i}
        startIndex={pageResponse.nextIndex + (GROUP_PAGE_SIZE * (i))}
        prefix={prefix}
        onLoadStart={() => setLoading(true)}
        onLoadComplete={() => setLoading(false)}
      />);
    }
  }

  // Calculate whether maximum reached
  const maxReached = (
    pageResponse.nextIndex && pageResponse.nextIndex + (GROUP_PAGE_SIZE * count) >= pageResponse.totalCount
  ) || !pageResponse.nextIndex;

  /**
   * Handle setting the count state.
   */
  function handleSetCount() {
    if (!maxReached) {
      setCount(count + 1);
    }
  }

  return (
    <div className={styles.container}>
      {/* Content */}
      {pageResponse.pageData.map((item: PageData, index: number) => {
        if (index % 2 == 0) {
          return (
            <GalleryItemRow>
              {pageResponse.pageData[index] ? (
                <GalleryItem
                  title={pageResponse.pageData[index].title || ''}
                  imageLink={pageResponse.pageData[index].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index].id}`}
                  description={pageResponse.pageData[index].tags ? pageResponse.pageData[index].tags?.join(', ') : undefined}
                />
              ) : <></>}
              {pageResponse.pageData[index + 1] ? (
                <GalleryItem
                  title={pageResponse.pageData[index + 1].title || ''}
                  imageLink={pageResponse.pageData[index + 1].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index + 1].id}`}
                  description={pageResponse.pageData[index].tags ? pageResponse.pageData[index].tags?.join(', ') : undefined}
                />
              ) : <GalleryItem />}
            </GalleryItemRow>
          )
        } else {
          return <></>;
        }
      })}
      {groups}
      {/* Add load button here */}
      {!maxReached ? (
        <PageButton
          onClick={handleSetCount}
          text={loading ? "Loading..." : "Load More"}
          disabled={loading}
        />
      ) : undefined} 
    </div>
  );
}