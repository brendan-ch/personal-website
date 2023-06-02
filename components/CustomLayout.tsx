import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SelectedPage } from '../types';

interface Props {
  children: JSX.Element | JSX.Element[],
}

const PATH_NAVIGATION_MAP: {
  [type: string]: SelectedPage,
} = {
  '/': 'Home',
  '/work': 'My Work',
  '/contact': 'Contact Me',
};

export default function CustomLayout({ children }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selected, setSelected] = useState<'Home' | 'My Work' | 'Contact Me'>(PATH_NAVIGATION_MAP['/']);

  const router = useRouter();

  useEffect(() => {
    setMenuVisible(false);
    setSelected(PATH_NAVIGATION_MAP[router.asPath]);
  }, [router.asPath]);

  return (
    <div className={utils.rootContainer}>
      <span id="top"></span>
      <MobileNavBar
        // selected={selected}
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        selected={selected}
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      {children}
      <div className={utils.spacer} />
      <div className={utils.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
}