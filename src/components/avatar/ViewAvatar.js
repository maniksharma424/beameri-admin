import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { errorMessage } from "../../utils/Toast";
import WrapperContent from "../../WrapperContent";
import LoaderBox from "../../utils/LoaderBox";
import { getAvatarSingle } from "../../axios/avatar/avatar";

function ViewAvatar() {
  const { id } = useParams();

  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["branch", id],
    () => getAvatarSingle(id)
  );

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }

  console.log("memberData", data?.data?.data?.imageUrl);

  return (
    <WrapperContent title="View Avatar">
      <div className="main-content">
        <div className="main">
          <LoaderBox loader={isLoading} />

          {isSuccess && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div
                      className="card-body"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    >
                      <img
                        src={data?.data?.data?.imageUrl}
                        alt="log"
                        style={{
                          display: "block",
                          width: "100%",
                          aspectRatio: "16/9",
                          objectFit: "cover",
                        }}
                      />
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

export default ViewAvatar;
