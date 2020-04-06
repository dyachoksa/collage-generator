import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "~/store";

import "~/index.css";

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
};

render();

if (process.env.NODE_ENV == "development" && module.hot) {
  module.hot.accept("./App", render);
}
