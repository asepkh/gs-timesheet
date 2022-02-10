import { useState, createElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarFilled,
  HomeFilled,
} from "@ant-design/icons";
import "./style.css";

import Home from "@/pages/Home";
import Timesheet from "@/pages/Timesheet";

const { Header, Sider, Content } = Layout;

const isLogin = true;

function App({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return isLogin ? (
    <Layout className="container">
      <Sider trigger={null} collapsible collapsed={collapsed} width="250">
        <div className="logo">{!collapsed ? `GUDANG SOLUSI GROUP` : `GSG`}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeFilled />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarFilled />}>
            Timesheet
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: toggle,
          })}
          <div className="header-right">
            <div className="user-info">ASEP KHAIRUL ANAM</div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}

export default App;
