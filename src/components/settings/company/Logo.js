import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { errorMessage, successMessage } from "../../../utils/Toast";
import WrapperContent from "../../../WrapperContent";
import Button from "../../../Helper/Button";
import { BtnSpinner } from "../../../utils/BtnSpinner";
import LoaderBox from "../../../utils/LoaderBox";
import { companyLogo, getCompany } from "../../../axios/setting/settingApi";
const formData = new FormData();

function Logo() {
  const [image, setImage] = useState("");

  const [branch, setBranch] = useState({
    Headerlogo: "",
    Footerlogo: "",
    Adminlogo: "",
  });

  const [logo, setLogo] = useState({
    Headerlogo: "",
    Footerlogo: "",
    Adminlogo: "",
  });

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "settings",
    getCompany
  );
  const mutation = useMutation((data) => {
    return companyLogo(data);
  });

  // handle image
  const handleImage = (e) => {
    const img = e.target.files[0];
    const name = e.target.name;
    setBranch({ ...branch, [name]: img });
  };

  // handle submit
  const handleSubmitBranch = async (e) => {
    e.preventDefault();
    try {
      // Create a new FormData object
      formData.append("Headerlogo", branch.Headerlogo);
      formData.append("Adminlogo", branch.Adminlogo);
      formData.append("Footerlogo", branch.Footerlogo);

      mutation.mutate(branch);
    } catch (error) {
      errorMessage(error.message);
    }
  };

  if (isError) {
    errorMessage(error.message);
  }

  if (mutation.isSuccess) {
    successMessage("logo addedd successfully");
  }
  if (mutation.isError) {
    errorMessage(mutation.error.message);
  }

  useEffect(() => {
    // use query
    if (isSuccess) {
      if (data?.data?.result[0]?.logo) {
        const { Headerlogo, Footerlogo, Adminlogo } =
          data?.data?.result[0]?.logo;
        setLogo({
          Headerlogo,
          Footerlogo,
          Adminlogo,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <WrapperContent title="Logo">
        <section id="main-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="createBranch d-flex justify-content-end">
                <Button
                  onClick={(e) => handleSubmitBranch(e)}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? <BtnSpinner /> : "Save"}
                </Button>
              </div>
            </div>
          </div>
          <LoaderBox loader={isLoading} />

          <div className="row mt-3">
            <div className="col-lg-12">
              <div class="form-group">
                <label class="m-b-15 ">Header logo*</label>
                <input
                  type="file"
                  accept="image/*"
                  class="form-control input-default "
                  name="Headerlogo"
                  onInput={(e) => handleImage(e)}
                />
                <div
                  className="mt-3"
                  style={{ width: "10%", objectFit: "cover" }}
                >
                  <img
                    className="blob-to-image img-fluid img-size border rounded p-1"
                    src={logo?.Headerlogo}
                    alt="ui"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div class="form-group">
                <label class="m-b-15 ">Footer logo*</label>
                <input
                  type="file"
                  accept="image/*"
                  class="form-control input-default "
                  name="Footerlogo"
                  onInput={(e) => handleImage(e)}
                />
                <div
                  className="mt-3"
                  style={{ width: "10%", objectFit: "cover" }}
                >
                  <img
                    className="blob-to-image img-fluid img-size border rounded p-1"
                    src={logo?.Footerlogo}
                    alt="ui"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div class="form-group">
                <label class="m-b-15 ">Admin logo*</label>
                <input
                  type="file"
                  accept="image/*"
                  class="form-control input-default "
                  name="Adminlogo"
                  onInput={(e) => handleImage(e)}
                />
                <div className="mt-3" style={{ width: "10%" }}>
                  <img
                    className="blob-to-image img-fluid img-size border rounded p-1"
                    src={logo?.Adminlogo}
                    alt="ui"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </WrapperContent>
    </>
  );
}

export default Logo;
