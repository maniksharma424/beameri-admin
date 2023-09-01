import React from "react";
import { Link } from "react-router-dom";
import { signout } from "../utils/auth";
function Header() {
  return (
    <>
      <div className="header fixed-top ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 pb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="leftSide">
                  <div className="hamburger sidebar-toggle">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                  </div>
                </div>

                <div className="rightSide ">
                  <div className="dropdown">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      <i className="ti-user"></i>
                      <span className="caret"></span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      style={{
                        height: "15vh",
                        lineHeight: "1.6em",
                      }}
                    >
                      <li>
                        <Link to="#">Profile</Link>
                      </li>
                      <li>
                        <Link to="/changePassword">Change password</Link>
                      </li>
                      <a href="#" onClick={() => signout()}>
                        <li>Logout</li>
                      </a>
                      <li className="divider"></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
