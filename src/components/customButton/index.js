import React from "react";
import { Link } from "react-router-dom";

const CustomButton = (props) => {
  const { onClick, title, bgColor, textColor, className, link, isLink } = props;
  return (
    <div
      style={{
        marginRight: 15,
      }}
    >
      {isLink ? (
        <Link
          // onClick={() => onClick ?? null}
          to={link}
          className={`btn ${className}`}
          style={{
            boxShadow: "none",
            outline: 0,
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          {title}
        </Link>
      ) : (
        <div
          onClick={() => onClick ?? null}
          className={`btn ${className}`}
          style={{
            boxShadow: "none",
            outline: 0,
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default CustomButton;
