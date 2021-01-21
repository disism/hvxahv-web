import Head from 'next/head'
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Godis Hvxahv Network</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>HELLO</h1>
      </main>
    </div>
  )
}
