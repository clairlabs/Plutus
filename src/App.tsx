import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

ReactGA.initialize(GA_MEASUREMENT_ID);

import Home from "./pages/Home";

const App = () => {
  useEffect(() => {
    const path = window.location.pathname.split("/");
    ReactGA.send({
      hitType: "pageview",
      page: path[path.length - 1],
      title: path[path.length - 1],
    });
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
