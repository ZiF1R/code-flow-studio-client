import React, {FC} from 'react';
import Header from "modules/Dashboard/components/Header/Header";
import Sidebar from "modules/Dashboard/components/Sidebar";
import Dashboard from "modules/Dashboard/components/Dashboard";
import "./dashboard.scss"

const DashboardView: FC = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <main>
        <Sidebar />
        <Dashboard />
      </main>
    </div>
  );
}

export default DashboardView;
