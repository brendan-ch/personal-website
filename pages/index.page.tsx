import Image from 'next/image';
import unified from './unified.module.css';
import utils from '../styles/utils.module.css';
import Head from 'next/head';

import Link from 'next/link';
import Card from '../components/content/Card';
import LinkedIn from '../components/logos/LinkedIn';
import GitHub from '../components/logos/GitHub';
import ActionButton from '../components/ActionButton';
import Anchor from '../components/Anchor';
import Focus from '../components/content/Focus';
import Footer from '../components/Footer';
import Hero from '../components/content/Hero';

/**
 * React component for the unified home page.
 * This home page prioritizes quality of work over quantity,
 * while keeping users engaged.
 */
function UnifiedHome() {
  return (
    <main className={unified.main}>
      <Head>
        <title>Brendan Chen</title>
      </Head>
      <Hero
        imagePath="https://images.unsplash.com/photo-1696979944149-b33f63ef97b8?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Lightning over a dark sky"
      >
        <h1>
          I{'\''}m Brendan, a designer and developer in Orange, CA.
        </h1>
        <div className={unified.socials}>
          <Link href="https://linkedin.com/in/brendan-ch" target="_blank" rel="noreferrer">
            <LinkedIn />
          </Link>
          <Link href="https://github.com/brendan-ch" target="_blank" rel="noreferrer">
            <GitHub />
          </Link>
        </div>
      </Hero>


      <Focus imagePath="/static/ufh/about.png" imageAlt="Me standing in front of a painting.">
        <h2>I{"'"}m a second-year student at <b>Chapman University</b>, majoring in <b>software engineering</b> and minoring in <b>Chinese</b>.</h2>
        <h2>I work on projects that <b>I personally believe in</b>, with a focus on <b>agility</b>, <b>attention to detail</b>, and <b>process</b>.</h2>
        <p className={utils.monoText}>Keep scrolling for some of my selected works...</p>
      </Focus>
      <div className={unified.anchorWrapper}>
        <Anchor
          text="Select Works"
        />
      </div>
      <div className={unified.works}>
      <Card
          externalLinks={[
            {
              name: 'View GitHub',
              url: 'https://github.com/brendan-ch/PowerToThePeople'
            },
            {
              name: 'View on Devpost',
              url: 'https://devpost.com/software/power-to-the-people-lbhxyd'
            },
            {
              name: 'CruzHacks',
              url: 'https://cruzhacks.com',
            }]}
          title="Power to the People"
          description="A mobile app designed to make traffic stops safer, developed during CruzHacks 2024. Record interactions with police, assign and text emergency contacts, and be informed of your rights. I worked with a team of 4 to build a minimum viable product using SwiftUI, in a period of 36 hours. The app was selected for the Organizer's Pick award."
          imagePath="/static/ufh/power-to-the-people-01.png"
          imageAlt="Preview image for Power to the People"
        />
        <Card
          externalLinks={[
            {
              name: 'The Farmer\'s Dog',
              url: 'https://www.thefarmersdog.com'
            }]}
          title={'The Farmer\'s Dog Trivia Game'}
          description="A Windows kiosk application designed to connect customers with the Farmer's Dog experience. Play the interactive trivia game, score points, and win swag! I worked with another developer to plan out dependencies and requirements, set up the codebase, and implement the screens for the app using React Native for Windows."
          imagePath="/static/ufh/farmers-dog-03.png"
          imageAlt="Preview image for The Farmer's Dog Trivia Game"
        />
        <Card
          externalLinks={[
            {
              name: 'View design',
              url: 'https://design.bchen.dev/work/cmes-admin-panel'
            },
            {
              name: 'Techies Without Borders',
              url: 'https://techieswithoutborders.us'
            },
            {
              name: 'CMES Project',
              url: 'https://cmesworld.org',
            }]}
          title="CMES Admin Panel"
          description="UI/UX design and web development project for Techies Without Borders. I led the redesign and re-implementation of the CMES admin panel, facilitating the distribution of medical content to resource-constrained countries."
          imagePath="/static/ufh/cmes.png"
          imageAlt="Preview image for CMES Admin Panel"
        />
        <Card
          externalLinks={[
            {
              name: 'View design',
              url: 'https://design.bchen.dev/work/clockwise'
            },
            {
              name: 'View GitHub',
              url: 'https://github.com/brendan-ch/clockwise'
            },
            {
              name: 'View web app',
              url: 'https://clockwise.bchen.dev'
            },
          ]}
          title="Clockwise"
          description="The Pomodoro timer designed to help you focus. Designed, developed, and shipped over an initial 3-month period, with a stream of new features and improvements added post-launch. Built using React Native."
          imagePath="/static/ufh/clockwise.png"
          imageAlt="Preview image for Clockwise"
        />
        <Card
          externalLinks={[
            {
              name: 'View website',
              url: 'https://design.bchen.dev/'
            },
            {
              name: 'View GitHub',
              url: 'https://github.com/brendan-ch/personal-design-website'
            },
          ]}
          title="Design by Brendan Chen"
          description="My personal design portfolio, designed to showcase a variety of visual works."
          imagePath="/static/ufh/design.png"
          imageAlt="Preview image for Design by Brendan Chen"
        />
      </div>
      {/* <div className={unified.anchorWrapper}>
        <Anchor
          text="More Works"
        />
      </div> */}
      <div className={unified.anchorWrapper}>
        <Anchor
          text="Contact Me"
        />
      </div>
      <div className={unified.contact}>
        <h1>Let{"'"}s work together.</h1>
        <div className={unified.contactButtons}>
          <ActionButton text="View resume" href="/resume.pdf" useRegularLink />
          <ActionButton text="me@bchen.dev" href="mailto:me@bchen.dev" highlighted />
        </div>
      </div>
      <Footer />
    </main>
  )
}

const toExport = UnifiedHome;
export default toExport;
