import React, { useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation, useQuery } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { editAvatar, getAvatarSingle } from "../../axios/avatar/avatar";
import { useEffect } from "react";

function EditAvatar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [avatar, setAvatar] = useState({
    image: "",
    id: "",
  });
  const [showImage, setImage] = useState("");

  const { isLoading, isError, isSuccess, error, data } = useQuery(
    ["avatar", id],
    () => getAvatarSingle(id)
  );

  const mutation = useMutation((data) => {
    return editAvatar(data);
  });

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
        mutation.mutate(avatar);
      }
    } catch (error) {
      errorMessage(error.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }
  if (mutation.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation.error?.message
    );
  }
  if (mutation.isSuccess) {
    successMessage("Edit avatar successfully");
    navigate("/avatar");
  }

  useEffect(() => {
    // use query
    if (isSuccess) {
      const { _id, imageUrl } = data?.data?.data;
      setImage(imageUrl);
      setAvatar({
        image: imageUrl,
        id: _id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WrapperContent title="Edit Avatar">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/avatar")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button
                onClick={() => handleSubmitBranch()}
                disabled={mutation.isLoading}
              >
                {isLoading ? <BtnSpinner /> : "Edit avatar"}
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
                    // value={avatar.image}
                    onInput={(e) => handleImage(e)}
                    required={true}
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <img
                  src={showImage}
                  alt="imfg"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: "50vh",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapperContent>
  );
}

export default EditAvatar;
