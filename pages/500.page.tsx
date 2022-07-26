import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ImageWithFadeIn from '../components/ImageWithFadeIn';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import utils from '../styles/utils.module.css';

import Image500 from '../public/500.jpg';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

/**
 * Custom 500 page.
 * @returns
 */
export default function Custom500() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>Internal Server Error | Brendan Chen</title>
      </Head>
      <MobileNavBar
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <main>
        <div className={utils.spacer} />
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText=""
            belowText="500 Internal Server Error"
            // includeBackButton
            // backButtonHref="/"
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <p>Something went wrong when loading this page. Maybe try again later?</p>
          <Link href="/">
            <a>
              <p>
                <u>
                  Back to Home
                </u>
              </p>
            </a>
          </Link>
          <ImageWithFadeIn
            src={Image500}
          />
        </div>
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}