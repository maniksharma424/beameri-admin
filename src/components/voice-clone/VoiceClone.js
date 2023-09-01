import React, { useEffect } from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";
import Button from "../../Helper/Button";
import { errorMessage, successMessage } from "../../utils/Toast";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoaderBox from "../../utils/LoaderBox";
import { formatDate } from "../../utils/formateDate";
import {
  deleteSingleVoiceDbId,
  deleteSingleVoiceId,
  getAllVoice,
  getAllVoiceDb,
  updateStatusVoiceDbId,
} from "../../axios/voiceClone";
import VoiceModel from "./VoiceModel";
import { useState } from "react";
function VoiceClone() {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [voice, setVoice] = useState([]);
  // const voice = [];

  const { isLoading, isSuccess, isError, error, data } = useQuery(
    "voice",
    getAllVoice
  );
  const dbData = useQuery("voice11", getAllVoiceDb);

  const mutation = useMutation((id) => deleteSingleVoiceId(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("voice");
    },
  });

  const mutationActive = useMutation((id) => updateStatusVoiceDbId(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("voice");
    },
  });

  const mutationDb = useMutation((id) => deleteSingleVoiceDbId(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("voice11");
    },
  });

  if (isError || dbData.isError) {
    errorMessage(error?.message || dbData.error?.message);
  }
  if (mutation.isError || mutationDb.isError || mutationActive.isError) {
    errorMessage(
      mutation.error?.response?.data?.message ||
        mutation.error?.message ||
        mutationDb.error?.response?.data?.message ||
        mutationDb.error?.message ||
        mutationActive.error?.response?.data?.message ||
        mutationActive.error?.message
    );
  }

  // model

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isSuccess || dbData.isSuccess) {
      // calculation
      data?.data?.voices?.slice(39)?.forEach((item) => {
        dbData?.data?.data?.data?.forEach((child) => {
          if (item?.voice_id === child.voice_id) {
            setVoice((prevVoice) => [
              ...prevVoice,
              {
                voice_id: child.voice_id,
                active: child.status,
                voice_name: child.voice_name,
                _id: child._id,
                name: item.name,
                preview_url: item.preview_url,
                category: item.category,
              },
            ]);
          }
        });
      });

      // Assuming dbData is the object containing the data you're working with
      // dbData?.data?.data?.data?.forEach((child) => {
      //   const matchingItem = voice.find(
      //     (item) => item.voice_id === child.voice_id
      //   );

      //   if (matchingItem) {
      //     const updatedVoice = voice.map((item) =>
      //       item.voice_id === child.voice_id
      //         ? {
      //             ...item,
      //             active: child.status,
      //             voice_name: child.voice_name,
      //             _id: child._id,
      //           }
      //         : item
      //     );

      //     setVoice(updatedVoice);
      //   } else {
      //     setVoice((prevVoice) => [
      //       ...prevVoice,
      //       {
      //         voice_id: child.voice_id,
      //         active: child.status,
      //         voice_name: child.voice_name,
      //         _id: child._id,
      //         name: item.name,
      //         preview_url: item.preview_url,
      //         category: item.category,
      //       },
      //     ]);
      //   }
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, dbData.isSuccess]);

  useEffect(() => {
    if (mutation.isSuccess || mutationDb.isSuccess) {
      successMessage("voice deleted successfully");
      window.location.reload();
    }
  }, [mutation.isSuccess, mutationDb.isSuccess]);
  useEffect(() => {
    if (mutationActive.isSuccess) {
      successMessage("voice updated successfully");
      window.location.reload();
    }
  }, [mutationActive.isSuccess]);
  return (
    <WrapperContent title="Voice-clone">
      <VoiceModel show={show} handleClose={handleClose} />

      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="createBranch d-flex justify-content-end">
              <Button onClick={() => handleShow()}>
                <i className="ti-plus"></i>&nbsp; Add Voice
              </Button>
            </div>
          </div>
        </div>
        <LoaderBox loader={isLoading} />
        <LoaderBox loader={mutation.isLoading} />
        <LoaderBox loader={dbData.isLoading} />
        <LoaderBox loader={mutationActive.isLoading} />

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
                          <th>Name</th>
                          <th>Voice</th>
                          <th>Voice_id</th>
                          <th>Active</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {voice?.map((item, index) => {
                          return (
                            <tr key={item?.voice_id}>
                              <th scope="row">{index + 1}</th>
                              <td>{item?.name || ""}</td>
                              <td>
                                {item?.preview_url ? (
                                  <audio controls autoplay>
                                    <source
                                      src={item?.preview_url}
                                      type="audio/mp3"
                                    />
                                  </audio>
                                ) : (
                                  item?.voice_name
                                )}
                              </td>
                              <td>{item?.voice_id}</td>
                              <td>
                                <div className="activeField">
                                  {item?.active === "active" ? (
                                    <button
                                      className="btn btn-success"
                                      onClick={() =>
                                        mutationActive.mutate(item?._id)
                                      }
                                    >
                                      Active
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        mutationActive.mutate(item?._id)
                                      }
                                    >
                                      Inactive
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td class="color-danger">
                                <Button
                                  size={"btn-sm"}
                                  color="danger"
                                  onClick={() => {
                                    mutation.mutate(item.voice_id);
                                    mutationDb.mutate(item._id);
                                  }}
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

export default VoiceClone;
