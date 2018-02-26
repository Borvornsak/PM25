import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { ShowInfo, ShowChart } from "../components";

const { Content } = Layout;

class TodayPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Content style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "auto",
            margin: "50px 0"
          }}
        >
          Today
        </div> */}
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ width: "100vw" }}
        >
          <Col span={6}>
            <ShowInfo />
          </Col>
          <Col span={14}>
            <ShowChart />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default TodayPage;
