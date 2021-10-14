import React from "react";
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import berita from "../../dummy/berita";
import title from "../../dummy/title";
import color from "../../utility/color";

const Home = () => {

  const history = useHistory();

  const handleLogout = () => {
      history.push('/login');
  }

  return (
    <Fragment>
      <div
        className="py-3 mb-2 shadow"
        style={{
          backgroundColor: color.white,
          color: color.black,
          textAlign: "right",
        }}
      >
        <div className="container">
          <span
            onClick={() => handleLogout()}
            className="pt-1 pb-2 px-4"
            style={{
              cursor: "pointer",
              borderRadius: 30,
              backgroundColor: color.red,
              color: color.white,
            }}
          >
            Keluar
          </span>
        </div>
      </div>
      <div className="container py-2">
        <div className="container py-3 card" style={{ textAlign: "left" }}>
          <h3 className="pb-2">{title}</h3>
          <p style={{ textAlign: "justify" }}>{berita}</p>
          <Form>
            <Form.Group>
              <Form.Select>
                <option disabled>- Pilih kelas berita -</option>
                <option value="Clickbait">Clickbait</option>
                <option value="Bukan Clickbait">Bukan Clickbait</option>
              </Form.Select>
            </Form.Group>
            <button
              className="btn col-md-12 mt-3"
              style={{
                backgroundColor: color.red,
                color: color.white,
              }}
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
