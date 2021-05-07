import { Layout, Menu, Button } from "antd";
import { Link } from "umi";
const { Header } = Layout;
export default function Homepageheader() {
  return (
    <Header className="header">
      <Menu
        theme="dark"
        className="menu"
        mode="horizontal"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item style={{ backgroundColor: "white" }}>
          <Button className="menu-item" type="text">
            <Link to="/">蓝图首页</Link>
          </Button>
        </Menu.Item>
        <Menu.Item style={{ backgroundColor: "white" }}>
          <Button className="menu-item" type="text">
            <Link to="/tech-fes">社区</Link>
          </Button>
        </Menu.Item>
        <Menu.Item style={{ backgroundColor: "white" }}>
          <Button className="menu-item" type="text">
            <Link to="/tech-fes">功能模块</Link>
          </Button>
        </Menu.Item>
        <Menu.Item style={{ backgroundColor: "white" }}>
          <Button className="menu-item" type="text">
            <Link to="/about-us">关于我们</Link>
          </Button>
        </Menu.Item>
      </Menu>
      <Button className="logins">
        <Link to="/login">注册/登录</Link>
      </Button>
    </Header>
  )
}
