import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./User";
import CreateUser from "./CreaterUser";

// <Route path="/create-user" element={<CreateUser />} />
function IndexUser() {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
    </Routes>
  );
}

export default IndexUser;
