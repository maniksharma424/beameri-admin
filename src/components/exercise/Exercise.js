import React, { useEffect } from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";
import Button from "../../Helper/Button";
import { errorMessage, successMessage } from "../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { deleteExercise, getExercise } from "../../axios/exercise";
import { formatDate } from "../../utils/formateDate";
import { apiError } from "../../utils/apiError";

function Exercise() {
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "exercise",
    getExercise
  );

  const mutation = useMutation((id) => deleteExercise(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("exercise");
    },
  });

  if (isError) {
    apiError(error);
  }
  if (mutation.isError) {
    apiError(mutation.error);
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      successMessage("exercise deleted successfully");
    }
  }, [mutation.isSuccess]);

  return (
    <WrapperContent title="Excerise">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Link to="/exercise/createExercise">
                <Button>
                  <i className="ti-plus"></i>&nbsp; Create exercise
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <LoaderBox loader={isLoading} />
        <LoaderBox loader={mutation.isLoading} />

        {isSuccess && (
          <div className="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.data?.map((item, index) => {
                          return (
                            <tr key={item._id}>
                              <th scope="row">{index + 1}</th>
                              <td>{item?.name}</td>
                              <td>{item?.description?.slice(0, 29)}</td>
                              <td>{formatDate(item?.createdAt)}</td>
                              <td class="color-danger">
                                <Link to={`/exercise/edit/${item._id}`}>
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
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Exercise;
