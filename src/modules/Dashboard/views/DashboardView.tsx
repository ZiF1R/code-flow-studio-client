import React, {FC} from 'react';
import Header from "modules/Dashboard/components/Header/Header";
import Sidebar from "modules/Dashboard/components/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import "../assets/dashboard.scss"

const DashboardView: FC = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardView;
