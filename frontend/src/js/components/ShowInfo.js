import React from "react";
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
  background: ${props => (props.ratio <= 50 ? COLOR.valid : COLOR.cherry)};
  color: white;
  font-size: 1.5rem;
  text-align: center;
`;

const ShowInfo = ({ pm25 = 0, showTime = true }) => {
  const now = new Date();
  const precisionRound = (number, precision) => {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };

  return (
    <div>
      <Container>
        <Information>
          <b>{now.toDateString()}</b>
          {showTime && <p>{now.toTimeString()}</p>}
          <h2>
            PM2.5<p style={{ fontSize: "1rem" }}>(Moving AVG 24 Hour)</p>
          </h2>
          <Quantity>
            <p>{precisionRound(pm25, 2)} (ug/m3)</p>
          </Quantity>
        </Information>
        <StateShow ratio={pm25}>
          state : {pm25 <= 50 ? "Healthy" : "Unhealthy"}
        </StateShow>
      </Container>
    </div>
  );
};

export default ShowInfo;
