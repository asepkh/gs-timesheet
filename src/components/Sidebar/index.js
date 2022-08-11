import { Fragment } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import RoutesConfig from "@/configs/routes";
import Icon from "@/helpers/Icon";

const { Sider } = Layout,
  { SubMenu } = Menu;

const Sidebar = ({ isAdmin, ...props }) => {
  const location = useLocation();
  return (
    <Sider breakpoint="lg" trigger={null} collapsible width="250" {...props}>
      <div className="logo">{!props?.collapsed ? `GUDANG SOLUSI GROUP` : `GSG`}</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location?.pathname]}>
        {RoutesConfig.map((route) => {
          if (route?.noSidebar) return <></>;
          if (route?.admin && !isAdmin) return <></>;
          if (route?.submenu) {
            return (
              <SubMenu key={route?.title} icon={<Icon type={route?.icon} />} title={route?.title}>
                {route?.submenu.map((submenu) => (
                  <Menu.Item key={submenu?.path} icon={<Icon type={submenu?.icon} />}>
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
  );
};

export default Sidebar;
