
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {

  
  return (

    <main className={styles.main}>

      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Typography variant="h2" fontWeight={800} gutterBottom>
           Welcome to SWENG Group 15 Dashboard
        </Typography>
        <Typography variant="h5" fontWeight={10} gutterBottom>
          Select a city in the menu above ⬆️
        </Typography>
      </Box>
    </main>
  )
}