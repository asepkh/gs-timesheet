import { useState, createElement, Suspense, lazy } from "react";
import { Navigate, Route, Routes, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./style.css";

import RoutesConfig from "@/configs/routes";
import Icon from "@/helpers/Icon";
import LoadingScreen from "@/components/LoadingScreen";

const { Header, Sider, Content } = Layout,
  { SubMenu } = Menu;

const isLogin = true,
  isAdmin = false;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);
  const location = useLocation();

  return isLogin ? (
    <Layout className="container">
      <Sider
        breakpoint="md"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="250"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <div className="logo">{!collapsed ? `GUDANG SOLUSI GROUP` : `GSG`}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location?.pathname]}
        >
          {RoutesConfig.map((route) => {
            if (route?.admin && !isAdmin) return <></>;
            if (route?.submenu) {
              return (
                <SubMenu
                  key={route?.title}
                  icon={<Icon type={route?.icon} />}
                  title={route?.title}
                >
                  {route?.submenu.map((submenu) => (
                    <Menu.Item
                      key={submenu?.path}
                      icon={<Icon type={submenu?.icon} />}
                    >
                      <Link to={submenu?.path}>{submenu?.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={route?.path} icon={<Icon type={route?.icon} />}>
                  <Link to={route?.path}>{route?.title}</Link>
                </Menu.Item>
              );
            }
          })}
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
              if (!route?.submenu) {
                const Component = lazy(() =>
                  import(`@/pages/${route?.component}`)
                );
                return (
                  <Route
                    key={index}
                    path={route?.path}
                    index={route?.index || false}
                    element={
                      !route?.admin ? (
                        <Suspense fallback={<LoadingScreen />}>
                          <Component />
                        </Suspense>
                      ) : isAdmin ? (
                        <Suspense fallback={<LoadingScreen />}>
                          <Component />
                        </Suspense>
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                );
              } else {
                return route.submenu.map((submenu, index) => {
                  const Component = lazy(() =>
                    import(`@/pages/${submenu?.component}`)
                  );
                  return (
                    <Route
                      key={index}
                      path={submenu?.path}
                      index={submenu?.index || false}
                      element={
                        !route?.admin && !route?.submenu?.admin ? (
                          <Suspense fallback={<LoadingScreen />}>
                            <Component />
                          </Suspense>
                        ) : isAdmin ? (
                          <Suspense fallback={<LoadingScreen />}>
                            <Component />
                          </Suspense>
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                  );
                });
              }
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
