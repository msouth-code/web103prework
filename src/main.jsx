// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  // <BrowserRouter>
    <App />
  // </BrowserRouter>,
);
