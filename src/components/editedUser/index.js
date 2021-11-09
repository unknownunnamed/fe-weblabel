import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import swal from "sweetalert";
import services from "../../process/services";
import { useRecoilState } from "recoil";
import atom from "../../state";

const EditedUser = (props) => {
  const { id, username, password } = props;

  const [handleUsername, setHandleUsername] = useState(username);
  const [handlePassword, setHandlePassword] = useState(password);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const handleUpdateBerita = async () => {
    await services
      .updateUserLabel(
        {
          username: handleUsername,
          password: handlePassword,
        },
        id
      )
      .then((result) => {
        handleClose();
        setCounter(counter + 1);
        swal("Data berhasil diedit", {
          icon: "success",
        });
      })
      .catch((error) => {
        setIsError(true);
        swal("Data gagal diedit", {
          icon: "warning",
        });
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div onClick={() => handleShow()}>
        <CustomButton
          title="Edit"
          textColor={color.black}
          bgColor={color.blue}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isError ? (
            <Alert variant="danger">
              Terdapat kesalahan ketika mengubah data
            </Alert>
          ) : null}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Username"
                value={handleUsername}
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setHandleUsername(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Password"
                value={handlePassword}
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setHandlePassword(value.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleUpdateBerita}>
            <CustomButton
              title="Simpan"
              bgColor={color.blue}
              textColor={color.black}
              className="col-md-12"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditedUser;
