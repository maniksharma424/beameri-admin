import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getBranchSingle } from "../../../axios/branch";
import { errorMessage, successMessage } from "../../../utils/Toast";
import WrapperContent from "../../../WrapperContent";
import LoaderBox from "../../../utils/LoaderBox";
import { getUserPermission } from "../../../axios/setting/settingApi";
import { useState } from "react";
import { updateRole } from "../../../axios/roles/role";
import { BtnSpinner } from "../../../utils/BtnSpinner";
import { apiError } from "../../../utils/apiError";

function UserPermission() {
  const { id } = useParams();
  const [right, setRight] = useState({
    read: false,
    create: false,
    update: false,
    delete: false,
  });

  const mutation = useMutation((data) => {
    return updateRole(data);
  });

  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["branch", id],
    () => getBranchSingle(id)
  );
  const user = useQuery(
    ["role", id, data?.data?.data?.branchManagerEmail],
    () =>
      getUserPermission({
        userId: id,
        email: data?.data?.data?.branchManagerEmail,
      })
  );

  if (user.isError) {
    apiError(user.error);
  }

  if (isError) {
    apiError(error);
  }

  // handle change
  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "create") {
      setRight({ ...right, create: !right.create });
    } else if (name === "delete") {
      setRight({ ...right, delete: !right.delete });
    } else if (name === "read") {
      setRight({ ...right, read: !right.read });
    } else {
      setRight({ ...right, update: !right.update });
    }
  };

  //  handle role update
  const handleRoleUpdate = async () => {
    try {
      const userRight = {
        id: user?.data?.data?.data?._id,
        rights: right,
      };
      mutation.mutate(userRight);
    } catch (error) {
      errorMessage(error?.message);
    }
  };

  if (mutation.isSuccess) {
    successMessage("role updated successfully");
  }
  if (mutation.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation.error?.message
    );
  }

  useEffect(() => {
    if (user.isSuccess) {
      const {
        read,
        create,
        update,
        delete: remove,
      } = user?.data?.data?.data?.rights;

      setRight({
        read: read,
        create: create,
        update: update,
        delete: remove,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isSuccess]);

  return (
    <WrapperContent title="View Role & Permission">
      <div className="main-content">
        <div className="main">
          <LoaderBox loader={isLoading} />
          <LoaderBox loader={mutation.isLoading} />

          {isSuccess && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="user-profile">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="shadow user-photo m-b-30">
                              <img
                                className="img-fluid img-size"
                                style={{ width: "100%", objectFit: "cover" }}
                                src={data?.data?.data?.qrCode}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="user-profile-name">
                              {data?.data?.data?.name}
                            </div>
                            <div className="user-Location">
                              <i className="ti-location-pin"></i>{" "}
                              {data?.data?.data?.city}
                            </div>
                            <div className="user-job-title">New</div>

                            <div className="custom-tab user-profile-tab">
                              <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active">
                                  <a
                                    href="#1"
                                    aria-controls="1"
                                    role="tab"
                                    data-toggle="tab"
                                  >
                                    About
                                  </a>
                                </li>
                              </ul>
                              <div className="tab-content">
                                <div
                                  role="tabpanel"
                                  className="tab-pane active"
                                  id="1"
                                >
                                  <div className="contact-information">
                                    <div className="phone-content">
                                      <span className="contact-title">
                                        Phone:
                                      </span>
                                      <span className="phone-number">
                                        +91 {data?.data?.data?.contact}
                                      </span>
                                    </div>
                                    <div className="address-content">
                                      <span className="contact-title">
                                        Address:
                                      </span>
                                      <span className="mail-address">
                                        {data?.data?.data?.address}
                                      </span>
                                    </div>
                                    <div className="address-content">
                                      <span className="contact-title">
                                        State:
                                      </span>
                                      <span className="mail-address">
                                        {data?.data?.data?.state}
                                      </span>
                                    </div>
                                    <div className="email-content">
                                      <span className="contact-title">
                                        Email:
                                      </span>
                                      <span className="contact-email">
                                        {data?.data?.data?.branchManagerEmail}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="membersBranch">
                        <h6 className="fw-bold">Role & Permission</h6>
                      </div>
                      <hr />

                      <div className="my-2">
                        <div className="row flex-column" style={{ gap: "3em" }}>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  color: "blue",
                                }}
                              >
                                Create
                              </span>
                              <p>Allow user to create </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={right?.create}
                              onChange={(e) => handleChange(e)}
                              name="create"
                              style={{ width: "20px", height: "20px" }}
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  color: "blue",
                                }}
                              >
                                Read
                              </span>
                              <p>Allow user to Read </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={right?.read}
                              onChange={(e) => handleChange(e)}
                              name="read"
                              style={{ width: "20px", height: "20px" }}
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  color: "blue",
                                }}
                              >
                                Edit
                              </span>
                              <p>Allow user to edit </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={right?.update}
                              onChange={(e) => handleChange(e)}
                              name="update"
                              style={{ width: "20px", height: "20px" }}
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  color: "blue",
                                }}
                              >
                                Delete
                              </span>
                              <p>Allow user to delete </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={right?.delete}
                              onChange={(e) => handleChange(e)}
                              name="delete"
                              style={{ width: "20px", height: "20px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRoleUpdate()}
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? <BtnSpinner /> : "Update role"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WrapperContent>
  );
}

export default UserPermission;
