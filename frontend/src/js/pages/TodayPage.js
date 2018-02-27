import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { ShowInfo, ShowChart } from "../components";
import prediction from "../../asset/prediction_values.json";

const { Content } = Layout;

const data = Object.values(prediction);

class TodayPage extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date()
    };
  }
  setTime = () => {
    this.setState({ time: new Date() });
  };

  componentWillMount = () => {
    this.setTime();
  };
  componentDidMount = () => {
    window.setInterval(
      function() {
        this.setTime();
      }.bind(this),
      1000
    );
  };
  render() {
    const hour = this.state.time.getHours();
    return (
      <Content style={{ display: "flex", justifyContent: "space-around" }}>
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ width: "100vw" }}
        >
          <Col span={6}>
            <ShowInfo pm25={data[hour]} />
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
