// import "@babel/polyfill";
// import "core-js";
// import "regenerator-runtime/runtime";
import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import styles from '../assets/css/index.module.css';
// import { className } from "../assets/css/index.css";
// import users from "../users";
// import stu from "../stu";
import $ from "../assets/js/jquery";
// import c from "lodash";
import App from "./App";
import style from "../assets/css/color.css";
import { className } from "../assets/css/index.module.css";
console.log(className);

var a = require("./name.js");
console.log("aaaa", a);

console.log(style);

const b = () =>
  import(/* webpackChunkName: "common-async" */ "../common-async").then(
    (comp) => {
      Page1 = comp;
    }
  );
import { Input, Select } from "element-ui";
// // console.log("vue", Vue);
// // console.log(Input);
// // console.log(Select);
// Vue.component("el-input", Input);
// Vue.component("el-select", Select);
Vue.use(Input);
Vue.use(Select);
// Vue.use(ElementUI);

// console.log(_);
// console.log("lodash", c);
// console.log("lodash", require("lodash"));
import _ from "lodash";
const m = _.map([1, 2, 3], (item) => item);
console.log(_);
console.log(m);
const r = _.chain([1, 2, 3, 4])
  .map((item) => {
    return item + 1;
  })
  .value();
console.log(r);

import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";

import { cube } from "./util/math.js";

import $$ from "jquery";

console.log(cube(5));

// import the component
// import Treeselect from "@riophae/vue-treeselect";
// // import the styles
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

// Vue.component("tree-select", Treeselect);

import moment from "moment";
console.log(moment);
console.log(window.moment);
// import element from "element-ui";
// console.log(element);

import myPlugin from "./plugin";
Vue.use(myPlugin, {
  name: 2
});
console.log(Vue);
new Vue({
  render: (h) => h(App, null, { props: 222 })
}).$mount("#app");

console.log(process.env.NODE_ENV);
console.log(test);
console.log(test1);
console.log(test2);
console.log(test4);

// // // console.log(__dirname);
// // // console.log(__filename);
// // // console.log(process.cwd());

// // // console.log(process.env.NODE_ENV)

// // import React from "react";
// // import ReactDOM from "react-dom";
// // import styles from "../assets/css/index.module.css";

// // const App = () => {
// //   let Page1 = null;

// //   console.log(styles);

// //   // import (webpackChunkName: "page1"
// //   //   "../common-async").then(comp => {
// //   //   Page1 = comp;
// //   // });

// //   return (
// //     <div>
// //       <div className={styles.className1}> App </div>
// //     </div>
// //   );
// // };

// // ReactDOM.render(<App />, document.getElementById("app"));

// import { cube } from "./util/math.js";

// function component() {
//   var element = document.createElement("pre");

//   element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join(
//     "\n\n"
//   );

//   return element;
// }

// document.body.appendChild(component());
