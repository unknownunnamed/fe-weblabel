import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import swal from "sweetalert";
import services from "../../process/services";
import { useRecoilState, useRecoilValue } from "recoil";
import atom from "../../state";
import getUserLabel from "../../state/selector";

const TambahLabel = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const userLabel = useRecoilValue(getUserLabel);

  const [idUserLabel, setIdUserLabel] = useState();
  const [jumlahBerita, setJumlahBerita] = useState();

  const handleAddBerita = async () => {
    await services
      .addManyLabel({
        idUserLabel,
        jumlahBerita,
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
              <Form.Select
                className="mb-3"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(e) => setIdUserLabel(e.target.value)}
              >
                <option hidden>Masukkan user label</option>
                {userLabel.map((e, index) => (
                  <option key={index} value={e.id}>
                    {e.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Jumlah Berita"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setJumlahBerita(value.target.value)}
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

export default TambahLabel;
