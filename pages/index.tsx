import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/navbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <NavBar selected="Projects" />
      <main className={styles.main}>
        <h2>Brendan Chen</h2>
        <h1>Developer and Designer</h1>
      </main>
    </div>
  )
}

export default Home
