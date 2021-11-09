import React, { useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import cautionIMG from "../../assets/svg/error.svg";
import services from "../../process/services";
import color from "../../utility/color.js";

const Login = (props) => {
  const history = useHistory();

  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isProses, setIsProses] = useState(false);

  const HandleLogin = (event) => {
    event.preventDefault();
    if (!isProses) {
      setIsProses(true);
      const typeLogin = props.login === "user" ? "userLabel" : "admin";
      services
        .login(typeLogin, {
          username,
          password,
        })
        .then((result) => {
          if (result.data.data.length === 0) {
            setIsError(true);
            return;
          }
          if (props.login === "user") {
            localStorage.setItem("userWebLabel", result.data.data[0].id);
            history.push("/");
          } else {
            localStorage.setItem("adminWebLabel", result.data.data[0].id);
            history.push("/admin");
          }
        })
        .catch(() => {
          setIsError(true);
        });

      setIsProses(false);
    }
  };

  return (
    <div
      className="body-center"
      style={{ backgroundColor: color.gray, padding: 10 }}
    >
      <Card
        className="center rounded-3 shadow-sm col-lg-6 col-md-8 col-sm-12 col-12 "
        style={{
          backgroundColor: color.white,
          color: color.black,
          border: "none",
          paddingTop: 30,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Card.Title>
          Login {props.login === "user" ? "User" : "Admin"}
        </Card.Title>
        <Card.Body>
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
                type="password"
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

            <Button
              type="submit"
              className="col-12 btn"
              style={{
                color: isProses ? color.red : color.white,
                backgroundColor: isProses ? color.gray : color.red,
                border: "none",
                outline: 0,
                boxShadow: "none",
              }}
              onClick={(event) => HandleLogin(event)}
            >
              {isProses ? "Loading" : "Login"}
            </Button>
            <Modal show={isError} onHide={() => setIsError(false)}>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-4" />
                  <img
                    src={cautionIMG}
                    alt="img-not-found"
                    className="p-2 col-md-4"
                    // width="100%"
                    // height="auto"
                  />
                  <div className="col-md-4" />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    padding: 10,
                  }}
                >
                  Terjadi kesalahan, periksa kembali username dan password anda
                </p>
                <div className="row">
                  <div className="col-md-4" />
                  <button
                    className="btn col-md-4"
                    style={{
                      boxShadow: "none",
                      outline: 0,
                      backgroundColor: color.red,
                      color: color.gray,
                    }}
                    onClick={() => setIsError(false)}
                  >
                    Coba Lagi
                  </button>
                  <div className="col-md-4" />
                </div>
              </Modal.Body>
            </Modal>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
