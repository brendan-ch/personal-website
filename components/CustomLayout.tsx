import MobileNavBar from '../components/MobileNavBar';
import utils from '../styles/utils.module.css';
import Footer from '../components/Footer';
import MobileNavMenu from '../components/MobileNavMenu';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  children: JSX.Element | JSX.Element[],
}

export default function CustomLayout({ children }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMenuVisible(false);
  }, [router.asPath]);

  return (
    <div className={utils.rootContainer}>
      <MobileNavBar
        // selected={selected}
        onMobileButtonClick={() => setMenuVisible(true)}
      />
      <MobileNavMenu
        // selected={selected}
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