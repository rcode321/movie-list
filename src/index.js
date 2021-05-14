import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(
   <BrowserRouter>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </BrowserRouter>,
   document.getElementById("root")
);
