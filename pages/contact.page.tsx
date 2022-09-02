import styles from '../styles/contact.module.css';
import utils from '../styles/utils.module.css';
import PageButton from '../components/PageButton';
import FormInput from '../components/FormInput';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function ContactForm() {
  const [menuVisible, setMenuVisible] = useState(false);

  // To-do: lift data object up
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Retrieve form data
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    console.log(fieldValues)
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
              pattern={/[A-Za-z0-9]+/}
              noMatchError="Name must contain letters and numbers only."
              required
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="e.g. email@example.com"
              pattern={/.+@[A-Za-z0-9_]+\.[A-Za-z]+/}
              noMatchError="Must be a valid email address."
            />
            <FormInput
              name="subject"
              label="Subject"
              placeholder="Subject"
              pattern={/.+/}
              noMatchError="This field is required."
            />
            {/* To-do: make this multiline */}
            <FormInput
              name="message"
              multiline
              label="Message"
              pattern={/.+/}
              noMatchError="This field is required."
              placeholder="Your message"
            />
            {/* To-do: add onSubmit prop here */}
            <PageButton
              highlighted
              text="Submit"
            />
          </form>
        </div>
      </main>
    </div>
  );
}