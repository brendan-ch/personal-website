import type { NextPage } from 'next';
import NavBar from '../components/navbar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';

const Home: NextPage = () => {
  return (
    <div className={utils.rootContainer}>
      <NavBar selected="Projects" />
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
