import MobileNavBar from '../components/MobileNavBar';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';

export default function AboutPage() {
  return (
    <div className={utils.rootContainer}>
      <NavBar selected="About" />
      <MobileNavBar selected="About" button="hamburger" />
      <main>
        <PageHeader
          aboveText="Brendan Chen"
          belowText="About Me"
        />
      </main>
    </div>
  )
}