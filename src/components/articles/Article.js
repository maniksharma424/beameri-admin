import React, { useEffect } from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";
import Button from "../../Helper/Button";
import { errorMessage, successMessage } from "../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { deleteArticle, getAllArticles } from "../../axios/article";
import { formatDate } from "../../utils/formateDate";

function Article() {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "article",
    getAllArticles
  );

  const mutation = useMutation((id) => deleteArticle(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("article");
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
      successMessage("article deleted successfully");
    }
  }, [mutation.isSuccess]);

  return (
    <WrapperContent title="Article">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Link to="/article/createArticle">
                <Button>
                  <i className="ti-plus"></i>&nbsp; Create article
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
                          <th>Title</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.data?.map((item, index) => {
                          return (
                            <tr key={item._id} className="w-100">
                              <th scope="row">{index + 1}</th>
                              <td>{item?.title}</td>
                              <td
                                className="mt-3 description"
                                dangerouslySetInnerHTML={{
                                  __html: item?.description?.slice(0, 29),
                                }}
                              />
                              <td>{formatDate(item?.createdAt)}</td>
                              <td>
                                <Link to={`/article/view/${item._id}`}>
                                  <Button
                                    size={"btn-sm"}
                                    className="bg-success mx-2"
                                  >
                                    <i className="ti-eye"></i>
                                  </Button>
                                </Link>
                                <Link to={`/article/edit/${item._id}`}>
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

export default Article;
