import { useState, createElement, Suspense, lazy } from "react";
import { Navigate, Route, Routes, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./style.css";

import RoutesConfig from "@/configs/routes";
import Icon from "@/helpers/Icon";
import LoadingScreen from "@/components/LoadingScreen";

const { Header, Sider, Content } = Layout;

const isLogin = true;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  const location = useLocation();

  return isLogin ? (
    <Layout className="container">
      <Sider trigger={null} collapsible collapsed={collapsed} width="250">
        <div className="logo">{!collapsed ? `GUDANG SOLUSI GROUP` : `GSG`}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location?.pathname]}
        >
          {RoutesConfig.map((route) => (
            <Menu.Item key={route?.path} icon={<Icon type={route?.icon} />}>
              <Link to={route?.path}>{route?.title}</Link>
            </Menu.Item>
          ))}
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
          <Routes>
            {RoutesConfig.map((route, index) => {
              const Component = lazy(() =>
                import(`@/pages/${route?.component}`)
              );
              return (
                <Route
                  key={index}
                  path={route?.path}
                  index={route?.index || false}
                  element={
                    <Suspense fallback={<LoadingScreen />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
