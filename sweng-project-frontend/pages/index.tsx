
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link'

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
        Navigate 
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.testing}>
        <div className="testing1">        
          <Dropdown.Item href="Dublin">Dublin</Dropdown.Item>
        </div>
        <div className="testing2">        
          <Dropdown.Item href="SanFrancisco">San Francisco</Dropdown.Item>
        </div>
        <div className="testing3">        
          <Dropdown.Item href="Delhi">Delhi</Dropdown.Item>
        </div>
        <div className="testing3">        
          <Dropdown.Item href="Redmond">Redmond</Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
    </div>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to SWENG Group 15 Dashboard
         </h1>
         
        

        

        
      </main>

      
    </div>
  )
}
