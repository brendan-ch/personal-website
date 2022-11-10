import styles from '../styles/contact.module.css';
import utils from '../styles/utils.module.css';
import PageButton from '../components/PageButton';
import FormInput from '../components/FormInput';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import axios from 'axios';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

enum FormState {
  INCOMPLETE,
  SUBMITTED,
  SERVER_ERROR,
  USER_ERROR,
  NO_RECAPTCHA_PROVIDED,
}

interface FormInputItem {
  name: string,
  label: string,
  pattern?: RegExp,
  required: boolean,
  placeholder: string,
  noMatchError?: string,
  multiline?: boolean,
}

const formInputItems: FormInputItem[] = [
  {
    name: 'name',
    label: 'Name',
    required: true,
    placeholder: 'e.g. John Doe',
  },
  {
    name: 'email',
    label: 'Email',
    required: true,
    placeholder: 'e.g. email@example.com',
    pattern: /.+@[A-Za-z0-9_]+\.[A-Za-z]+/,
    noMatchError: 'Please enter a valid email address.',
  },
  {
    name: 'subject',
    label: 'Subject',
    required: true,
    placeholder: 'Enter a subject line...',
  },
  {
    name: 'message',
    label: 'Message',
    required: true,
    placeholder: 'Enter your message...',
    pattern: /.{16,}/,
    noMatchError: 'Please enter 16 characters or more.',
    multiline: true,
  },
];

export default function ContactForm() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(FormState.INCOMPLETE);

  const [loadScripts, setLoadScripts] = useState(false);

  useEffect(() => {
    // router.events.on('routeChangeComplete', handlePageLoad);
    setLoadScripts(true);

    return () => {
      setLoadScripts(false);
    };
  }, [router.asPath]);

  /**
   * Handle data submission to the server.
   * @param event
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Retrieve form data
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries()) as {
      [k: string]: string,
    };

    const tests: boolean[] = Object.values(fieldValues).map((value, index) => {
      if (index >= Object.keys(formInputItems).length) return true;
      const inputItem = formInputItems[index];

      if (inputItem.required && value) {
        if ((inputItem.pattern && inputItem.pattern.test(value)) || !inputItem.pattern) {
          return true;
        } else {
          return false;
        }
      } else if (!inputItem.required) {
        return true;
      } else {
        return false;
      }
    });

    // Invalid data - don't send
    if (tests.filter((value) => !value).length > 0) {
      return;
    }

    if (!fieldValues['g-recaptcha-response']) {
      setFormState(FormState.NO_RECAPTCHA_PROVIDED);
      return;
    }

    setLoading(true);

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
      setLoading(false);
    }
  }
  
  let statusRenderer: JSX.Element = <></>;

  switch (formState) {
    case FormState.NO_RECAPTCHA_PROVIDED:
      statusRenderer = (
        <p>
          Please complete the reCAPTCHA before continuing.
        </p>
      );
      break;
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
          Your message has been sent.{' '}
          <Link href="/">
            <a>
              <u>
                Return to Home
              </u>
            </a>
          </Link>
        </p>
      );
      break;
    default:
      statusRenderer = (
        <p></p>
      );
  }

  return (
    <div className={utils.rootContainer}>
      <Head>
        <title>Brendan Chen</title>
        {loadScripts ? (
          <>
            <script src="https://www.google.com/recaptcha/api.js" async></script>
          </>
        ) : undefined}
      </Head>
      <MobileNavBar
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        selected="Contact Me"
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <main>
        <div className={utils.itemWrapper}>
          <PageHeader
            belowText="Contact Me"
          />
        </div>
        <div className={utils.itemWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Construct form according to type definition */}
            {formInputItems.map((item, index) => (
              <FormInput
                key={index}
                {...item}
              />
            ))}
            <div className={`g-recaptcha ${utils.recaptchaBox}`} data-sitekey="6Ld7rsghAAAAAIG8gMOX7BiLOoYC1BqDE1TkJcDM"></div>
            <p>Data that you provide in this form will be handled according to the{' '}
              <Link href="/doc/privacy">
                <a target="_blank" rel="noreferrer">
                  <u>
                    Privacy Policy
                  </u>
                </a>
              </Link>
              .
            </p>

            <PageButton
              highlighted
              disabled={loading || formState === FormState.SUBMITTED}
              text={loading ? 'Sending message...' : 'Send Message'}
            />
            {/* Status */}
            {statusRenderer}

          </form>
        </div>
        <div className={utils.footerWrapper}>
          <Footer />
        </div>
      </main>
    </div>
  );
}