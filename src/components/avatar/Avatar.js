import React, { useEffect } from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";
import Button from "../../Helper/Button";
import { errorMessage, successMessage } from "../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { formatDate } from "../../utils/formateDate";
import {
  deleteAvatar,
  getAllAvatar,
  updateStatusAvatar,
} from "../../axios/avatar/avatar";

function Avatar() {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "avatar",
    getAllAvatar
  );

  const mutation = useMutation((id) => deleteAvatar(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("avatar");
    },
  });

  const mutationUpdate = useMutation((id) => updateStatusAvatar(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("avatar");
    },
  });

  if (isError) {
    errorMessage(error?.message);
  }
  if (mutation.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation?.error?.message
    );
  }
  if (mutationUpdate.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation?.error?.message
    );
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      successMessage("avatar deleted successfully");
    }
    if (mutationUpdate.isSuccess) {
      successMessage("avatar updated successfully");
    }
  }, [mutation.isSuccess, mutationUpdate.isSuccess]);

  return (
    <WrapperContent title="Avatar">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Link to="/avatar/create">
                <Button>
                  <i className="ti-plus"></i>&nbsp; Create avatar
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <LoaderBox loader={isLoading} />
        <LoaderBox loader={mutation.isLoading} />
        <LoaderBox loader={mutationUpdate.isLoading} />

        {isSuccess && (
          <div className="row">
            {data?.data?.data?.map((item) => {
              return (
                <div className="col-lg-4" key={item._id}>
                  <div className="p-1 shadow-sm">
                    <div className="row">
                      <div className="col-lg-12">
                        <Link to={`/avatar/view/${item._id}`}>
                          <div style={{ width: "100%" }}>
                            <img
                              style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                aspectRatio: "16/9",
                                borderRadius: "4px",
                              }}
                              src={item?.imageUrl}
                              alt="avatar"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-5">
                        <div className="d-flex ">
                          <input
                            type="checkbox"
                            checked={item?.status === "active" ? true : false}
                            onClick={() => mutationUpdate.mutate(item._id)}
                            name="create"
                            style={{ width: "20px", height: "20px" }}
                          />
                          <span className="mx-2">{item?.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="editBranch1 d-flex justify-content-end ">
                      <Link to={`/avatar/edit/${item._id}`}>
                        <Button size={"btn-sm"} className="mx-2">
                          <i className="ti-marker-alt"></i>
                        </Button>
                      </Link>
                      <Button
                        size={"btn-sm"}
                        color="danger"
                        onClick={() => mutation.mutate(item._id)}
                      >
                        <i className="ti-cut"></i>
                      </Button>
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

export default Avatar;
