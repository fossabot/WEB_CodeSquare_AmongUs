import React from "react";
import ReactDOM from "react-dom";
import "@csstools/normalize.css";
import GlobalStyles from "./GlobalStyles";
import rootReducer from "./modules";
import App from "./App";
import { Global } from "@emotion/core";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={GlobalStyles} />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
