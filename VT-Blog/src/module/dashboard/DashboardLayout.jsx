import React from "react";
import DashboardHeader from "./DashboardHeader";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import PostManage from "../post/PostManage";
import PostAddNew from "../post/PostAddNew";
import { useAuth } from "../../context/authContext";
import NotFoundPage from "../../pages/NotFoundPage";
const DashboardLayoutStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard-main {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    padding: 40px 20px;
    gap: 0 40px;
  }
  .dashboard-heading {
    font-weight: bold;
    font-size: 36px;
    color: ${(props) => props.theme.primary};
    letter-spacing: 1px;
    margin-bottom: 40px;
  }
`;

const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  // console.log("🚀 ~ DashboardLayout ~ userInfo:", userInfo);
  if (!userInfo) return <NotFoundPage></NotFoundPage>;

  return (
    <DashboardLayoutStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardLayoutStyles>
  );
};

export default DashboardLayout;
