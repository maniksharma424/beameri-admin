import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { errorMessage, successMessage } from "../../../utils/Toast";
import Button from "../../../Helper/Button";
import { BtnSpinner } from "../../../utils/BtnSpinner";
import WrapperContent from "../../../WrapperContent";
import {
  compantSocialMedia,
  getCompany,
} from "../../../axios/setting/settingApi";
import LoaderBox from "../../../utils/LoaderBox";
import { apiError } from "../../../utils/apiError";

function SocialMedia() {
  const queryClient = useQueryClient();

  const [branch, setBranch] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    mail: "",
    youtube: "",
    pinterest: "",
  });

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "settings",
    getCompany
  );

  const mutation = useMutation((data) => compantSocialMedia(data), {
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
    const { facebook, pinterest, youtube, linkedin, instagram, twitter, mail } =
      branch;
    try {
      const data = {
        facebook,
        pinterest,
        youtube,
        linkedin,
        instagram,
        mail,
        twitter,
      };
      mutation.mutate(data);
    } catch (error) {
      errorMessage(error?.message);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      successMessage("social media added successfully");
    }
  }, [mutation.isSuccess]);

  if (mutation.isError) {
    apiError(mutation.error);
  }
  if (isError) {
    apiError(error);
  }
  useEffect(() => {
    // use query
    if (isSuccess) {
      if (data?.data?.result[0]?.socialMedia) {
        const logo = data?.data?.result[0]?.socialMedia?.map((logo) => {
          return {
            link: logo?.link,
            linkName: logo?.name.toLowerCase(),
          };
        });
        const face = logo[0]?.link;
        const twit = logo[1]?.link;
        const insta = logo[2]?.link;
        const linkd = logo[3]?.link;
        const mail = logo[4]?.link;
        const yt = logo[5]?.link;
        const pinter = logo[6]?.link;

        setBranch({
          facebook: face,
          instagram: insta,
          linkedin: linkd,
          youtube: yt,
          pinterest: pinter,
          twitter: twit,
          mail: mail,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WrapperContent title="Social media">
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
                  <label class="m-b-15 ">Facebook</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="facebook"
                    value={branch.facebook}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Twitter</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="twitter"
                    value={branch.twitter}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Linkedin</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="linkedin"
                    value={branch.linkedin}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Youtube</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="youtube"
                    value={branch.youtube}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">E-mail</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="mail"
                    value={branch.mail}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Instagram</label>
                  <textarea
                    id=""
                    cols="30"
                    rows="20"
                    class="form-control input-default "
                    name="instagram"
                    value={branch.instagram}
                    onChange={(e) => handleBranch(e)}
                  ></textarea>
                </div>
              </div>

              <div className="col-lg-6">
                <div class="form-group">
                  <label class="m-b-15 ">Pinterest</label>
                  <input
                    type="text"
                    class="form-control input-default "
                    name="pinterest"
                    value={branch.pinterest}
                    onChange={(e) => handleBranch(e)}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex">
              {data?.data?.result[0]?.socialMedia?.map((logo) => {
                return (
                  <div
                    className="logoImage mx-2 shadow border rounded p-2"
                    style={{ width: "5%", cursor: "pointer" }}
                    onClick={() => window.open(logo?.link, "_blank")}
                  >
                    <img
                      src={logo?.image}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="logo"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </WrapperContent>
  );
}

export default SocialMedia;
