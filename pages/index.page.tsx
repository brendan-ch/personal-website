import Image from 'next/image';
import unified from './unified.module.css';
import utils from '../styles/utils.module.css';
import Head from 'next/head';

import Link from 'next/link';
import Card from '../components/content/Card';
import LinkedIn from '../components/logos/LinkedIn';
import GitHub from '../components/logos/GitHub';
import ActionButton from '../components/ActionButton';
import ChevronUp from '../components/icons/ChevronUp';
import Anchor from '../components/Anchor';
import Focus from '../components/content/Focus';

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
      <div className={unified.hero}>
        <Image
          src="https://images.unsplash.com/photo-1696979944149-b33f63ef97b8?auto=format&fit=crop&q=80&w=2148&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lightning over a dark sky"
          fill
          priority
          className={unified.heroImage}
        />
        <div className={unified.heroContainer}>
          <div className={unified.heroContent}>
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
          </div>
        </div>
      </div>
      <Focus imagePath="/static/ufh/about.png" imageAlt="Me standing in front of a painting.">
        <h2>I{"'"}m a second-year student at <b>Chapman University</b>, majoring in <b>software engineering</b> and minoring in <b>graphic design</b> and <b>Chinese</b>.</h2>
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
      <div className={unified.footer}>
        <Link href="#" className={unified.horizontalWrapper}>
          <p>
            Back to top
          </p>
          <ChevronUp
            width={24}
            height={24}
          />
        </Link>
        <Link href="https://github.com/brendan-ch/personal-website" target="_blank" rel="noreferrer">
          <p>
            View on GitHub
          </p>
        </Link>
        <p>
          © 2023 Brendan Chen
        </p>
      </div>
    </main>
  )
}

const toExport = UnifiedHome;
export default toExport;
