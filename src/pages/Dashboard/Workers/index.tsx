import "./style.css";
import { FC, useEffect, useState } from "react";
import Section from "../../../components/Section";

interface WorkerProps {}

const Worker: FC<WorkerProps> = () => {
  return (
    <div className="workers-worker">
      <p>text</p>
    </div>
  );
};

const API_KEYS = [
    "",
    "",
    "",
    "",
]

const Workers: FC = () => {
  return (
    <div className="workers-container">
      <Section title="All Workers">
        <div className="grid grid-cols-4"></div>
      </Section>
    </div>
  );
};

export default Workers;
