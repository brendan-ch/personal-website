import { PageData, PageListFilter, PageListResponse, PageListSort, TagObject } from '../types';
import styles from '../styles/Database.module.css';
import GalleryItem from './GalleryItem';
import useSWR from 'swr';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import PageButton from './PageButton';
import { GROUP_PAGE_SIZE } from '../helpers/Constants';
import TagBar from './TagBar';
import GalleryItemPlaceholder from './GalleryItemPlaceholder';

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
  onLoadComplete?: (max: number) => any,
  filter?: PageListFilter[],
  sort?: PageListSort[],
}

export function Group({
  startIndex,
  prefix,
  onLoadComplete,
  onLoadStart,
  filter,
  sort,
}: GroupProps) {
  const fetcher = async (url: string, config: any) => {
    return await axios.post(url, config);
  };

  // Handle data fetching
  const { data, error } = useSWR(['/api/query/pages', {
    prefix,
    startIndex,
    pageSize: GROUP_PAGE_SIZE,
    filter,
    sort,
  }], fetcher);
  const pageResponse: PageListResponse = data?.data.data;

  useEffect(() => {
    if (!data && !error && onLoadStart) {
      onLoadStart();
    }

    if ((data || error) && onLoadComplete && pageResponse) {
      onLoadComplete(pageResponse.totalCount);
    }
  }, [data, error, onLoadStart, onLoadComplete, pageResponse]);


  // Error while loading
  if (error) {
    return (
      <p>There was an issue loading this component. Please try again later.</p>
    );
  }

  // Loading
  if (!pageResponse) {
    const rows = [];
    for (let i = 0; i < GROUP_PAGE_SIZE; i += 2) {
      rows.push((
        <GalleryItemRow key={i}>
          <GalleryItemPlaceholder />
          <GalleryItemPlaceholder />
        </GalleryItemRow>
      ));
    }

    // Return nothing
    return (
      <>
        {rows}
      </>
    );
  }

  // Return fragment with gallery items
  return (
    <>
      {pageResponse.pageData.map((_: PageData, index: number) => {
        if (index % 2 == 0) {
          return (
            <GalleryItemRow key={index}>
              {pageResponse.pageData[index] ? (
                <GalleryItem
                  key={0}
                  title={pageResponse.pageData[index].title || ''}
                  imageLink={pageResponse.pageData[index].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index].id}`}
                  description={pageResponse.pageData[index].tags ? pageResponse.pageData[index].tags?.filter((item) => item !== 'Featured').join(', ') : undefined}
                  hoverContent={pageResponse.pageData[index].description || undefined}
                />
              ) : <></>}
              {pageResponse.pageData[index + 1] ? (
                <GalleryItem
                  key={1}
                  title={pageResponse.pageData[index + 1].title || ''}
                  imageLink={pageResponse.pageData[index + 1].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index + 1].id}`}
                  description={pageResponse.pageData[index + 1].tags ? pageResponse.pageData[index + 1].tags?.filter((item) => item !== 'Featured').join(', ') : undefined}
                  hoverContent={pageResponse.pageData[index + 1].description || undefined}
                />
              ) : <GalleryItem />}
            </GalleryItemRow>
          )
        } else {
          return <React.Fragment key={index}></React.Fragment>;
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
  availableTags?: TagObject[],
}

export default function Database({
  pageResponse,
  prefix,
  availableTags,
}: Props) {
  const [loading, setLoading] = useState(false);
  
  const [count, setCount] = useState(1);
  const [max, setMax] = useState(pageResponse.totalCount);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  // Change whether to show data fetched client-side, or data pre-rendered from server
  const [dataChanged, setDataChanged] = useState(false);

  function handleLoadStart() {
    setLoading(true);
  }

  function handleLoadComplete(max: number) {
    setLoading(false);
    setMax(max);
  }

  // Add groups
  const groups = [];
  if (pageResponse.nextIndex || dataChanged) {
    for (let i = 0; i < count; i++) {
      groups.push(<Group
        key={i}
        startIndex={(dataChanged || !pageResponse.nextIndex ? 0 : pageResponse.nextIndex) + (GROUP_PAGE_SIZE * (i))}
        prefix={prefix}
        onLoadStart={handleLoadStart}
        onLoadComplete={handleLoadComplete}
        filter={availableTags ? [
          {
            tags: {
              contains: selectedTags.map((index) => availableTags[index].name),
            },
          },
        ] : undefined}
        sort={[
          {
            property: 'order',
            order: 'asc',
          },
        ]}
      />);
    }
  }

  // Calculate whether maximum reached
  let maxReached: boolean;

  if (dataChanged) {
    maxReached = (
      (GROUP_PAGE_SIZE * count) >= max
    );
  } else {
    maxReached = (
      pageResponse.nextIndex && pageResponse.nextIndex + (GROUP_PAGE_SIZE * count) >= max
    ) || !pageResponse.nextIndex;
  }

  /**
   * Handle setting the count state.
   */
  const handleSetCount = useCallback(() => {
    if (!maxReached) {
      setCount(count + 1);
    }
  }, [count, maxReached]);

  /**
   * Handle selection of a tag.
   * @param index
   */
  const handleSelectTag = useCallback((index: number) => {
    if (selectedTags.includes(index)) {
      // Remove
      const newArr = selectedTags.filter((value) => value !== index);
      setSelectedTags(newArr);

      if (newArr.length === 0) {
        setDataChanged(false);
      }
    } else {
      // Add
      setDataChanged(true);
      setSelectedTags([...selectedTags, index]);
    }
  }, [selectedTags]);

  /**
   * Clear all tags from selection.
   */
  const handleClearTags = useCallback(() => {
    setSelectedTags([]);
  }, []);

  return (
    <div className={styles.container}>
      {availableTags ? (
        <TagBar
          tags={availableTags}
          selected={selectedTags}
          onSelect={handleSelectTag}
          onClear={handleClearTags}
        />
      ) : undefined}
      
      {/* Server-side rendered */}
      {!dataChanged ? pageResponse.pageData.map((item: PageData, index: number) => {
        if (index % 2 == 0) {
          return (
            <GalleryItemRow key={index}>
              {pageResponse.pageData[index] ? (
                <GalleryItem
                  key={0}
                  title={pageResponse.pageData[index].title || ''}
                  imageLink={pageResponse.pageData[index].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index].id}`}
                  description={pageResponse.pageData[index].tags ? pageResponse.pageData[index].tags?.filter((item) => item !== 'Featured').join(', ') : undefined}
                  hoverContent={pageResponse.pageData[index].description || undefined}
                />
              ) : <></>}
              {pageResponse.pageData[index + 1] ? (
                <GalleryItem
                  key={1}
                  title={pageResponse.pageData[index + 1].title || ''}
                  imageLink={pageResponse.pageData[index + 1].previewImage || ''}
                  link={`/${prefix}/${pageResponse.pageData[index + 1].id}`}
                  description={pageResponse.pageData[index + 1].tags ? pageResponse.pageData[index + 1].tags?.filter((item) => item !== 'Featured').join(', ') : undefined}
                  hoverContent={pageResponse.pageData[index + 1].description || undefined}
                />
              ) : <GalleryItem />}
            </GalleryItemRow>
          )
        } else {
          return <React.Fragment key={index}></React.Fragment>;
        }
      }) : undefined}
      {dataChanged ? (
        groups
      ) : undefined}
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