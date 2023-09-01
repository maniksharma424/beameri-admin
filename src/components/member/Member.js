import React from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";
import Button from "../../Helper/Button";
import { errorMessage } from "../../utils/Toast";
import { useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import Avatar from "react-avatar";
import { formatDate } from "../../utils/formateDate";
import { getAllMembers } from "../../axios/member";

function Member() {
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "member",
    getAllMembers
  );

  if (isError) {
    errorMessage(error?.message);
  }

  return (
    <WrapperContent title="Member">
      <section id="main-content">
        <LoaderBox loader={isLoading} />

        {isSuccess && (
          <div className="row">
            {data?.data?.data?.map((item) => {
              console.log(item);
              return (
                <div className="col-lg-4" key={item?._id}>
                  <div className="card">
                    <div className="stat-widget-one">
                      <div className="stat-icon dib">

                        <Avatar
                          name={item?.firstName + " " + item?.lastName}
                          size="50"
                          round={true}
                        />

                      </div>
                      <div className="stat-content dib">
                        {item?.firstName + " " + item?.lastName}{" "}
                        <span className="text-success">
                          ({item?.memberType})
                        </span>
                        <div className="mt-2">
                          <h6 className="d-inline">Joining Date : </h6>
                          <span className="text-success">
                            {formatDate(item?.joiningDate)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <h6 className="d-inline">Branch Details :# </h6>
                          <span className="text-success">
                            <Link to={`/branch/view/${item?.branch}`}>
                              {item?.branch}
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </WrapperContent>
  );
}

export default Member;
