import React from "react";
import { Card } from "react-bootstrap";
import color from "../../utility/color";

const CardDashboard = (props) => {

  const {title, body} = props;

  return (
    <Card
      style={{
        textAlign: "center",
        color: color.black,
        backgroundColor: color.white,
        border: "none",
      }}
      className="rounded-3 shadow-sm p-3"
    >
      <Card.Title
        style={{
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        {title}
      </Card.Title>
      <Card.Body
        style={{
          fontSize: 50,
          fontWeight: 600,
        }}
        className="m-1"
      >
        {body}
      </Card.Body>
    </Card>
  );
};

export default CardDashboard;