import "./style.css";
import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface TabProps {
  text: string;
  path: string;
}

const Tab: FC<TabProps> = ({ text, path }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const slug = pathname.split("/")[2];

  return (
    <button
      className={`button-ghost dashboard-tab ${
        path === slug ? "dashboard-tab-active" : ""
      }`}
      onClick={() => navigate(path)}
    >
      {text}
    </button>
  );
};

const TABS: TabProps[] = [
  { text: "Workers", path: "workers" },
  { text: "Earnings", path: "earnings" },
];

const Dashboard: FC = () => {
  useEffect(() => {
    document.title = "Dashboard | Plutus Front";
  }, []);

  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-tabs">
        {TABS.map((tab, index) => (
          <Tab key={index} {...tab} />
        ))}
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
