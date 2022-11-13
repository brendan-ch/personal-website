import Head from 'next/head';
import Link from 'next/link';
import utils from '../styles/utils.module.css';

import Image500 from '../public/500.jpg';
import PageHeader from '../components/PageHeader';
import Image from 'next/image';

/**
 * Custom 500 page.
 * @returns
 */
export default function Custom500() {
  return (
    <main>
      <Head>
        <title>Internal Server Error | Brendan Chen</title>
      </Head>
      <div className={utils.itemWrapper}>
        <PageHeader
          belowText="Internal Server Error"
        // includeBackButton
        // backButtonHref="/"
        />
      </div>
      <div className={`${utils.itemWrapper}`}>
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
        <Image
          src={Image500}
          alt="Capybara swimming"
        />
        <p>
          (Image by{' '}
          <Link href="https://unsplash.com/@sushioutlaw">
            <a target="_blank">
              <u>
                Brian McGowan
              </u>
            </a>
          </Link>
          {' on '}
          <Link href="https://unsplash.com">
            <a target="_blank">
              <u>
                Unsplash
              </u>
            </a>
          </Link>
          )
        </p>
      </div>
    </main>
  );
}