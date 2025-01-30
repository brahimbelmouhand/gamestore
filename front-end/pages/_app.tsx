import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next';
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser")
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <>
      <Head>
        <meta name="description" content="This website is about making a difference in the gaming industry. We are about to develop and release 2 games. One is for our Roblox audience and the other for the somewhat realer gamers." />
        <link rel="icon" type="image/x-icon" href="/icon/favicon.ico" />
      </Head>
      <Header loggedInUser={loggedInUser} handleLogout={handleLogout}></Header>
      <Component {...pageProps} />
      <Footer loggedInUser={loggedInUser}></Footer>
    </>
  );
}

export default appWithTranslation(App);