import React, { useState } from "react";
import WrapperContent from "../../WrapperContent";
import Button from "../../Helper/Button";
import { useMutation } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { createUserByAdmin } from "../../axios/roles/user";

function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contact: "",
    email: "",
  });

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (data) => {
      return createUserByAdmin(data);
    }
  );

  // handle branch
  const handleBranch = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // handle submit
  const handleSubmitBranch = async () => {
    const { name, email, contact, pincode, state, city, address } = user;
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
        errorMessage("All fields required!");
      } else {
        // do
        const data = {
          firstName: name,
          lastName: "",
          password: (Math.floor(Math.random() * 90000) + 10000).toString(),
          email,
          //   contact,
          //   pincode,
          //   state,
          //   city,
          //   address,
        };
        mutate(data);
      }
    } catch (error) {
      errorMessage(error?.response?.data?.message || error?.message);
    }
  };

  if (isError) {
    errorMessage(error?.response?.data?.message || error?.message);
  }
  if (isSuccess) {
    successMessage("Create user successfully");
  }

  return (
    <WrapperContent title="Create User">
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              {/*<Button color="success" onClick={() => navigate("/branch")}>
                <i className="ti-arrow-left"></i>
              </Button> */}
              <Button onClick={() => handleSubmitBranch()} disabled={isLoading}>
                {isLoading ? <BtnSpinner /> : "+ Create User"}
              </Button>
            </div>
          </div>
        </div>

        <div class="basic-form">
          <div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Name</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="name"
                    value={user.name}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 "> Address</label>
                  <textarea
                    id=""
                    cols="30"
                    rows="20"
                    class="form-control input-default "
                    name="address"
                    value={user.address}
                    onChange={(e) => handleBranch(e)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 "> City</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="city"
                    value={user.city}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 "> State</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="state"
                    value={user.state}
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
                    value={user.pincode}
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
                    value={user.contact}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Email</label>
                  <input
                    type="email"
                    class="form-control input-default "
                    placeholder="john@gmail.com"
                    name="email"
                    value={user.email}
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

export default CreateUser;
