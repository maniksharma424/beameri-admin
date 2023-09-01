import React from "react";
import { Route, Routes } from "react-router-dom";
import Avatar from "./Avatar";
import CreateAvatar from "./CreateAvatar";
import EditAvatar from "./EditAvatar";
import ViewAvatar from "./ViewAvatar";

function IndexAvatar() {
  return (
    <Routes>
      <Route path="/" element={<Avatar />} />
      <Route path="/create" element={<CreateAvatar />} />
      <Route path="/edit/:id" element={<EditAvatar />} />
      <Route path="/view/:id" element={<ViewAvatar />} />
    </Routes>
  );
}

export default IndexAvatar;
