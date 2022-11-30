import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Dashboard.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link'

export default function Home() {
  

  return (
    
    <div className={styles.dropbtn }>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Navigate to
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.testing}>
        <div className="testing1">        
          <Dropdown.Item href="Dublin">Dublin</Dropdown.Item>
        </div>
        <div className="testing2">        
          <Dropdown.Item href="Delhi">Delhi</Dropdown.Item>
        </div>
        <div className="testing3">        
          <Dropdown.Item href="Redmond">Redmond</Dropdown.Item>
        </div>
        <div className="testing4">        
          <Dropdown.Item href="/">Home</Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>


        <div className={styles.container}>
            <div className={styles.overimg1}>
        <form action="/action_page.php"  className={styles.form}>
            <div className={styles.inputcontainer}>
        <i className="fa fa-calendar icon"></i>
        <input
            className={styles.inputfield}
            type="date"
            placeholder="Password"
            name="pswrd"
        />
        </div>

        <button
          type="submit"
          className={styles.btn}
          //onClick="check(this.form)"
          value="Login"
        >
          Input
        </button>
        </form>

        
      </div>
      </div>
      </div>
  )
}