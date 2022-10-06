import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import { REVALIDATE } from '../helpers/Constants';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import getPage from '../helpers/getPage';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { PageData } from '../types';
import PageButton from '../components/PageButton';

export async function getStaticProps() {
  const pageData = await getPage({
    prefix: 'about',
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

/**
 * Page that renders info from the About page.
 * @param param0
 * @returns
 */
export default function AboutPage({ content, allImages }: PageData) {
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
            belowText="About Me"
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <MarkdownRenderer
            content={content!}
            allImages={allImages}
          />
        </div>
        <div className={`${utils.itemWrapper}`}>
          <PageButton
            text="Say Hello 👋"
            href="/contact"
          />
        </div>
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  )
}