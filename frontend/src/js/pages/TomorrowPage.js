import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { ShowInfo, ShowChart } from "../components";
import prediction from "../../asset/prediction_values.json";

const { Content } = Layout;

const data = Object.values(prediction);
const mean = data.slice(25, 50).reduce((a, b) => a + b, 0) / 24;

class TomorrowPage extends Component {
  render() {
    const hour = new Date().getHours();
    console.log(hour);
    return (
      <Content style={{ display: "flex", justifyContent: "space-around" }}>
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ width: "100vw" }}
        >
          <Col span={6}>
            <ShowInfo pm25={mean} showTime={false} />
          </Col>
          <Col span={14}>
            <ShowChart data={data.slice(25, 50)} />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default TomorrowPage;
