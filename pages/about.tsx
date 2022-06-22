import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import { ABOUT_PAGE_ID, REVALIDATE } from '../helpers/Constants';
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
      // lastRegenerated: Date.now(),
    },
    revalidate: REVALIDATE,
  }
}

interface Props {
  blocks: any[],
}

/**
 * Page that renders info from the About page.
 * @param param0
 * @returns
 */
export default function AboutPage({ blocks }: Props) {
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
        <div className={utils.scrollable}>
          <NotionRenderer
            blocks={blocks}
          />
        </div>
      </main>
    </div>
  )
}