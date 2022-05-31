import * as $ from "jquery";
import React from "react";
import ReactDOM from "react-dom/client";
import Post from "@models/Post";
import json from "./assets/json";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import WebpackLogo from "./assets/webpack-logo.png";
import "./styles/styles.css";
import "./styles/styles.less";
import "./styles/styles.scss";

const App = () => (
  <div>
       <div className="container">
      <h2>Webpack course</h2>
      <hr />
      <div className="logo"></div>
      <hr />
      <pre></pre>
      <div className="less">
        <h3>Less</h3>
      </div>
      <div className="sass">
        <h3>Sass</h3>
      </div>
    </div>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);

// const post = new Post("1st post", WebpackLogo);
// $("pre").html(post.toString());
// console.log(post);
// console.log("json", json);
// console.log("xml", xml);
// console.log("csv", csv);
