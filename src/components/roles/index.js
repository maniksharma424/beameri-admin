import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRole from "./userRole/User";
import UserPermission from "./userRole/Permission";

function IndexUsers() {
  return (
    <Routes>
      <Route path="/" element={<UserRole />} />
      <Route path="/permission/:id" element={<UserPermission />} />
    </Routes>
  );
}

export default IndexUsers;
