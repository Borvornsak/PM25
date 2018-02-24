import React from "react";
import { Layout, Row, Col, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import logo from "../../asset/science.svg";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <Row>
        <Col xs={{ span: 8 }} md={{ span: 2 }}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{
              height: "48px",
              width: "auto",
              padding: "0px 20px 0px 20px"
            }}
          />
        </Col>
        <Col xs={{ span: 16 }} md={{ span: 6 }}>
          <h1 style={{ color: "white" }}>PM2.5 Tracker</h1>
        </Col>
        <Col
          xs={{ span: 0 }}
          md={{ span: 8, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px", display: "flex" }}
          >
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />Today
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/tomorrow">
                <Icon type="global" />Tomorrow
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/10days">
                <Icon type="compass" />10 days
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
