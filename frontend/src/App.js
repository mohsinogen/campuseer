import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Css
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./screens/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContainer from "./screens/MainContainer";

const App = () => {
  
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <Navbar  />
            <MainContainer />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
