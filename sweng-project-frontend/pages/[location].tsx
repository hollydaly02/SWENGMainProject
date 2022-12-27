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
import BarChart2 from "../components/BarChart2";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import Typography from "@mui/material/Typography";

export default function LocationView({ location }: { location: string }) {
  return (
    <div>
    <Box sx={{ width: '100%' }}>
      <Grid item xs={10}>
        <Item sx={{ borderRadius: 0 }}>
          <form action="/action_page.php">
            <div className={styles.inputcontainer}>
              <i className="fa fa-calendar icon"></i>
              <input
                className={styles.inputfield}
                type="date"
                placeholder="Password"
                name="pswrd"
              />
              <button
              type="submit"
              className={styles.btn}
              //onClick="check(this.form)"
              value="Login"
            >
              Input
            </button>
            </div>

          </form>
        </Item>
      </Grid>
    </Box>
    <main className={styles.main}>
      
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <Typography variant="h5" fontWeight={500} paddingTop={2} gutterBottom>
              Commits
            </Typography>
            <BarChart />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography variant="h5" fontWeight={500} paddingTop={2} gutterBottom>
              Temperature
            </Typography>
            <BarChart2 />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <LineChart />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <PieChart />
          </Item>
        </Grid>
      </Grid>
    </Box>
    </main>
    </div>
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
