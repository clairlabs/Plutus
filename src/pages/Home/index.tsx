import "./style.css";
import { FC, useEffect, useState } from "react";

const DIRECT_URLS = [
  "https://www.highcpmrevenuegate.com/z47f97hyy?key=708d644e71967e771463e71590d548cf",
  "https://www.highcpmrevenuegate.com/wzsnah8h?key=ed104250e30a952bb1be913ccd16d888",
  "https://ookroush.com/4/6424063",
  "https://dubzenom.com/4/6424064",
];
const FALLBACK_URLS = ["https://caishencaishen.blogspot.com/p/worker10.html"];

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

    if (data) {
      const targetUrl = getRandomItem(data.proxy ? FALLBACK_URLS : DIRECT_URLS);

      window.location.href = targetUrl;
    } else {
      getData(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [data]);

  return (
    <main className="home-container">
      <h3>Redirecting...</h3>
      {data && !data?.proxy ? (
        <div className="home-advertising">
          <iframe
            className="home-advertising-banner"
            srcDoc={`<script type="text/javascript">
	atOptions = {
		'key' : 'bcb62fd856cce64431e3cbd5b97e2115',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
	document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablecreativeformat.com/bcb62fd856cce64431e3cbd5b97e2115/invoke.js"></scr' + 'ipt>');
</script>`}
          ></iframe>
          <p className="text-xs">Advertising</p>
        </div>
      ) : null}
    </main>
  );
};

export default Home;
