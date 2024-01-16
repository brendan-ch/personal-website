import Head from 'next/head';
import Link from 'next/link';

import Hero from '../components/content/Hero';
import styles from './404.module.css'

/**
 * Custom 500 page.
 * @returns
 */
export default function Custom500() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Internal Server Error | Brendan Chen</title>
      </Head>
      <Hero
        imagePath="/500.jpg"
        imageAlt="Capybara sitting in bath."
      >
        <h1>Internal server error</h1>
        <div className={styles.textContainer}>
          <p>Something went wrong while loading this page; maybe try again later?</p>
          <Link href="/">
            <p>
              <u>
                Back to Home
              </u>
            </p>
          </Link>
        </div>
        <div className={styles.creditTextWrapper}>
          <p className={styles.creditText}>
            Image by{' '}
            <Link href="https://unsplash.com/@sushioutlaw" target="_blank">

              <u>
                Brian McGowan
              </u>

            </Link>
            {' on '}
            <Link href="https://unsplash.com" target="_blank">

              <u>
                Unsplash
              </u>

            </Link>.
          </p>
        </div>
      </Hero>
    </main>
  );
}