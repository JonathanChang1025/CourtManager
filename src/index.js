import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Court,
  CheckIn,
  QRScan
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/court" element={<Court />} />
      <Route path="/checkin" element={<CheckIn />} />
      <Route path="/qrscan" element={<QRScan />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();