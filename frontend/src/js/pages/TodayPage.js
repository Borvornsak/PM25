import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { ShowInfo, ShowChart } from "../components";
import prediction from "../../asset/prediction_values.json";

const { Content } = Layout;

const data = Object.values(prediction);

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
            <ShowChart data={data.slice(0, 25)} />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default TodayPage;
