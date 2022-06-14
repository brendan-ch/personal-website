import { useState } from 'react';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';
import { Client } from '@notionhq/client';
import { PAGE_SIZE, REVALIDATE } from '../helpers/Constants';

export async function getStaticProps() {
  // This is server side code
  const token = process.env.NOTION_TOKEN;

  // Call Notion endpoint
  const client = new Client({
    auth: token,
  });

  const response = await client.blocks.children.list({
    block_id: 'd5f92ee0527143c7b596b28b49e03937',
    page_size: PAGE_SIZE,
    // start_cursor: '0a85d4ad-0350-49ee-a592-128ec6652998',
  });

  response.results[0]

  // Return block objects
  return {
    props: {
      blocks: response.results,
      revalidate: REVALIDATE,
      lastRegenerated: Date.now(),
    },
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
  // Whether the navigation menu is open
  const [menuToggled, setMenuToggled] = useState(false);
  const selected = "About Me";

  return (
    <div className={utils.rootContainer}>
      <NavBar selected={selected} />
      <MobileNavBar
        title={selected}
        button="hamburger"
        onPress={() => setMenuToggled(!menuToggled)}
      />
      <main>
        <PageHeader
          aboveText="Brendan Chen"
          belowText="About Me"
        />
        {/* Display some info about the API request */}
        {/* Last regenerated */}
        <p>Last regenerated: {(new Date(lastRegenerated)).toDateString()} {(new Date(lastRegenerated)).toTimeString()}</p>
        {/* Page content */}
        <div>
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
        </div>
      </main>
      <MobileNavMenu
        selected={selected}
        visible={menuToggled}
        onClose={() => setMenuToggled(false)}
      />
    </div>
  )
}