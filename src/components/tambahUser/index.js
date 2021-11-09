import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
// import services from "../../process/service";
// import { useResetRecoilState } from "recoil";
// import { getDataset, getDatatest, getDatatrain } from "../../state";
import swal from "sweetalert";
import services from "../../process/services";
import { useRecoilState } from "recoil";
import atom from "../../state";

const TambahUser = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const handleAddUser = async () => {
    await services
      .addUserLabel({
        username,
        password,
      })
      .then((_) => {
        handleClose();
        setCounter(counter + 1);
        swal("Data berhasil ditambah", {
          icon: "success",
        });
      })
      .catch((error) => {
        setIsError(true);
        swal("Data gagal ditambah", {
          icon: "warning",
        });
      });
  };

  const handleClose = () => {
    setShow(false);
    setIsError(false);
  };
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div onClick={() => handleShow()}>
        <CustomButton
          title="Tambah User"
          bgColor={color.red}
          textColor={color.gray}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isError ? (
            <Alert variant="danger">
              Terdapat kesalahan ketika menambahkan data
            </Alert>
          ) : null}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Username"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setUsername(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Password"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setPassword(value.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleAddUser}>
            <CustomButton
              title="Tambah"
              bgColor={color.red}
              textColor={color.gray}
              className="col-md-12"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default TambahUser;
