import React from "react";
import { useQuery } from "react-query";
import Avatar from "react-avatar";
import { getBranch } from "../../../axios/branch";
import LoaderBox from "../../../utils/LoaderBox";
import WrapperContent from "../../../WrapperContent";
import { Link } from "react-router-dom";
import { apiError } from "../../../utils/apiError";

function UserRole() {
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "branch",
    getBranch
  );

  if (isError) {
    apiError(error);
  }

  return (
    <WrapperContent title="Role & Permission">
      <section id="main-content">
        <LoaderBox loader={isLoading} />

        {isSuccess && (
          <div className="row">
            {data?.data?.data?.map((item) => {
              return (
                <div className="col-lg-4" key={item._id}>
                  <Link to={`/roles/permission/${item._id}`}>
                    <div className="card">
                      <div className="stat-widget-one">
                        <div className="d-flex justify-content-between">
                          <Avatar name={item?.name} size="50" round={true} />
                        </div>

                        <div className="mt-3">
                          <div className="mt-2">
                            <h6 className="d-inline">Branch Name : </h6>
                            <span className="text-success">{item?.name}</span>
                          </div>
                          <div className="mt-2">
                            <h6 className="d-inline">Branch Contact : </h6>
                            <span className="text-success">
                              +91 {item?.contact}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3"></div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </WrapperContent>
  );
}

export default UserRole;
