import { createElement } from "react";
import { Dropdown, Menu, Row, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { userStore } from "@/store";
import Icon from "@/helpers/Icon";

const { Header: AntdHeader } = Layout;
const Header = ({ collapsed, toggleCollapse, ...props }) => {
  const [user, setUser] = userStore.use();
  const onLogout = () => {
    setUser({ isAuthenticated: true, isLogin: false });
    localStorage.removeItem("token");
  };

  return (
    <AntdHeader className="site-layout-background" style={{ padding: 0 }} {...props}>
      <Row justify="space-between" className="row-header">
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: toggleCollapse,
        })}
        <div className="user-header-wrapper">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={onLogout}>Logout</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
            placement="bottomRight"
          >
            <Row className="user-header">
              <p>
                Hello,{" "}
                <b>
                  {user?.firstName} {user?.lastName}
                </b>
              </p>
              <Icon type="DownOutlined" />
            </Row>
          </Dropdown>
        </div>
      </Row>
    </AntdHeader>
  );
};

export default Header;
