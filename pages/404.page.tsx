import Head from 'next/head';

import Hero from '../components/content/Hero';
import Link from 'next/link';
import styles from './404.module.css';

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
      <Hero
        imageAlt=""
        imagePath="/404.jpg"
      >
        <h1>Page not found</h1>
        <div className={styles.textContainer}>
          <p>We couldn{"'"}t find the page you were looking for; it may have been moved or deleted.</p>
          <Link href="/">
            <p>
              <u>
                Back to Home
              </u>
            </p>
          </Link>
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
      </Hero>
    </main>
  );
}