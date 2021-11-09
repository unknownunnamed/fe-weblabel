import React, { Fragment } from "react";
import color from "../../utility/color";
const Title = (props) => {

  return (
    <Fragment>
      <div className="space">
        <h1
          style={{
            fontSize: 20,
            color: color.red,
          }}
        >
          {props.title}
        </h1>
      </div>
    </Fragment>
  );
};

export default Title;
