import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../utils/auth";
import { getCompany } from "../axios/setting/settingApi";
import { useQuery } from "react-query";
import { errorMessage } from "../utils/Toast";

function SideHeader() {
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const { isError, error, data } = useQuery("settings", getCompany);

  if (isError) {
    errorMessage(error?.message);
  }
  //"/images/logo.png"
  return (
    <>
      <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures1">
        <div className="nano">
          <div className="nano-content">
            <ul>
              <div className="logo">
                <Link
                  to="/branch"
                  className="logo-with-text d-flex justify-content-between align-items-center mx-3"
                >
                  <div style={{ width: "40px" }}>
                    <img
                      src={
                        data?.data?.result[0]?.logo?.Headerlogo ||
                        "/images/logo.png"
                      }
                      className="img-size img-fluid"
                      alt="logo"
                    />
                  </div>
                  <span>{data?.data?.result[0]?.applicationName || "GYM"}</span>
                </Link>
              </div>

              <li className="label">Apps</li>
              <li>
                <NavLink to="/dashboard" className="sidebar-sub-toggle">
                  <i className="ti-layout-grid2-alt"></i> Dashboard{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/branch" className="sidebar-sub-toggle">
                  <i className="ti-bar-chart-alt"></i> Branch{" "}
                </NavLink>
              </li>

              <li>
                <NavLink to="/exercise" className="sidebar-sub-toggle">
                  <i className="ti-layout-media-right"></i> Exercise{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/article" className="sidebar-sub-toggle">
                  <i className="ti-file"></i> Article{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/member" className="sidebar-sub-toggle">
                  <i className="ti-layout-list-thumb"></i> Member{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/avatar" className="sidebar-sub-toggle">
                  <i className="ti-flickr-alt"></i> Avatar{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/voice-clone" className="sidebar-sub-toggle">
                  <i className="ti-volume"></i> Voice Clone{" "}
                </NavLink>
              </li>

              <li>
                <a
                  href="#/setting"
                  className="sidebar-sub-toggle"
                  onClick={() => setOpenUser(!openUser)}
                >
                  <i className="ti-face-smile"></i> Role & Permission{" "}
                  <span
                    className={`sidebar-collapse-icon ti-angle-${
                      openUser ? "down" : "up"
                    }`}
                  ></span>
                </a>
                {openUser && (
                  <ul>
                    <li>
                      <NavLink to="/roles">
                        <i className="ti-layers-alt"></i>
                        Users
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/user" className="sidebar-sub-toggle">
                        <i className="ti-user"></i>Add User{" "}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a
                  href="#/setting"
                  className="sidebar-sub-toggle"
                  onClick={() => setOpen(!open)}
                >
                  <i className="ti-settings"></i> Settings{" "}
                  <span
                    className={`sidebar-collapse-icon ti-angle-${
                      open ? "down" : "up"
                    }`}
                  ></span>
                </a>
                {open && (
                  <ul>
                    <li>
                      <NavLink to="/settings/about-company">
                        About company
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/settings/company-address">
                        Company address
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/settings/social-media">
                        Social media
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/settings/logo">Logos</NavLink>
                    </li>
                    <li>
                      <NavLink to="/settings/application-name">
                        Application name
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/*<li>
                <NavLink to="app-event-calender.html">
                  <i className="ti-calendar"></i> Calender{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="app-email.html">
                  <i className="ti-email"></i> Email
                </NavLink>
              </li>
              <li>
                <NavLink to="app-profile.html">
                  <i className="ti-user"></i> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="app-widget-card.html">
                  <i className="ti-layout-grid2-alt"></i> Widget
                </NavLink>
              </li> */}
              {/* <li className="label">Extra</li>
              <li>
                <NavLink to="/invoice" className="sidebar-sub-toggle">
                  <i className="ti-files"></i> Invoice{" "}
                  <span className="sidebar-collapse-icon ti-angle-down"></span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/page" className="sidebar-sub-toggle">
                  <i className="ti-target"></i> Pages{" "}
                  <span className="sidebar-collapse-icon ti-angle-down"></span>
                </NavLink>
              </li>
              <li>
                <NavLink to="../documentation/index.html">
                  <i className="ti-file"></i> Documentation
                </NavLink>
              </li> */}

              <li
                style={{
                  // position: "absolute",
                  // bottom: 0,
                  marginTop: "2em",
                  // width: "100%",
                }}
              >
                <a href="#1" onClick={() => signout()}>
                  <i className="ti-close"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideHeader;
