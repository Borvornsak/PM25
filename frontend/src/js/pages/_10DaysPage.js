import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { ShowEachDay } from "../components";
import prediction from "../../asset/prediction_values.json";

const { Content } = Layout;

const data = Object.values(prediction);

class _10DaysPage extends Component {
  calMean = (start, end) => {
    return data.slice(start, end).reduce((a, b) => a + b, 0) / 24;
  };

  render() {
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth();
    let d = now.getDate();
    return (
      <Content>
        <Row>
          <Col span={12}>
            {[...Array(5)].map((x, i) => (
              <Row>
                <ShowEachDay
                  key={i}
                  date={new Date(y, m, d + i)}
                  data={this.calMean(25 * i, 25 * (i + 1))}
                />
              </Row>
            ))}
          </Col>
          <Col span={12}>
            {[...Array(5)].map((x, i) => (
              <Row>
                <ShowEachDay
                  key={i + 5}
                  date={new Date(y, m, d + i + 5)}
                  data={this.calMean(25 * i, 25 * (i + 1))}
                />
              </Row>
            ))}
          </Col>
        </Row>
      </Content>
    );
  }
}

export default _10DaysPage;
