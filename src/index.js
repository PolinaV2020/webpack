import * as $ from "jquery";
import Post from "@models/Post";
import json from "./assets/json";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import WebpackLogo from "./assets/webpack-logo.png";
import "./styles/styles.css";
import "./styles/styles.less";

const post = new Post("1st post", WebpackLogo);
$("pre").html(post.toString());
console.log(post);
console.log("json", json);
console.log("xml", xml);
console.log("csv", csv);
