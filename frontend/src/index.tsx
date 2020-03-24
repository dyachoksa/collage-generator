import * as React from "react";
import * as ReactDOM from "react-dom";

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(<App />, document.getElementById("app"));
};

render();

if (process.env.NODE_ENV == "development" && module.hot) {
  module.hot.accept("./App", render);
}
