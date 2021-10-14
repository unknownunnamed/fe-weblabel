import React from "react";
import { Link } from "react-router-dom";
import color from "../../utility/color";
import notfound from "./../../assets/svg/notfound.svg";

const NotFound = (props) => {
    return (
        <div className="body-center">
            <div className="center col-md-4 col-12">
                <img src={notfound} alt="img-not-found" className="p-2" width="100%" height="auto" />
                <Link to={props.link} className="btn col-md-4 mt-3"  style={{backgroundColor : color.red, color : color.white}}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;