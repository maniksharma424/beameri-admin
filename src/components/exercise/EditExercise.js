import React, { useEffect, useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation, useQuery } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import LoaderBox from "../../utils/LoaderBox";
import { editExercise, getExerciseSingle } from "../../axios/exercise";
import VideoModel from "../model/VideoModel";
import { apiError } from "../../utils/apiError";

function EditExercise() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  // open
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [branch, setBranch] = useState({
    name: "",
    description: "",
    image: "",
    video: "",
  });

  // fetch branch based on id
  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["exercise", id],
    () => getExerciseSingle(id)
  );

  const mutation = useMutation((data) => {
    return editExercise(data);
  });

  // handle exercise
  const handleBranch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBranch({ ...branch, [name]: value });
  };

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      const img = e.target.files[0];
      setBranch({ ...branch, image: img });
    }
  };
  const handleVideo = (e) => {
    if (e.target.files.length !== 0) {
      const video = e.target.files[0];
      setBranch({ ...branch, video: video });
    }
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const { name, description, image, video } = branch;
    try {
      if (!name || !description) {
        errorMessage("All fields are required!");
      } else {
        // do
        mutation.mutate({ name, description, image, video, id });
      }
    } catch (error) {
      apiError(error);
    }
  };

  if (isError) {
    apiError(error);
  }

  if (mutation.isSuccess) {
    successMessage("update exercise successfully");
  }
  if (mutation.isError) {
    errorMessage(mutation.error.message);
  }

  useEffect(() => {
    // use query
    if (isSuccess) {
      const { name, description, imageUrl, videoUrl } = data?.data?.data;
      setImage(imageUrl);
      setBranch({
        name,
        description,
        image: imageUrl,
        video: videoUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <WrapperContent title="Create Excerise">
        <VideoModel
          open={open}
          handleClose={handleClose}
          video={branch?.video}
        />
        <section id="main-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="createBranch d-flex justify-content-between">
                <Button color="success" onClick={() => navigate("/exercise")}>
                  <i className="ti-arrow-left"></i>
                </Button>
                <Button
                  onClick={() => handleSubmitBranch()}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? <BtnSpinner /> : "Update exercise"}
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
                    <label class="m-b-15 ">Name</label>
                    <input
                      type="text"
                      class="form-control input-default "
                      name="name"
                      value={branch.name}
                      onChange={(e) => handleBranch(e)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div class="form-group">
                    <label class="m-b-15 ">Description</label>
                    <textarea
                      id=""
                      cols="30"
                      rows="20"
                      class="form-control input-default "
                      name="description"
                      value={branch.description}
                      style={{ height: "20vh" }}
                      onChange={(e) => handleBranch(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div class="form-group">
                    <label class="m-b-15 ">Image*</label>
                    <input
                      type="file"
                      accept="image/*"
                      class="form-control input-default "
                      name="image"
                      onInput={(e) => handleImage(e)}
                    />
                    <div className="mt-3">
                      <img
                        className="blob-to-image"
                        width={100}
                        src={image}
                        alt="ui"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="form-group">
                    <label class="m-b-15 ">
                      Video{" "}
                      <span
                        className="mx-3 text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpen(true)}
                      >
                        Play video
                      </span>
                    </label>
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
    </>
  );
}

export default EditExercise;
