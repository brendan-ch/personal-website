import NavBar from '../components/navbar';
import PageHeader from '../components/PageHeader';
import utils from '../styles/utils.module.css';

export default function AboutPage() {
  return (
    <div className={utils.rootContainer}>
      <NavBar selected="About" />
      <main>
        <PageHeader
          aboveText="Brendan Chen"
          belowText="About Me"
        />
      </main>
    </div>
  )
}