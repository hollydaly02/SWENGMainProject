import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dropdown from 'react-bootstrap/Dropdown';


export default function Home() {
  return (
    
    <div className={styles.container}>
      <Head>
        <title>SWENG 15 Dasboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className={styles.dropbtn }>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Area
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Dublin</Dropdown.Item>
        <Dropdown.Item href="#/action-2">San Francisco</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Redmond</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>




      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to SWENG Group 15 Dashboard
        </h1>

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
