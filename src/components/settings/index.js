import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutCompany from "./company/AboutCompany";
import ApplicationName from "./company/ApplicationName";
import CompanyAddress from "./company/CompanyAddress";
import SocialMedia from "./company/SocialMedia";
import Logo from "./company/Logo";

function IndexSettings() {
  return (
    <Routes>
      <Route path="/about-company" element={<AboutCompany />} />
      <Route path="/application-name" element={<ApplicationName />} />
      <Route path="/company-address" element={<CompanyAddress />} />
      <Route path="/social-media" element={<SocialMedia />} />
      <Route path="/logo" element={<Logo />} />
    </Routes>
  );
}

export default IndexSettings;
