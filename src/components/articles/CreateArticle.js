import React, { useRef, useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation } from "react-query";
import { Editor } from "@tinymce/tinymce-react";

import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { createArticle } from "../../axios/article";

function CreateArticle() {
  const navigate = useNavigate();
  const editorRef = useRef("");

  const [article, setArticle] = useState({
    name: "",
    description: "",
    image: "",
    video: "",
  });

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (data) => {
      return createArticle(data);
    }
  );

  // handle article
  const handleArticle = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setArticle({ ...article, [name]: value });
  };
  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      const img = e.target.files[0];
      setArticle({ ...article, image: img });
    }
  };
  const handleVideo = (e) => {
    if (e.target.files.length !== 0) {
      const video = e.target.files[0];
      setArticle({ ...article, video: video });
    }
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const { name, image, video, description } = article;

    // !name || !editorRef.current.getContent()
    try {
      if (!name || !description) {
        errorMessage("All fields required!");
      } else {
        // do
        mutate({
          title: name,
          description: description,
          image: image,
          video: video,
        });
      }
    } catch (error) {
      errorMessage(error.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }
  if (isSuccess) {
    successMessage("Create Article successfully");
    navigate("/article");
  }

  return (
    <WrapperContent title="Create Article">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/article")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button onClick={() => handleSubmitBranch()} disabled={isLoading}>
                {isLoading ? <BtnSpinner /> : "Create Article"}
              </Button>
            </div>
          </div>
        </div>

        <div class="basic-form">
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div class="form-group">
                  <label class="m-b-15 ">Title *</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="name"
                    value={article.name}
                    onChange={(e) => handleArticle(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div class="form-group">
                  <label class="m-b-15 ">Description *</label>

                  <textarea
                    id=""
                    cols="30"
                    rows="20"
                    class="form-control input-default "
                    name="description"
                    value={article.description}
                    style={{ height: "20vh" }}
                    onChange={(e) => handleArticle(e)}
                  ></textarea>
                  {/*<Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image | help",
                      content_style: "body { font-size:18px }",
                    }}
                    apiKey={process.env.REACT_APP_TINY_API}
                  /> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Image * (900 ❌ 400)</label>
                  <input
                    type="file"
                    accept="image/*"
                    class="form-control input-default "
                    name="image"
                    onInput={(e) => handleImage(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    class="form-control input-default "
                    name="video"
                    onInput={(e) => handleVideo(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapperContent>
  );
}

export default CreateArticle;
