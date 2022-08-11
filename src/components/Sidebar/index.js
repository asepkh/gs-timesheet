import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

import RoutesConfig from "@/configs/routes";
import Icon from "@/helpers/Icon";

const { Sider } = Layout,
  { SubMenu } = Menu;

const Sidebar = ({ isAdmin, ...props }) => {
  const location = useLocation(),
    width = useWindowWidth();
  return (
    <Sider
      breakpoint="lg"
      trigger={null}
      collapsible
      width={width <= 1024 ? "0" : "250"}
      style={{ display: width <= 1024 ? (!props?.collapsed ? "none" : "block") : "block" }}
      {...props}
    >
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
