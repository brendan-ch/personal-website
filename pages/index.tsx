import type { NextPage } from 'next';
import MobileNavBar from '../components/MobileNavBar';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';

const Home: NextPage = () => {
  return (
    <div className={utils.rootContainer}>
      <NavBar selected="Projects" />
      <MobileNavBar selected="Projects" button="hamburger" />
      <main>
        <PageHeader
          aboveText="Brendan Chen"
          belowText="Developer and Designer"
          includeLogo
        />
      </main>
    </div>
  )
}

export default Home
