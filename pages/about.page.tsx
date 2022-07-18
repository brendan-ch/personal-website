import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import { ABOUT_PAGE_ID, REVALIDATE } from '../helpers/Constants';
import NotionRenderer from '../components/NotionRenderer';
import getChildrenBlocks from '../helpers/getChildrenBlocks';
import Head from 'next/head';
// import uploadImageBlocks from '../helpers/aws/uploadImageBlocks';
// import writeImageBlocks from '../helpers/writeImageBlocks';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import getPage from '../helpers/getPage';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { PageData } from '../types';

export async function getStaticProps() {
  const pageData = await getPage({
    id: 'about',
    withContent: true,
  });

  // Return block objects
  return {
    props: {
      ...pageData,
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
export default function AboutPage({ content }: PageData) {
  const selected = "About Me";

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>About Me | Brendan Chen</title>
      </Head>
      <MobileNavBar
        selected={selected}
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        selected={selected}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <main>
        <div className={utils.spacer} />
        {/* Page content */}
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText=""
            belowText="About Me"
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <MarkdownRenderer
            content={content!}
          />
        </div>
        <div className={utils.spacer} />
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  )
}