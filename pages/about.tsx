import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import { ABOUT_PAGE_ID, REVALIDATE } from '../helpers/Constants';
import NotionRenderer from '../components/NotionRenderer';
import getChildrenBlocks from '../helpers/getChildrenBlocks';
import Head from 'next/head';
// import uploadImageBlocks from '../helpers/aws/uploadImageBlocks';
// import writeImageBlocks from '../helpers/writeImageBlocks';
import updateImageBlocks from '../helpers/updateImageBlocks';

export async function getStaticProps() {
  // This is server side code
  let blocks = await getChildrenBlocks(ABOUT_PAGE_ID);
  if (!blocks) {
    return {
      props: {
        blocks: [],
      },
      revalidate: REVALIDATE,
    }
  }

  // Upload images to AWS
  blocks = await updateImageBlocks(blocks);

  // Return block objects
  return {
    props: {
      blocks,
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