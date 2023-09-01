import React from "react";
import { Route, Routes } from "react-router-dom";
import Exercise from "./Exercise";
import CreateExercise from "./CreateExercise";
import ViewExercise from "./ViewExercise";
import EditExercise from "./EditExercise";

function IndexExercise() {
  return (
    <Routes>
      <Route path="/" element={<Exercise />} />
      <Route path="/createExercise" element={<CreateExercise />} />
      <Route path="/edit/:id" element={<EditExercise />} />
      <Route path="/view/:id" element={<ViewExercise />} />
    </Routes>
  );
}

export default IndexExercise;
