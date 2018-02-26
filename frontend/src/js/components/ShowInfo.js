import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import { COLOR } from "../../styles/Color";

const Container = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 1em 1em;
  background: white;
  font-family: system-ui;
`;

const Information = styled.div`
  padding: 0.75em 1em;
  font-size: 1.5rem;
`;

const Quantity = styled.div`
  font-size: 2rem;
  text-align: right;
  margin: 0.75em 0 0 0;
`;

const StateShow = styled.div`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0.5em 1em;
  background: ${props => (props.ratio <= 0.5 ? COLOR.valid : COLOR.cherry)};
  color: white;
  font-size: 1.5rem;
  text-align: center;
`;

const ShowInfo = ({ pm25 = 0 }) => {
  const now = new Date();
  const ratio = pm25 / 50;
  return (
    <div>
      {/* <Card bordered={false}>
        <b>{now.toDateString()}</b>
        <p>{pm25}</p>
        <p>Card content</p>
      </Card> */}
      <Container>
        <Information>
          <b>{now.toDateString()}</b>
          <p>{now.toTimeString()}</p>
          <h2>
            PM2.5<p style={{ fontSize: "1rem" }}>(Moving AVG 24 Hour)</p>
          </h2>
          <Quantity>
            <p>{pm25} (ug/m3)</p>
          </Quantity>
        </Information>
        <StateShow ratio={pm25}>
          state : {pm25 <= 0.5 ? "Healthy" : "Unhealthy"}
        </StateShow>
      </Container>
    </div>
  );
};

export default ShowInfo;
