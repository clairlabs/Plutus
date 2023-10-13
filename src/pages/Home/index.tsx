import "./style.css";
import { FC, useEffect, useState } from "react";

const BLACKLIST = [""];
const DIRECT_LINKS = [
  [
    "https://www.highcpmrevenuegate.com/z47f97hyy?key=708d644e71967e771463e71590d548cf",
    "https://www.highcpmrevenuegate.com/wzsnah8h?key=ed104250e30a952bb1be913ccd16d888",
  ],
  ["https://ookroush.com/4/6424063", "https://dubzenom.com/4/6424064"],
];
const FALLBACK_LINKS = ["https://caishencaishen.blogspot.com/p/worker10.html"];

const Home: FC = () => {
  const [data, setData] = useState<Record<string, any> | null>(null);

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
    const newData = JSON.parse((await response.json()).contents);
    setData(newData);
  };

  useEffect(() => {
    const abortController = new AbortController();
    let timeoutId: number;

    if (data) {
      timeoutId = setTimeout(() => {
        const isEligible = !(
          BLACKLIST.includes(data.countryCode.toLowerCase()) || data.proxy
        );
        const nonce = new Date().getMinutes() % 2;
        const popupUrl = getRandomItem(DIRECT_LINKS[nonce]);
        const redirectUrl = getRandomItem(DIRECT_LINKS[nonce]);
        const fallbackUrl = getRandomItem(FALLBACK_LINKS);

        window.open(isEligible ? popupUrl : fallbackUrl, "_blank");
        window.location.href = isEligible ? redirectUrl : fallbackUrl;
      }, 10000);
    } else {
      getData(abortController);
    }

    return () => {
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <main className="home-container">
      <h3>Redirecting...</h3>
    </main>
  );
};

export default Home;
