// import React from "react";
// import ReactDOM from "react-dom";
// import OrgChart from "../assets/js/orgchart";

// const App = () => {
//   return (
//     <div>
//       <div> App </div>
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("app"));

import Vue from "vue";
import stu from "../stu";
import $ from "../assets/js/jquery";
import _ from "lodash";

_.find(stu, item => item.name === "Lucy");

new Vue({
  render: h => h(<div>111</div>)
}).$mount("#app");
