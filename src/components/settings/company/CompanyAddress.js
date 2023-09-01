import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { errorMessage, successMessage } from "../../../utils/Toast";
import Button from "../../../Helper/Button";
import { BtnSpinner } from "../../../utils/BtnSpinner";
import WrapperContent from "../../../WrapperContent";
import { compayAddress, getCompany } from "../../../axios/setting/settingApi";
import LoaderBox from "../../../utils/LoaderBox";

function CompanyAddress() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [branch, setBranch] = useState({
    name: "",
    website: "",
    address: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
    contact: "",
    email: "",
  });

  const { isLoading, isSuccess, data } = useQuery("settings", getCompany);

  const mutation = useMutation((data) => compayAddress(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("settings");
    },
  });

  // handle branch
  const handleBranch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBranch({ ...branch, [name]: value });
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const {
      name,
      email,
      contact,
      pincode,
      state,
      city,
      address,
      website,
      country,
    } = branch;
    try {
      if (
        !name ||
        !email ||
        !contact ||
        !pincode ||
        !address ||
        !city ||
        !state ||
        !country ||
        !website
      ) {
        errorMessage("All fields required!");
      } else {
        // do
        const data = {
          company: name,
          contact,
          pincode,
          state,
          city,
          address,
          country,
          email,
          website,
        };
        mutation.mutate(data);
      }
    } catch (error) {
      errorMessage(error?.message);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      successMessage("company address added successfully");
    }
  }, [mutation.isSuccess]);

  if (mutation.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation.error?.message
    );
  }
  useEffect(() => {
    // use query
    if (isSuccess) {
      if (data?.data?.result[0]?.address) {
        const {
          company,
          address,
          country,
          city,
          state,
          website,
          pincode,
          contact,
          email,
        } = data?.data?.result[0]?.address;
        setBranch({
          name: company,
          address,
          city,
          state,
          pincode,
          website,
          contact,
          country,
          email,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WrapperContent title="Company address">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Button
                onClick={() => handleSubmitBranch()}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? <BtnSpinner /> : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <LoaderBox loader={isLoading} />
        <LoaderBox loader={mutation.isLoading} />

        <div class="basic-form mt-3">
          <div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Company name</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="name"
                    value={branch.name}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Address</label>
                  <textarea
                    id=""
                    cols="30"
                    rows="20"
                    class="form-control input-default "
                    name="address"
                    value={branch.address}
                    onChange={(e) => handleBranch(e)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">City</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="city"
                    value={branch.city}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">State</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="state"
                    value={branch.state}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div class="form-group">
                  <label class="m-b-15 ">Country</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="country"
                    value={branch.country}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Pin Code</label>
                  <input
                    type="number"
                    class="form-control input-default "
                    name="pincode"
                    value={branch.pincode}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Contact Number (+91)</label>
                  <input
                    type="number"
                    class="form-control input-default "
                    name="contact"
                    value={branch.contact}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Website</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    placeholder="john doe"
                    name="website"
                    value={branch.website}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Email</label>
                  <input
                    type="email"
                    class="form-control input-default "
                    placeholder="john@gmail.com"
                    name="email"
                    value={branch.email}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapperContent>
  );
}

export default CompanyAddress;
