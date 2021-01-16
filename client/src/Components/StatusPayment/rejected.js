import React, { useEffect } from "react";
import "./rejected.css";


const handleClickBack = () => {
    window.location.href = "/"
}

const Rejected = () => {

    return (
        <div className="Rejected-Container">
            <div className="Rejected-SubContainer">
                <h1 className="Rejected-Title">Upss!! Ha ocurrido un error</h1>
                <h3 className="Rejected-Txt">Su pago ha sido rechazado por favor precione...</h3>
                <div className="Rejected-Container-btn">
                    <button onClick={() => handleClickBack()} id="Rejected-btn-back" className="Rejected-btn">
                        Volver a la pagina principal</button>
                    <button id="Rejected-btn-again" className="Rejected-btn">Reintentar Pago</button>
                </div>
            </div>
        </div>
    )
}


export default Rejected;


