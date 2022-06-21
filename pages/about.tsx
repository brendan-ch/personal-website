import { useState } from 'react';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';
import { Client } from '@notionhq/client';
import { ABOUT_PAGE_ID, PAGE_SIZE, REVALIDATE } from '../helpers/Constants';
import NotionRenderer from '../components/NotionRenderer';
import getChildrenBlocks from '../helpers/getChildrenBlocks';
import Head from 'next/head';

export async function getStaticProps() {
  // This is server side code
  const blocks = await getChildrenBlocks(ABOUT_PAGE_ID);

  // Return block objects
  return {
    props: {
      blocks,
      lastRegenerated: Date.now(),
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  blocks: any[],
  /**
   * The ID of the next block, provided by the Notion API.
   * Null if no more blocks left.
   */
  nextCursor: string | null,
  /**
   * Time in milliseconds when the page was last regenerated.
   */
  lastRegenerated: number,
}

/**
 * Page that renders info from the About page.
 * @param param0
 * @returns
 */
export default function AboutPage({ blocks, nextCursor, lastRegenerated }: Props) {
  const selected = "About Me";

  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>About Me | Brendan Chen</title>
      </Head>
      <main>
        <MobileNavBar
          title={selected}
          display="tabs"
          selected={selected}
        />
        {/* Page content */}
        <NotionRenderer
          blocks={blocks}
        />
        {/* <div>
          {blocks.map((item, index) => {
            if (item.type && item.type === 'paragraph') {
              // Render rich text
              return (
                <div>
                  {item.paragraph.rich_text.map((richText: any, index: number) => {
                    
                    return (
                      <p key={index}>{richText.plain_text}</p>
                    );
                  })}
                </div>
              )
            }

            return (
              <p key={index}>Paragraph object</p>
            );
          })}
        </div> */}
      </main>
    </div>
  )
}