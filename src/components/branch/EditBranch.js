import React, { useEffect, useState } from "react";
import WrapperContent from "../../WrapperContent";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Helper/Button";
import { useMutation, useQuery } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { editBranch, getBranchSingle } from "../../axios/branch";
import LoaderBox from "../../utils/LoaderBox";

function EditBranch() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [branch, setBranch] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contact: "",
    email: "",
  });

  // fetch branch based on id
  const { data, isLoading, error, isError, isSuccess } = useQuery(
    ["branch", id],
    () => getBranchSingle(id)
  );

  const mutation = useMutation((data) => {
    return editBranch(data);
  });

  // handle branch
  const handleBranch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBranch({ ...branch, [name]: value });
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const { name, email, contact, pincode, state, city, address } = branch;
    try {
      if (
        !name ||
        !email ||
        !contact ||
        !pincode ||
        !address ||
        !city ||
        !state
      ) {
        errorMessage("All fields are required!");
      } else {
        // do signin
        mutation.mutate(branch);
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error?.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }

  if (mutation.isSuccess) {
    successMessage("update branch successfully");
  }
  if (mutation.isError) {
    errorMessage(
      mutation.error?.response?.data?.message || mutation?.error?.message
    );
  }

  useEffect(() => {
    // use query
    if (isSuccess) {
      const {
        _id,
        name,
        address,
        city,
        state,
        pincode,
        contact,
        branchManagerEmail,
      } = data?.data?.data;
      setBranch({
        name,
        address,
        city,
        state,
        pincode,
        contact,
        email: branchManagerEmail,
        id: _id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WrapperContent title="Edit Branch">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-between">
              <Button color="success" onClick={() => navigate("/branch")}>
                <i className="ti-arrow-left"></i>
              </Button>
              <Button
                onClick={() => handleSubmitBranch()}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? <BtnSpinner /> : "Update branch"}
              </Button>
            </div>
          </div>
        </div>
        <LoaderBox loader={isLoading} />
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
                {/* <div class="form-group">
                  <label class="m-b-15 ">Branch Manager Name</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    placeholder="john doe"
                    name="bName"
                    value={branch.bName}
                    onChange={(e) => handleBranch(e)}
                  />
                </div> */}
              </div>
              <div className="col-lg-12">
                <div class="form-group">
                  <label class="m-b-15 ">Branch Manager Email</label>
                  <input
                    type="email"
                    class="form-control input-default "
                    placeholder="john@gmail.com"
                    name="email"
                    value={branch.email}
                    disabled
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

export default EditBranch;
