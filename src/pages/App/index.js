import { useState, useEffect } from "react";
import { Layout } from "antd";
import "./style.less";

import { userStore } from "@/store";
import { checkUser } from "@/services/user";

import Login from "@/pages/Login";

import LoadingScreen from "@/components/LoadingScreen";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Content from "@/components/Content";


//Tes contributor commit
const App = () => {
  const [user, setUser] = userStore.use();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setUser({ ...user, isAuthenticated: true, isLogin: false });
      return;
    }

    const authenticate = async () => {
      try {
        const result = await checkUser();
        console.log(result);
        await setUser({
          ...user,
          ...result?.data,
          isAuthenticated: true,
          isLogin: true,
          refetch: authenticate,
        });
      } catch (error) {
        console.log(error);
        await setUser({
          ...user,
          isAuthenticated: true,
          isLogin: false,
          refetch: authenticate,
          error,
        });
      }
    };

    authenticate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (user.isAuthenticated && !user.isLogin) return <Login />;

  return user?.isAuthenticated ? (
    <Layout className="container">
      <Sidebar
        isAdmin={user?.isAdmin}
        onBreakpoint={(broken) => setCollapsed(broken)}
        collapsed={collapsed}
      />
      <Layout className="site-layout">
        <Header collapsed={collapsed} toggleCollapse={toggle} />
        <Content isAdmin={user?.isAdmin} />
      </Layout>
    </Layout>
  ) : (
    <div style={{ height: "100vh", width: "100vw" }}>
      <LoadingScreen />
    </div>
  );
};

export default App;
