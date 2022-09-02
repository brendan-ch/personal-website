import styles from '../styles/contact.module.css';
import utils from '../styles/utils.module.css';
import PageButton from '../components/PageButton';
import TextInput from '../components/TextInput';
import Head from 'next/head';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function ContactForm() {
  const [menuVisible, setMenuVisible] = useState(false);
  
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
          <form className={styles.form}>
            <TextInput
              placeholder="Name"
              onBlur={(text) => console.log(text)}
              error="Error"
              showError
            />
            <TextInput
              placeholder="Email"
              onBlur={(text) => console.log(text)}
              error="Error"
              showError
            />
            <TextInput
              placeholder="Subject"
              onBlur={(text) => console.log(text)}
              error="Error"
              showError
            />
            <TextInput
              placeholder="Message"
              onBlur={(text) => console.log(text)}
              error="Error"
              showError
            />
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