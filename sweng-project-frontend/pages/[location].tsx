import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import styles from "../styles/Dashboard.module.css";

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
