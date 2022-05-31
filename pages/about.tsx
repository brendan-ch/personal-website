import NavBar from '../components/navbar';
import utils from '../styles/utils.module.css';

export default function AboutPage() {
  return (
    <div className={utils.rootContainer}>
      <NavBar selected="About" />
      <main>
        <p>About Me</p>
      </main>
    </div>
  )
}