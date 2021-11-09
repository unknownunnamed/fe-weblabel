import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
// import services from "../../process/service";
import swal from "sweetalert";
import { useRecoilState } from "recoil";
import atom from "../../state";
import services from "../../process/services";

const EditedModal = (props) => {
  const { id, judul, sumber, isi } = props;

  const [handleJudul, setHandleJudul] = useState(judul);
  const [handleSumber, setHandleSumber] = useState(sumber);
  const [handleIsi, setHandleIsi] = useState(isi);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

    const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const handleUpdateBerita = async () => {
    await services
      .putBerita(
        {
          judul: handleJudul,
          sumber: handleSumber,
          isi: handleIsi,
        },
        id
      )
      .then((result) => {
        setCounter(counter + 1);
        handleClose();
        swal("Data berhasil diedit", {
          icon: "success",
        });
      })
      .catch((_) => {
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
                placeholder="Judul"
                value={handleJudul}
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setHandleJudul(value.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Sumber"
                value={handleSumber}
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setHandleSumber(value.target.value)}
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
                onChange={(value) => setHandleIsi(value.target.value)}
              >
                {handleIsi}
              </textarea>
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

export default EditedModal;
