import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import color from "../../utility/color.js";

const Login = (props) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isProses, setIsProses] = useState(false);

  const HandleLogin = (event) => {
    event.preventDefault();
    if (!isProses) {
      setIsProses(true);
      console.log(`username : ${username}`);
      console.log(`username : ${password}`);
      if (props.login === "user") {
        history.push("/");
      } else {
        history.push("/admin");
      }
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
        <Card.Title>Login Admin</Card.Title>
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
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
