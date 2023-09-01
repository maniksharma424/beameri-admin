import React, { useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { createBranch } from "../../axios/branch";
import { BtnSpinner } from "../../utils/BtnSpinner";

function CreateBranch() {
  const navigate = useNavigate();

  const [branch, setBranch] = useState({
    name: "",
    bName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contact: "",
    email: "",
  });

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (data) => {
      return createBranch(data);
    }
  );

  // handle branch
  const handleBranch = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBranch({ ...branch, [name]: value });
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const { name, email, contact, pincode, state, city, address, bName } =
      branch;
    try {
      if (
        !name ||
        !email ||
        !contact ||
        !pincode ||
        !address ||
        !city ||
        !state ||
        !bName
      ) {
        errorMessage("All fields required!");
      } else {
        // do
        const data = {
          branchData: {
            name,
            contact,
            pincode,
            state,
            city,
            address,
          },
          branchManagerData: {
            email,
            firstName: bName,
            lastName: "",
          },
        };
        mutate(data);
      }
    } catch (error) {
      errorMessage(error.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }
  if (isSuccess) {
    successMessage("Create branch successfully");
    navigate("/branch");
  }

  return (
    <WrapperContent title="Create Branch">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/branch")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button onClick={() => handleSubmitBranch()} disabled={isLoading}>
                {isLoading ? <BtnSpinner /> : "Create Branch"}
              </Button>
            </div>
          </div>
        </div>

        <div class="basic-form">
          <div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Branch Name</label>
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
                  <label class="m-b-15 ">Branch Address</label>
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
                  <label class="m-b-15 ">Branch City</label>
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
                  <label class="m-b-15 ">Branch State</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="state"
                    value={branch.state}
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
                  <label class="m-b-15 ">Branch Manager Name</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    placeholder="john doe"
                    name="bName"
                    value={branch.bName}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Branch Manager Email</label>
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

export default CreateBranch;
