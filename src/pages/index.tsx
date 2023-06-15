import Head from "next/head";
import {useRouter} from "next/router";
import { useState } from "react";
import { GetServerSideProps } from "next";

interface HomeProps {
  serverTime: Date;
}

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (serverTime: Date, clientTime: Date): string => {
  //Get the timestamps for each date
  const timestampServer = serverTime.getTime();
  const timestampClient = clientTime.getTime();

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(timestampClient - timestampServer);

  // Calculate the individual time components
  const secondsDiff = Math.floor(timeDiff / 1000) % 60;
  const minutesDiff = Math.floor(timeDiff / (1000 * 60)) % 60;
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Return the time difference string
  return `${daysDiff} days, ${hoursDiff} hours, ${minutesDiff} minutes, ${secondsDiff} seconds`;
};

export default function Home({serverTime}: HomeProps) {
  const router = useRouter();
  const [clientTime, setClientTime] = useState(new Date());
  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  //Parse the server time
  const parsedServerTime = new Date(serverTime);

  //Format the parsed server time
  const formattedServerTime = parsedServerTime.toLocaleString('fr-FR', {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(',', '').replace(/\//ig, "-");
  const timeDifference = calculateTimeDifference(parsedServerTime, clientTime);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{formattedServerTime}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const serverTime = new Date().toISOString(); // Convert Date to string representation

  return {
    props: {
      serverTime,
    },
  };
}