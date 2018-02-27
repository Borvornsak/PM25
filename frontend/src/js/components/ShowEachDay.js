import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { COLOR } from "../../styles/Color";

const Container = styled.div`
  height: 10vh;
  border-radius: 5px;
  margin: 1em 1em;
  background: white;
  font-family: system-ui;
  font-size: 1.5rem;
  background: ${props => (props.ratio <= 50 ? "white" : COLOR.cherry)};
`;

const ShowEachDay = ({ date = new Date(), data = 0 }) => {
  const precisionRound = (number, precision) => {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };
  console.log(date);
  return (
    <Container
      style={{ display: "flex", justifyContent: "space-around" }}
      ratio={data}
    >
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        style={{ width: "100vw" }}
      >
        <Col span={8}>
          <b>
            {date.getDate() === new Date().getDate()
              ? "Today"
              : date.getDate() === new Date().getDate() + 1
                ? "Tomorrow"
                : date.toDateString()}
          </b>
        </Col>
        <Col span={2}>
          <b>{precisionRound(data, 2)}</b>
        </Col>
        <Col
          span={6}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <b>{data <= 50 ? "Healthy" : "Unhealthy"}</b>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowEachDay;
