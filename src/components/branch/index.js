import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBranch from "./CreateBranch";
import Branch from "./Branch";
import EditBranch from "./EditBranch";
import ViewBranch from "./ViewBranch";

function IndexBranch() {
  return (
    <Routes>
      <Route path="/" element={<Branch />} />
      <Route path="/createBranch" element={<CreateBranch />} />
      <Route path="/edit/:id" element={<EditBranch />} />
      <Route path="/view/:id" element={<ViewBranch />} />
    </Routes>
  );
}

export default IndexBranch;
