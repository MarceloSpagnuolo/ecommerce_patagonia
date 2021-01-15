import React from "react";
import "./unauthorized.css"

function Unauthorized () {

    return (
        <div className="Authorized-Container">
            <img className="Authorized-Imagen" src={`${process.env.REACT_APP_API_URL}/images/401.jpg`} alt=""/>
        </div>
    )

}

export default Unauthorized;