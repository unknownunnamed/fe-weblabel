import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import swal from "sweetalert";
import services from "../../process/services";
import { useRecoilState } from "recoil";
import atom from "../../state";

const TambahModal = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const [judul, setJudul] = useState("");
  const [sumber, setSumber] = useState("");
  const [isi, setIsi] = useState("");

  const handleAddBerita = async () => {
    await services
      .postBerita({
        judul,
        sumber,
        isi,
      })
      .then((_) => {
        setCounter(counter + 1);
        handleClose();
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
          title="Tambah Data"
          bgColor={color.red}
          textColor={color.gray}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
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
                placeholder="Judul"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setJudul(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Sumber"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setSumber(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <textarea
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                className="form-control"
                onChange={(value) => setIsi(value.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleAddBerita}>
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

export default TambahModal;
