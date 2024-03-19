import utils from '../styles/utils.module.css';
import styles from './about.module.css';
import Head from 'next/head';

import Card from '../components/content/Card';
import Anchor from '../components/Anchor';
import Focus from '../components/content/Focus';
import Footer from '../components/Footer';
import ContactCTA from '../components/content/ContactCTA';
import GalleryScrollFocus from '../components/content/GalleryScrollFocus';
import Link from 'next/link';

/**
 * React component for the unified home page.
 * This home page prioritizes quality of work over quantity,
 * while keeping users engaged.
 */
function About() {
  return (
    <main>
      <Head>
        <title>About | Brendan Chen</title>
      </Head>

      <div className={styles.backButtonContainer}>
        <Link href="/">
          <p className={`${utils.monoText} ${utils.smallText}`}>← Back to Home</p>
        </Link>
      </div>

      <Focus imagePath="/static/about/image-0.png" imageAlt="Me standing in the woods.">
        <h2>I{"'"}m Brendan, a developer and second year student at Chapman University.</h2>
        <p className={utils.monoText}>Scroll down to learn more about me...</p>
      </Focus>
      <GalleryScrollFocus images={[
        {
          imagePath: '/static/about/image-1.png',
          imageAlt: 'Chapman University\'s Fowler School of Engineering, located in Swenson Hall.',
        },
        {
          imagePath: '/static/about/image-2.png',
          imageAlt: 'Whiteboards in Chapman University\'s Keck science center.'
        },
        {
          imagePath: '/static/about/image-3.png',
          imageAlt: 'Outside patio in Chapman University\'s Keck science center.',
        },
      ]}>
        <h2>In August 2022, I started studying <b>computer science</b> at Chapman University{"'"}s <b>Fowler School of Engineering</b>.</h2>
        <p>I chose this path because I view <b>engineering as an art form</b>, a method of communication with an audience that spans billions. Computer science is the means to understanding the toolset required for success.</p>
      </GalleryScrollFocus>
      <GalleryScrollFocus images={[
        {
          imagePath: '/static/about/image-4.png',
          imageAlt: 'My team standing on a stage to accept the CruzHacks 2024 President\'s Pick award.',
        },
        {
          imagePath: '/static/about/image-5.png',
          imageAlt: 'My team sitting around a table, working on the CruzHacks 2024 project. Several laptops are open, including one with Xcode running.',
        },
        {
          imagePath: '/static/about/image-6.png',
          imageAlt: 'My CruzHacks 2024 team walking outside on a late night.',
        },
      ]}>
        <p>Through a strong focus on academics, I was selected for the Provost’s List award in spring and fall 2023. I also participate in several engineering-related clubs and served as the graphic designer for Chapman’s iOS Developers Club.</p>
        <p>In January 2024, I attended <b>CruzHacks 2024</b> representing Chapman’s <b>Computer Science Club</b>, winning the President’s Pick award with our project.</p>
      </GalleryScrollFocus>
      <GalleryScrollFocus images={[
        {
          imagePath: '/static/about/image-7.png',
          imageAlt: 'Me walking around under a set of flowers, on the top floor of Taipei 101.',
        }
      ]}>
        <p>In the future, I aspire to be a <b>software engineer</b> who challenges the status quo. I consider myself a calculated risk-taker, a critical thinker, who stops at nothing and <b>dares to dream</b> about future ambitions.</p>
      </GalleryScrollFocus>
      <div className={styles.projectPhilosophyWrapper}>
        <h1>Project Philosophy</h1>
        <div className={styles.projectPhilosophyHorizontalLayout}>
          <div className={styles.projectPhilosophyDescriptionWrapper}>
            <p>
              I work on a variety of personal projects and contracted work.
              <br></br>
              In each project, I try to adhere to a set of guiding principles.
            </p>
          </div>
          <div className={styles.projectPhilosophyListWrapper}>
            <div className={styles.projectPhilosophyListItem}>
              <p><b>1.</b></p>
              <p>
                <b>I work on projects that I personally believe in.</b>
                <br></br>
                I{"'"}m more interested in projects where I can see the impact on real-world users.
              </p>
            </div>
            <div className={styles.projectPhilosophyListItem}>
              <p><b>2.</b></p>
              <p>
                <b>I move fast through clear communication and an efficient work style.</b>
                <br></br>
                I prefer to maximize efficiency through focus sessions, comprehensive documentation, and asynchronous communication.
              </p>
            </div>
            <div className={styles.projectPhilosophyListItem}>
              <p><b>3.</b></p>
              <p>
                <b>I care equally as much about the process as the final product.</b>
                <br></br>
                I aim to leave behind something that can be iterated upon.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <ContactCTA />
      <Footer />
    </main>
  )
}

export default About;