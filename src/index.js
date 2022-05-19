import Post from "./Post";
import json from "./assets/json";
import WebpackLogo from "./assets/webpack-logo.png";
import "./styles/styles.css";

const post = new Post("1st post", WebpackLogo);
console.log(post);
console.log("json", json);
