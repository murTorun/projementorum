import Head from "next/head";
import Nav from "./(sections)/Nav";
import { SessionProvider } from "next-auth/react";
import Footer from "./(sections)/Footer";
import MainContent from "./(sections)/MainContent";
export default function Home({ pageProps }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-gray-800 to-gray-900">
      <Head>
        <title>Projementorum - Proje Yaparken Yalnız Değilsin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <MainContent />
      <Footer />
    </div>
  );
}
