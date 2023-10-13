import "./style.css";
import { FC, Children, ReactNode } from "react";

interface SectionProps {
  title?: string;
  children?: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="section-container">
      {title ? (
        <div className="section-header">
          <h3>{title}</h3>
        </div>
      ) : null}
      <div className="section-content">{children}</div>
    </section>
  );
};

export default Section;
