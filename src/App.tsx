import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import Home from "./pages/Home";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

ReactGA.initialize(GA_MEASUREMENT_ID);

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
          <Route path="/" element={<Home />} >
            <Route path=":id" element={<Home />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
