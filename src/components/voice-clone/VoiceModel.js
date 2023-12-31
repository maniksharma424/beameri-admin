import { Button, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { errorMessage, successMessage } from "../../utils/Toast";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { createVoiceClone } from "../../axios/voiceClone";
import { randomValues } from "../../utils/randomString";
import { apiError } from "../../utils/apiError";

function VoiceModel({ show, handleClose }) {
  const queryClient = useQueryClient();
  const [audio, setAudio] = useState("");

  //   const mutation = useMutation((data) => {
  //     return createVoiceClone(data);
  //   });

  const mutation = useMutation((data) => createVoiceClone(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("voice");
    },
  });
  // handle audio file upload

  const handleCloneVoice = () => {
    if (audio) {
      mutation.mutate({ audio: audio, voice_name: randomValues() });
    } else {
      errorMessage("audio file not found");
    }
  };

  if (mutation.isError) {
    apiError(mutation.error);
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      console.log(mutation.data?.data?.data);
      if (mutation.data?.status === 200) {
        successMessage("audio file successfully uploaded");
        window.location.reload();
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add audio to clone voice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Audio(Mp3) - (2s-10s)</Form.Label>
            <Form.Control
              type="file"
              onInput={(e) => setAudio(e.target.files[0])}
              accept="audio/mp3"
              name="audio"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={mutation.isLoading}
            onClick={() => handleCloneVoice()}
          >
            {mutation.isLoading ? <BtnSpinner /> : "Add voice"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VoiceModel;
