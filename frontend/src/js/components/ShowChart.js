import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { COLOR } from "../../styles/Color";

const Container = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 1em 1em;
  background: white;
  font-family: system-ui;
  padding: 2em 2em;
`;

const ShowChart = data => {
  const example_data = {
    labels: [
      "12PM",
      "1AM",
      "2AM",
      "3AM",
      "4AM",
      "5AM",
      "6AM",
      "7AM",
      "8AM",
      "9AM",
      "10AM",
      "11AM",
      "12AM",
      "1PM",
      "2PM",
      "3PM",
      "4PM",
      "5PM",
      "6PM",
      "7PM",
      "8PM",
      "9PM",
      "10PM",
      "11PM",
      "12AM"
    ],
    datasets: [
      {
        label: "PM2.5 Prediction",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.data
      },
      {
        label: "Standard",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50,
          50
        ]
      }
    ]
  };
  return (
    <div>
      <Container>
        <Line data={example_data} />
      </Container>
    </div>
  );
};

export default ShowChart;
