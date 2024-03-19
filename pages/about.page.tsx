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
        <p>I chose this path because I view <b>engineering as an art form</b>, a method of communication with an audience that spans billions. Computer science is the means to understanding the toolset required for success.</p>
      </GalleryScrollFocus>
      <GalleryScrollFocus images={[]}>
        <p>Through a strong focus on academics, I was selected for the Provost’s List award in spring and fall 2023. I also participate in several engineering-related clubs and served as the graphic designer for Chapman’s iOS Developers Club.</p>
        <p>In January 2024, I attended <b>CruzHacks 2024</b> representing Chapman’s <b>Computer Science Club</b>, winning the President’s Pick award with our project.</p>
      </GalleryScrollFocus>
      <GalleryScrollFocus images={[]}>
        <p>In the future, I aspire to be a <b>software engineer</b> who challenges the status quo. I consider myself a calculated risk-taker, a critical thinker, who stops at nothing and <b>dares to dream</b> about future ambitions.</p>
      </GalleryScrollFocus>
      <div>
        <h1>Project Philosophy</h1>
        <div>
          <p>I work on a variety of personal projects and contracted work. In each project, I try to adhere to a set of guiding principles.</p>
          <div>
            <div>
              <p><b>1.</b></p>
              <p><b>I work on projects that I personally believe in.</b> I'm more interested in projects where I can see the impact on real-world users.</p>
            </div>
            <div>
              <p><b>3.</b></p>
              <p><b>I move fast through clear communication and an efficient work style.</b>{'\n'}I prefer to maximize efficiency through focus sessions, comprehensive documentation, and asynchronous communication.</p>
            </div>
            <div>
              <p><b>3.</b></p>
              <p><b>I care equally as much about the process as the final product.</b>{'\n'}I aim to leave behind something that can be iterated upon.</p>
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