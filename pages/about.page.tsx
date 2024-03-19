import unified from './unified.module.css';
import utils from '../styles/utils.module.css';
import Head from 'next/head';

import Card from '../components/content/Card';
import Anchor from '../components/Anchor';
import Focus from '../components/content/Focus';
import Footer from '../components/Footer';
import ContactCTA from '../components/content/ContactCTA';

/**
 * React component for the unified home page.
 * This home page prioritizes quality of work over quantity,
 * while keeping users engaged.
 */
function About() {
  return (
    <main className={unified.main}>
      <Head>
        <title>About | Brendan Chen</title>
      </Head>

      <Focus imagePath="/static/ufh/about.png" imageAlt="Me standing in front of a painting.">
        <h2>I'm Brendan, a designer, developer, and second year student at Chapman University.</h2>
        <p className={utils.monoText}>Scroll down to learn more about me...</p>
      </Focus>
      <ContactCTA />
      <Footer />
    </main>
  )
}

export default About;