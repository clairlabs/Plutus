import "./style.css";
import { FC, useEffect } from "react";

const DIRECT_URLS = [
  "https://www.highcpmrevenuegate.com/z47f97hyy?key=708d644e71967e771463e71590d548cf",
  "https://www.highcpmrevenuegate.com/wzsnah8h?key=ed104250e30a952bb1be913ccd16d888",
  "https://ookroush.com/4/6424063",
  "https://dubzenom.com/4/6424064",
];
const FALLBACK_URLS = ["https://caishencaishen.blogspot.com/p/worker10.html"];

const Home: FC = () => {
  const getRandomItem = (array: string[]) => {
    const index = Math.floor(Math.random() * array.length);

    return array[index];
  };

  const getData = async (abortController: AbortController) => {
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

    window.location.href = targetUrl;
  };

  useEffect(() => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => getData(abortController), 5000);

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
