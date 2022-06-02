import type { NextPage } from 'next';
import { useState } from 'react';
import MobileNavBar from '../components/MobileNavBar';
import MobileNavMenu from '../components/MobileNavMenu';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';

const Home: NextPage = () => {
  // Whether the navigation menu is open
  const [menuToggled, setMenuToggled] = useState(false);
  const selected = "Projects";

  return (
    <div className={utils.rootContainer}>
      <NavBar selected={selected} />
      <MobileNavBar
        title={selected}
        button="hamburger"
        onPress={() => setMenuToggled(!menuToggled)}
      />
      <main>
        <PageHeader
          aboveText="Brendan Chen"
          belowText="Developer and Designer"
          includeLogo
        />
      </main>
      <MobileNavMenu
        selected={selected}
        visible={menuToggled}
        onClose={() => setMenuToggled(false)}
      />
    </div>
  )
}

export default Home
