import React from "react";
import WrapperContent from "../../WrapperContent";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { errorMessage } from "../../utils/Toast";
import LoaderBox from "../../utils/LoaderBox";
import { formatDate } from "../../utils/formateDate";
import { getArticleSingle } from "../../axios/article";

function ViewArticle() {
  const { id } = useParams();

  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["article", id],
    () => getArticleSingle(id)
  );

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }

  return (
    <WrapperContent title="View Article">
      <div className="main-content">
        <div className="main">
          <LoaderBox loader={isLoading} />

          {isSuccess && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <article>
                    <header className="mb-4">
                      <h1 className="fw-bolder mb-1">
                        {data?.data?.data?.title}{" "}
                      </h1>
                      <div className="text-muted fst-italic mb-2">
                        Posted on {formatDate(data?.data?.data?.createdAt)}
                      </div>
                    </header>
                    <figure className="mb-4">
                      <img
                        className="img-fluid rounded"
                        src={
                          data?.data?.data?.imageUrl ||
                          "https://dummyimage.com/900x400/ced4da/6c757d.jpg"
                        }
                        style={{
                          objectFit: "contain",
                          width: "900px",
                          height: "400px",
                        }}
                        alt="article"
                      />
                    </figure>
                    <section
                      className="mb-5"
                      dangerouslySetInnerHTML={{
                        __html: data?.data?.data?.description,
                      }}
                    />
                  </article>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WrapperContent>
  );
}

export default ViewArticle;
