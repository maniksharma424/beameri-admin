import React from "react";
import WrapperContent from "../../WrapperContent";
import { useParams } from "react-router-dom";
import { getAllMembersToBranch, getBranchSingle } from "../../axios/branch";
import { useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { formatDate } from "../../utils/formateDate";
import Avatar from "react-avatar";
import { apiError } from "../../utils/apiError";

function ViewBranch() {
  const { id } = useParams();

  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["branch", id],
    () => getBranchSingle(id)
  );
  const {
    data: memberData,
    isLoading: memberLoading,
    error: memberError,
    isSuccess: memberSuccess,
    isError: memberIsError,
  } = useQuery(["branch1", id], () => getAllMembersToBranch(id));

  if (memberIsError) {
    apiError(memberError);
  }
  if (isError) {
    apiError(error);
  }

  return (
    <WrapperContent title="View branch">
      <div className="main-content">
        <div className="main">
          <LoaderBox loader={isLoading} />
          <LoaderBox loader={memberLoading} />

          {isSuccess && memberSuccess && (
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
                        <h6>
                          All Members - &nbsp;
                          <span className="text-success">
                            {memberData?.data?.data?.length}
                          </span>
                        </h6>
                      </div>
                      <hr />

                      <div className="my-2">
                        <div className="row">
                          {memberData?.data?.data?.map((item) => {
                            return (
                              <div className="col-lg-4" key={item?._id}>
                                <div className="card">
                                  <div className="stat-widget-one">
                                    <div className="stat-icon dib">
                                      <Avatar
                                        name={
                                          item?.firstName + " " + item?.lastName
                                        }
                                        size="50"
                                      />
                                    </div>
                                    <div className="stat-content dib">
                                      {item?.firstName + " " + item?.lastName}{" "}
                                      <span className="text-success">
                                        ({item?.memberType})
                                      </span>
                                      <div className="mt-2">
                                        <h6 className="d-inline">
                                          Joining Date :{" "}
                                        </h6>
                                        <span className="text-success">
                                          {formatDate(item?.joiningDate)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
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

export default ViewBranch;
