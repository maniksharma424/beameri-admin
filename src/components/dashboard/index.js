import React from "react";
import WrapperContent from "../../WrapperContent";
import { errorMessage } from "../../utils/Toast";
import { useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { dashboad } from "../../axios/dashboard/dashboad";

function Dashboard() {
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    ["branch", "exercise", "member", "user", "article"],
    dashboad
  );

  if (isError) {
    errorMessage(error?.message);
  }

  return (
    <WrapperContent title="Dashboard">
      <section id="main-content">
        <LoaderBox loader={isLoading} />

        {isSuccess && (
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="stat-widget-one">
                  <div className="stat-icon dib">
                    <i className="ti-bar-chart-alt color-success border-success"></i>
                  </div>
                  <div className="stat-content dib">
                    <div className="stat-text">Branch</div>
                    <div className="stat-digit">
                      {data?.data?.data?.branchCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="stat-widget-one">
                  <div className="stat-icon dib">
                    <i className="ti-layout-list-thumb color-primary border-primary"></i>
                  </div>
                  <div className="stat-content dib">
                    <div className="stat-text">Members</div>
                    <div className="stat-digit">
                      {data?.data?.data?.memberCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="stat-widget-one">
                  <div className="stat-icon dib">
                    <i className="ti-layout-media-right color-pink border-pink"></i>
                  </div>
                  <div className="stat-content dib">
                    <div className="stat-text">Exercise</div>
                    <div className="stat-digit">
                      {data?.data?.data?.exerciseCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="stat-widget-one">
                  <div className="stat-icon dib">
                    <i className="ti-file color-danger border-danger"></i>
                  </div>
                  <div className="stat-content dib">
                    <div className="stat-text">Article</div>
                    <div className="stat-digit">
                      {data?.data?.data?.articleCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="stat-widget-one">
                  <div className="stat-icon dib">
                    <i className="ti-user color-dark border-dark"></i>
                  </div>
                  <div className="stat-content dib">
                    <div className="stat-text">User</div>
                    <div className="stat-digit">
                      {data?.data?.data?.userCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="stat-widget-one">
                  <div className="stat-icon dib">
                    <i className="ti-flickr-alt color-yellow border-yellow"></i>
                  </div>
                  <div className="stat-content dib">
                    <div className="stat-text">Avatar</div>
                    <div className="stat-digit">
                      {data?.data?.data?.avatarCount || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </WrapperContent>
  );
}

export default Dashboard;
