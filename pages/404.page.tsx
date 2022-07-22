import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ImageWithFadeIn from '../components/ImageWithFadeIn';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import utils from '../styles/utils.module.css';

import Image404 from '../public/static/404.jpg';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

/**
 * Custom 404 page.
 * @returns
 */
export default function Custom404() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>Page Not Found | Brendan Chen</title>
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
            belowText="404 Not Found"
            // includeBackButton
            // backButtonHref="/"
          />
        </div>
        <div className={`${utils.itemWrapper} ${utils.stretchToEnd}`}>
          <p>We couldn’t find the page you were looking for.</p>
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
            src={Image404}
          />
        </div>
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}