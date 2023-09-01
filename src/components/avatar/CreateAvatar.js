import React, { useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { createAvatar } from "../../axios/avatar/avatar";

function CreateAvatar() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState({
    image: "",
  });

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (data) => {
      return createAvatar(data);
    }
  );

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      const img = e.target.files[0];
      setAvatar({ ...avatar, image: img });
    }
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const { image } = avatar;
    try {
      if (!image) {
        errorMessage("fields required!");
      } else {
        mutate(avatar);
      }
    } catch (error) {
      errorMessage(error.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }
  if (isSuccess) {
    successMessage("Create avatar successfully");
    navigate("/avatar");
  }

  return (
    <WrapperContent title="Create Avatar">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/avatar")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button onClick={() => handleSubmitBranch()} disabled={isLoading}>
                {isLoading ? <BtnSpinner /> : "Create avatar"}
              </Button>
            </div>
          </div>
        </div>

        <div class="basic-form shadow-sm">
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div class="form-group">
                  <label class="m-b-15 ">Avatar Image(*)</label>
                  <input
                    type="file"
                    class="form-control input-default "
                    name="image"
                    value={avatar.name}
                    onInput={(e) => handleImage(e)}
                    required={true}
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

export default CreateAvatar;
