import React from "react";
import WrapperContent from "../../WrapperContent";
import { useParams } from "react-router-dom";
import { getBranchSingle } from "../../axios/branch";
import { useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { apiError } from "../../utils/apiError";

function ViewExercise() {
  const { id } = useParams();

  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["branch", id],
    () => getBranchSingle(id)
  );

  if (isError) {
    apiError(error);
  }

  return (
    <WrapperContent title="View Excerise">
      <div className="main-content">
        <div className="main">
          <LoaderBox loader={isLoading} />

          {isSuccess && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="user-profile">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="user-photo m-b-30">
                              <img
                                className="img-fluid"
                                src="/images/user-profile.jpg"
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
                            <div className="user-job-title">
                              Product Designer
                            </div>
                            <div className="ratings">
                              <h4>Ratings</h4>
                              <div className="rating-star">
                                <span>8.9</span>
                                <i className="ti-star color-primary"></i>
                                <i className="ti-star color-primary"></i>
                                <i className="ti-star color-primary"></i>
                                <i className="ti-star color-primary"></i>
                                <i className="ti-star"></i>
                              </div>
                            </div>

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
                                    <h4>Contact information</h4>
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
                                    <div className="email-content">
                                      <span className="contact-title">
                                        Email:
                                      </span>
                                      <span className="contact-email">
                                        {data?.data?.data?.email}
                                      </span>
                                    </div>
                                    <div className="website-content">
                                      <span className="contact-title">
                                        Website:
                                      </span>
                                      <span className="contact-website">-</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default ViewExercise;
