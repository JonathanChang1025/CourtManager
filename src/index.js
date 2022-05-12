import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker.js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Session,
  CheckIn,
  QRScan
} from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/session" element={<Session/>}/>
      <Route path="/checkin" element={<CheckIn/>}/>
      <Route path="/qrscan" element={<QRScan/>}/>
    </Routes>
  </Router>,
);

serviceWorker.unregister();