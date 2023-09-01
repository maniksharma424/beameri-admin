import React, { useEffect, useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { createExercise } from "../../axios/exercise";

function CreateExercise() {
  const navigate = useNavigate();

  const [branch, setBranch] = useState({
    name: "",
    description: "",
    image: "",
  });

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (data) => {
      return createExercise(data);
    }
  );

  // handle branch
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
    const { name, description } = branch;
    try {
      if (!name || !description) {
        errorMessage("All fields required!");
      } else {
        mutate(branch);
      }
    } catch (error) {
      errorMessage(error.message);
    }
  };

  if (isError) {
    errorMessage(error.message);
  }
  if (isSuccess) {
    successMessage("Create excersise successfully");
    navigate("/exercise");
  }

  return (
    <WrapperContent title="Create Excerise">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/exercise")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button onClick={() => handleSubmitBranch()} disabled={isLoading}>
                {isLoading ? <BtnSpinner /> : "Create exercise"}
              </Button>
            </div>
          </div>
        </div>

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
              <div className="col-lg-12 addSupport">
                <h6>Support image/video</h6>
                <hr />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Image</label>
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

export default CreateExercise;
