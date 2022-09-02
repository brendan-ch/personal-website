import styles from '../styles/contact.module.css';
import utils from '../styles/utils.module.css';
import PageButton from '../components/PageButton';
import FormInput from '../components/FormInput';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import axios from 'axios';
import Link from 'next/link';

enum FormState {
  INCOMPLETE,
  SUBMITTED,
  SERVER_ERROR,
  USER_ERROR,
}

export default function ContactForm() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(FormState.INCOMPLETE);
  const [successful, setSuccessful] = useState(false);

  // To-do: lift data object up
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Retrieve form data
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());

    try {
      // API request
      const result = await axios.post('/api/submit/contact', fieldValues);

      if (result.status === 400) {
        setFormState(FormState.USER_ERROR);
      } else if (result.status === 500) {
        setFormState(FormState.SERVER_ERROR);
      } else {
        setFormState(FormState.SUBMITTED);
      }

      setLoading(false);
    } catch(e) {
      setFormState(FormState.USER_ERROR);
    }
  }
  
  let statusRenderer: JSX.Element = <></>;

  switch (formState) {
    case FormState.SERVER_ERROR:
      statusRenderer = (
        <p>
          There was an internal server error. Please try again later.
        </p>
      );
      break;
    case FormState.USER_ERROR:
      statusRenderer = (
        <p>
          There was an issue sending your message. Please double-check your fields and try again.
        </p>
      );
      break;
    case FormState.SUBMITTED:
      statusRenderer = (
        <p>
          Your message has been submitted.{' '}
          <Link href="/">
            <a>
              <u>
                Return to Home
              </u>
            </a>
          </Link>
        </p>
      );
  }

  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>Brendan Chen</title>
      </Head>
      <MobileNavBar
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <main>
        <div className={utils.spacer} />
        <div className={utils.itemWrapper}>
          <PageHeader
            aboveText=""
            belowText="Contact Me"
          />
        </div>
        <div className={utils.itemWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Construct form according to type definition */}
            <FormInput
              name="name"
              label="Name"
              placeholder="e.g. John Doe"
              pattern={/.+/}
              noMatchError="Name must contain letters and numbers only."
              required
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="e.g. email@example.com"
              pattern={/.+@[A-Za-z0-9_]+\.[A-Za-z]+/}
              noMatchError="Must be a valid email address."
              required
            />
            <FormInput
              name="subject"
              label="Subject"
              placeholder="Subject"
              required
            />
            <FormInput
              name="message"
              multiline
              label="Message"
              pattern={/.{16,}/}
              noMatchError="Message must be at least 16 characters."
              placeholder="Your message"
              required
            />
            <PageButton
              highlighted
              disabled={loading || formState === FormState.SUBMITTED}
              text={loading ? 'Sending message...' : 'Send Message'}
            />
            {/* Status */}
            {statusRenderer}
          </form>
        </div>
      </main>
    </div>
  );
}