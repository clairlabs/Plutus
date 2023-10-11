import "./style.css";
import { FC, useEffect } from "react";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const DIRECT_URLS = [
  "https://www.highcpmrevenuegate.com/z47f97hyy?key=708d644e71967e771463e71590d548cf",
  "https://www.highcpmrevenuegate.com/wzsnah8h?key=ed104250e30a952bb1be913ccd16d888",
  "https://ookroush.com/4/6424063",
  "https://dubzenom.com/4/6424064",
];
const FALLBACK_URLS = ["https://caishencaishen.blogspot.com/p/worker10.html"];

ReactGA.initialize(GA_MEASUREMENT_ID);

const Home: FC = () => {
  const getRandomItem = (array: string[]) => {
    const index = Math.floor(Math.random() * array.length);

    return array[index];
  };

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      const ip = (
        await (await fetch("https://api.ipify.org/?format=json")).json()
      ).ip;
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `http://ip-api.com/json/${ip}?fields=245782`,
        )}`,
        { signal: abortController.signal },
      );
      const data = JSON.parse((await response.json()).contents);
      const targetUrl = getRandomItem(data.proxy ? FALLBACK_URLS : DIRECT_URLS);

      ReactGA.event({
        category: "Redirect",
        action: data.proxy ? "Fallback" : "Direct",
        label: targetUrl,
      });

      window.location.href = targetUrl;
    };

    const timeoutId = setTimeout(() => getData(), 10000);

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="home-container">
      <p>Redirecting...</p>
    </main>
  );
};

export default Home;
