import React, { Fragment, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import color from "../../utility/color";
import CustomButton from "../customButton";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import atom from "../../state";
import services from "../../process/services";

const TambahBeritaExcel = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProses, setIsProses] = useState(false);
  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const [fileExcel, setFileExcel] = useState();
  const [jumlahData, setJumlahData] = useState(0);

  const handleAddBerita = async () => {
    setIsProses(true);
    const data = new FormData();
    data.append("fileExcel", fileExcel);
    data.append("jumlahData", jumlahData !== "" ? jumlahData : 0);
    // data.append("sumberBerita", sumberBerita);
    // data.append("idAdmin", idAdmin);
    await services
      .postBeritaExcel(data)
      .then((_) => {
        handleClose();
        setCounter(counter + 1);
        setIsProses(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsProses(false);
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
          title="Tambah Data With Excel"
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
                type="file"
                placeholder="Judul"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => {
                  setFileExcel(value.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Jumlah data yang dimasukkan"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => {
                  setJumlahData(value.target.value);
                }}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Control
                placeholder="Sumber"
                style={{
                  borderColor: color.black,
                  opacity: 0.5,
                  outline: 0,
                  boxShadow: "none",
                }}
                onChange={(value) => setSumberBerita(value.target.value)}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={handleAddBerita}>
            <CustomButton
              title={isProses ? "Loading..." : "Tambah"}
              bgColor={isProses ? "#808080" : color.red}
              textColor={color.gray}
              className="col-md-12"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default TambahBeritaExcel;
