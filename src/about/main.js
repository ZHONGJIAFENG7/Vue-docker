// import users from "../users";
import stu from "../stu";
import $ from "../assets/js/jquery";
import _ from "lodash";
import Vue from "vue";
// import React from "react";

_.find(stu, item => item.name === "Lucy");

new Vue({
  render: h => h(<div>111</div>)
}).$mount("#app");

// import React from "react";
// import ReactDOM from "react-dom";
// import $ from "../assets/js/jquery";
// const App = () => {
//   return (
//     <div>
//       <div> entry2 </div>
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("app"));
