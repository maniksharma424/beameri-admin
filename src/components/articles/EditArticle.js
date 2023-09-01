import React, { useEffect, useRef, useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation, useQuery } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import LoaderBox from "../../utils/LoaderBox";
import { Editor } from "@tinymce/tinymce-react";
import { editArticle, getArticleSingle } from "../../axios/article";

function EditArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef("");

  const [article, setArticle] = useState({
    title: "",
    image: "",
    description: "",
    video: "",
  });

  // fetch branch based on id
  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["article", id],
    () => getArticleSingle(id)
  );

  const mutation = useMutation((data) => {
    return editArticle(data);
  });

  // handle branch
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
    const { title, image, description } = article;
    try {
      if (!title || !description) {
        errorMessage("All fields are required!");
      } else {
        // do signin
        mutation.mutate(article);
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error?.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }

  if (mutation.isSuccess) {
    successMessage("Update article successfully");
  }
  if (mutation.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation?.error?.message
    );
  }

  useEffect(() => {
    // use query
    if (isSuccess) {
      const { _id, title, imageUrl, video, description } = data?.data?.data;
      setArticle({
        title,
        image: imageUrl,
        video,
        description,
        id: _id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WrapperContent title="Edit Article">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/article")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button
                onClick={() => handleSubmitBranch()}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? <BtnSpinner /> : "Update branch"}
              </Button>
            </div>
          </div>
        </div>
        <LoaderBox loader={isLoading} />
        <div class="basic-form">
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div class="form-group">
                  <label class="m-b-15 ">Title *</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="title"
                    value={article.title}
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
                  {/**  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={article.description}
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
                  <label class="m-b-15 ">Image *</label>
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

export default EditArticle;
