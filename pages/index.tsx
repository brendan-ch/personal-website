import type { NextPage } from 'next';
import NavBar from '../components/navbar';
import utils from '../styles/utils.module.css';

const Home: NextPage = () => {
  return (
    <div className={utils.rootContainer}>
      <NavBar selected="Projects" />
      <main>
        <h2>Brendan Chen</h2>
        <h1>Developer and Designer</h1>
      </main>
    </div>
  )
}

export default Home
