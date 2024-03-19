import unified from './unified.module.css';
import utils from '../styles/utils.module.css';
import Head from 'next/head';

import Card from '../components/content/Card';
import Anchor from '../components/Anchor';
import Focus from '../components/content/Focus';
import Footer from '../components/Footer';
import ContactCTA from '../components/content/ContactCTA';
import GalleryScrollFocus from '../components/content/GalleryScrollFocus';

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
      <GalleryScrollFocus images={[]}>
        <h2>In August 2022, I started studying <b>computer science</b> at Chapman University's <b>Fowler School of Engineering</b>.</h2>
        <p>I chose this path because I view engineering as an art form, a method of communication with an audience that spans billions. Computer science is the means to understanding the toolset required for success.</p>
      </GalleryScrollFocus>
      <GalleryScrollFocus images={[]}>
        <p>Through a strong focus on academics, I was selected for the Provost’s List award in spring and fall 2023. I also participate in several engineering-related clubs and served as the graphic designer for Chapman’s iOS Developers Club.</p>
        <p>In January 2024, I attended CruzHacks 2024 representing Chapman’s Computer Science Club, winning the President’s Pick award with our project.</p>
      </GalleryScrollFocus>
      <GalleryScrollFocus images={[]}>
        <p>In the future, I aspire to be a software engineer who challenges the status quo. I consider myself a calculated risk-taker, a critical thinker, who stops at nothing and dares to dream about future ambitions.</p>
      </GalleryScrollFocus>
      <ContactCTA />
      <Footer />
    </main>
  )
}

export default About;