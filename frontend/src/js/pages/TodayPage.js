import React, { Component } from "react";
import { Layout } from "antd";

const { Content } = Layout;

class TodayPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "auto",
            margin: "50px 0"
          }}
        >
          Today
        </div>
      </Content>
    );
  }
}

export default TodayPage;
