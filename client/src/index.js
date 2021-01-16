import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios"
import store from "./store";
<<<<<<< HEAD
import "./index.css"
require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_CLIENT_URL
=======
import "./index.css";
import dotenv from "dotenv";
require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_CLIENT_URL || "http://localhost:3001" 
>>>>>>> cf79ba5a69094a264823d40e6d3fdcc8db344c79

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
