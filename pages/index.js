import Head from "next/head";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWdkHEDuvS61eQiARvqA4cPqs-oDfTIfe1w&usqp=CAU"
        />
      </Head>

      <Header />
      <NavBar />
      <Results results={results} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests?.fetchTrending?.url
    }`
  ).then((response) => response.json());

  return {
    props: {
      results: request?.results,
    },
  };
};
