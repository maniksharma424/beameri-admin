import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WrapperContent from "../../../WrapperContent";
import Button from "../../../Helper/Button";
import { errorMessage, successMessage } from "../../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../../utils/LoaderBox";
import { Editor } from "@tinymce/tinymce-react";
import { BtnSpinner } from "../../../utils/BtnSpinner";
import {
  createAboutCompany,
  getCompany,
} from "../../../axios/setting/settingApi";
import { apiError } from "../../../utils/apiError";

function AboutCompany() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const editorRef = useRef("");

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "settings",
    getCompany
  );

  const mutation = useMutation((data) => createAboutCompany(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("settings");
    },
  });

  //   handle save
  const handleSave = () => {
    if (!editorRef.current.getContent()) {
      errorMessage("About company is required!");
    } else {
      mutation.mutate({
        about: editorRef?.current?.getContent(),
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
    <WrapperContent title="About company">
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
              <Editor
                onInit={(evt, editor) => {
                  return (editorRef.current = editor);
                }}
                initialValue={data?.data?.result[0]?.aboutCompany || ""}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | image | help",
                  content_style: "body { font-size:18px }",
                }}
                apiKey={process.env.REACT_APP_TINY_API}
              />
            </div>
          </div>
        )}
      </section>
    </WrapperContent>
  );
}

export default AboutCompany;
