import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WrapperContent from "../../../WrapperContent";
import Button from "../../../Helper/Button";
import { errorMessage, successMessage } from "../../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../../utils/LoaderBox";
import { BtnSpinner } from "../../../utils/BtnSpinner";
import { applicationName, getCompany } from "../../../axios/setting/settingApi";
import { apiError } from "../../../utils/apiError";

function ApplicationName() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const companyRef = useRef("");

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "settings",
    getCompany
  );

  const mutation = useMutation((data) => applicationName(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("settings");
    },
  });

  //   handle save
  const handleSave = () => {
    if (!companyRef.current?.value) {
      errorMessage("company name is required!");
    } else {
      mutation.mutate({
        appName: companyRef.current?.value,
      });
    }
  };

  if (isError) {
    errorMessage(error?.message);
  }
  if (mutation.isError) {
    apiError(mutation.error);
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      successMessage("About company added successfully");
    }
  }, [mutation.isSuccess]);

  return (
    <WrapperContent title="Application name">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Button
                onClick={() => handleSave()}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? <BtnSpinner /> : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <LoaderBox loader={isLoading} />
        <LoaderBox loader={mutation.isLoading} />

        {isSuccess && (
          <div className="row mt-3">
            <div class="col-lg-12">
              <div class="form-group">
                <label class="m-b-15 ">Company name</label>
                <input
                  type="text"
                  class="form-control input-default "
                  name="name"
                  ref={companyRef}
                  defaultValue={data?.data?.result[0]?.applicationName || ""}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </WrapperContent>
  );
}

export default ApplicationName;
