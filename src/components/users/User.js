import React, { useEffect } from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";
import Button from "../../Helper/Button";
import { deleteBranch, getBranch } from "../../axios/branch";
import { errorMessage, successMessage } from "../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { formatDate } from "../../utils/formateDate";
import Avatar from "react-avatar";

function User() {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "branch",
    getBranch
  );

  const mutation = useMutation((id) => deleteBranch(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("branch");
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

  useEffect(() => {
    if (mutation.isSuccess) {
      successMessage("Branch deleted successfully");
    }
  }, [mutation.isSuccess]);

  return (
    <WrapperContent title="Branch">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Link to="/branch/createBranch">
                <Button>
                  <i className="ti-plus"></i>&nbsp; Create branch
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <LoaderBox loader={isLoading} />
        <LoaderBox loader={mutation.isLoading} />

        {isSuccess && (
          <div className="row">
            {data?.data?.data?.map((item) => {
              return (
                <div className="col-lg-4" key={item._id}>
                  <div className="card">
                    <Link to={`/branch/view/${item._id}`}>
                      <div className="stat-widget-one">
                        <div className="d-flex justify-content-between">
                          <Avatar name={item?.name} size="50" round={true} />

                          <Avatar src={item?.qrCode} size="50" />
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
                      </div>
                    </Link>

                    <div className="editBranch mt-2 d-flex justify-content-end ">
                      <Link to={`/branch/edit/${item._id}`}>
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

export default User;
