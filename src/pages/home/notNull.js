import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import services from "../../process/services";
import atom from "../../state";
import color from "../../utility/color";

const NotNull = (props) => {
  const [isProses, setIsProses] = useState(false);

  const { judul, sumber, isi} = props.data;

  const { id, beritumId, userlabelId } = props.data.labels[0];

  const [label, setLabel] = useState();

  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isProses) {
      setIsProses(true);
      services
        .labeledByUser(
          {
            userlabelId,
            beritumId,
            label,
          },
          id
        )
        .then((_) => {
          setCounter(counter + 1);
          swal("Data berhasil ditambah", {
            icon: "success",
          });
        })
        .catch((error) => {
          swal("Data gagal ditambah"+error.toString(), {
            icon: "warning",
          });
        });
      setIsProses(false);
    }
  };

  return (
    <div className="container py-2">
      <div className="container py-3 card" style={{ textAlign: "left" }}>
        <h3 className="pb-2">{judul}</h3>
        <p style={{ textAlign: "justify" }}>{isi}</p>
        <Form>
          <Form.Group>
            <Form.Select onChange={(e) => setLabel(e.target.value)}>
              <option hidden="hidden">- Pilih kelas berita -</option>
              <option value="1">Clickbait</option>
              <option value="2">Bukan Clickbait</option>
            </Form.Select>
          </Form.Group>
          <button
            onClick={(event) => handleSubmit(event)}
            className="btn col-md-12 mt-3"
            style={{
              backgroundColor: isProses ? color.white : color.red,
              color: isProses ? color.red : color.white,
            }}
          >
            {isProses ? "Loading" : "Submit"}
          </button>
          <div className="text-center mt-2">
            <Link
              to={{ pathname: sumber }}
              target="_blank"
              className="text-center"
            >
              Lihat berita
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NotNull;
