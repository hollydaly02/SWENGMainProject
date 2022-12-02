import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import styles from "../styles/Dashboard.module.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import BarChart from "../components/BarChart";

export default function LocationView({ location }: { location: string }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overimg1}>
          <form action="/action_page.php" className={styles.form}>
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
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <BarChart />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <BarChart />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const locations = ["Dublin", "Redmond", "SanFrancisco", "NewDelhi"];
  return {
    paths: locations.map((location) => ({ params: { location: location } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ location: string }> = ({
  params,
}) => {
  if (params && params.location && typeof params.location === "string") {
    return { props: { location: params.location } };
  }
  throw new Error("getStaticPropsFailed");
};
