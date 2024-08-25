import React from "react";
import DashboardHeader from "./DashboardHeader";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const DashboardLayoutStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard-main {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    padding: 40px 20px;
    gap: 0 40px;
  }
`;

const DashboardLayout = ({ children }) => {
  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>

      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-main-chil">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardLayoutStyles>
  );
};

export default DashboardLayout;
