import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateArticle from "./CreateArticle";
import Article from "./Article";
import EditArticle from "./EditArticle";
import ViewArticle from "./ViewArticle";

function IndexArticles() {
  return (
    <Routes>
      <Route path="/" element={<Article />} />
      <Route path="/createArticle" element={<CreateArticle />} />
      <Route path="/edit/:id" element={<EditArticle />} />
      <Route path="/view/:id" element={<ViewArticle />} />
    </Routes>
  );
}

export default IndexArticles;
