import React, { Component } from "react";
import { Layout } from "antd";
import { Header, Footer } from "../src/js/components";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="layout" style={{ height: "100vh" }}>
          <Header />
          {this.props.children}
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default App;
