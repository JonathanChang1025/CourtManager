import { NavLink } from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect';
import logo from "../../img/logo.png"

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
        <a className="navbar-brand" href="#">
          <BrowserView>
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
            &nbsp;&nbsp;
            Court Manager
          </BrowserView>
          <MobileView>
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
          </MobileView>
        </a>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/session">
                  Session
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/checkin">
                  Check-In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/qrscan">
                  QR Scan
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;