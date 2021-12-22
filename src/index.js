import React from "react";
import ReactDOM from "react-dom";  

import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWrapper } from './context/theme.context'



ReactDOM.render(
    <BrowserRouter>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </BrowserRouter>,
  document.getElementById("root")
);
