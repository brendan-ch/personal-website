import Head from 'next/head';
import Link from 'next/link';
import utils from '../styles/utils.module.css';

import Image404 from '../public/404.jpg';
import PageHeader from '../components/PageHeader';
import Image from 'next/image';

/**
 * Custom 404 page.
 * @returns
 */
export default function Custom404() {
  return (
    <main>
      <Head>
        <title>Page Not Found | Brendan Chen</title>
      </Head>
      <div className={utils.itemWrapper}>
        <PageHeader
          belowText="Page Not Found"
        // includeBackButton
        // backButtonHref="/"
        />
      </div>
      <div className={`${utils.itemWrapper}`}>
        <p>We couldn’t find the page you were looking for.</p>
        <Link href="/">

          <p>
            <u>
              Back to Home
            </u>
          </p>

        </Link>
        <Image
          src={Image404}
          alt="Capybara in bath"
        />
        <p>
          (Image by{' '}
          <Link href="https://unsplash.com/@veverkolog" target="_blank">

            <u>
              Dušan veverkolog
            </u>

          </Link>
          {' on '}
          <Link href="https://unsplash.com" target="_blank">

            <u>
              Unsplash
            </u>

          </Link>
          )
        </p>
      </div>
    </main>
  );
}