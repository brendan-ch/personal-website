import Image from 'next/image';
import styles from './index.module.css';
import unified from './unified.module.css';
import utils from '../styles/utils.module.css';
import Head from 'next/head';

import AboutImage from '../public/about.jpeg';
import LogoStandaloneWithoutBorder from '../components/icons/LogoStandaloneWithoutBorder';
import Link from 'next/link';
import ChevronRight from '../components/icons-v2/ChevronRight';
import PageButton from '../components/PageButton';
import Card from '../components/content/Card';
import LinkedIn from '../components/logos/LinkedIn';
import GitHub from '../components/logos/GitHub';
import ActionButton from '../components/ActionButton';

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
      <div className={unified.focus}>
        <div className={unified.focusContent}>
          <h2>I{"'"}m a second-year student at <b>Chapman University</b>, majoring in <b>software engineering</b> and minoring in <b>graphic design</b> and <b>Chinese</b>.</h2>
          <h2>I create <b>meaningful</b> projects and bring them to life through <b>innovative design</b> and <b>meticulous execution</b>.</h2>
          <p className={utils.monoText}>Keep scrolling for some of my selected works...</p>
        </div>
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
      <div className={unified.contact}>
        <h1>Let{"'"}s work together.</h1>
        <div className={unified.contactButtons}>
          {/* <PageButton text="Resume" /> */}
          <ActionButton text="me@bchen.dev" href="mailto:me@bchen.dev" highlighted />
        </div>
      </div>
      <div className={unified.footer}>
        <Link href="#">
          <p>
            Back to top
          </p>
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

/**
 * Home page.
 * @returns
 */
function Home() {
  return (
    <main>
      <Head>
        <title>Brendan Chen</title>
      </Head>
      <div className={styles.titleLogoDivider}>
        <div className={styles.titleDivider}>
          <h1>
            I{'\''}m Brendan, a
          </h1>
          <h1>
            designer and developer
          </h1>
          <h1>
            in Orange, CA.
          </h1>
        </div>
        <div className={styles.logoDivider}>
          <LogoStandaloneWithoutBorder
            width={145.84931482}
            height={168}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sectionDivider}>
          <div className={utils.pageImageContainer}>
            <Image
              src={AboutImage}
              alt="Me standing at the Getty Museum."
              fill
            />
          </div>
          <p>I{'\''}m Brendan, a designer, developer, and college student living in Orange, California. Currently, I{'\''}m a software engineering major and graphic design minor at Chapman University. In my free time, I enjoy reading, playing video games, and brewing coffee.</p>
        </div>
        <div className={styles.sectionDivider}>
          <p>
            <b>
              Things I{'\''}m currently doing
            </b>
          </p>
          <ul>
            <li>Pursuing a bachelor’s degree in software engineering and a minor in graphic design at Chapman University</li>
            <li>UI design, software engineering and project management at <a href="https://techieswithoutborders.us" target="_blank" rel="noreferrer"><u>Techies Without Borders</u></a>, a non-profit organization dedicated to helping underserved countries</li>
          </ul>
        </div>
        <div className={styles.sectionDivider}>
          <p>
            <b>
              Things I{'\''}ve done in the past
            </b>
          </p>
          <ul>
            <li>Designed and created <a href="https://clockwise.bchen.dev" target="_blank" rel="noreferrer"><u>Clockwise</u></a>, a Pomodoro timer designed to help you focus</li>
            <li>Created <Link href="/work/standard-catalog"><u>Standard Catalog</u></Link>, a redesign of the college registration experience</li>
            <li>Designed the official <Link href="/work/planner-cover"><u>planner cover</u></Link> for my high school</li>
          </ul>
          <Link href="/work" className={styles.databaseEndLink}>

            <p>
              See more projects
            </p>
            <ChevronRight
              width={20}
              height={20}
            />

          </Link>
        </div>
        <div className={styles.sectionDivider}>
          <p>
            <b>
              Things I{'\''}m capable of
            </b>
          </p>
          <ul>
            <li>Web development using React.js, Next.js, Angular, and TypeScript</li>
            <li>Application development using React Native and Capacitor</li>
            <li>Project management and documentation using Notion</li>
            <li>High-fidelity prototyping and wireframing using Figma</li>
          </ul>
        </div>
        <div className={`${styles.contactCtaDivider}`}>
          <div className={styles.sectionDivider}>
            <p>
              <b>
                Interested in working together?
              </b>
            </p>
            <p>
              I’m fairly busy with college, but would love to hear from you! Shoot me a message and I’ll get back to you when I can.
            </p>
          </div>
          <PageButton
            text="Send me a message"
            highlighted
            href="/contact"
          />
        </div>
      </div>
    </main>
  );
}

const toExport = process.env.NEXT_PUBLIC_UNIFIED_HOME === '1' ? UnifiedHome : Home;
export default toExport;
