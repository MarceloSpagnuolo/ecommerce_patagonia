import React from "react";
import "./success.css";


const handleClickBack = () => {
    window.location.href = "/"
}

const handleClickContact = () => {
    window.location.href = "/contacto"
}

const Success = () => {

    return (
        <div className="Success-Container">
            <div className="Success-SubContainer">
                <h1 className="Success-Title">Felicidades!! Su compra ha sido exitosa</h1>
                <h3 className="Success-Txt">En las proximas 48hs le estaremos enviando el pedido a su domicilio,
                el cual al despacharse le enviaremos otro mail confirmando el envio, ya
                le hemos enviado los detalles de su factura a su email por favor verifique su casilla de correo.</h3>
                <h3 className="Success-Txt">En caso de NO encontrar el mail con su factura, puede haber llegado como correo spam
                o si existe algun error en ella por favor comunicarse con nosotros por cualquier medio,
                 resolveremos su conflicto lo antes posible</h3>
                <div className="Success-Container-btn">
                    <button onClick={() => handleClickBack()} className="Success-btn">Volver a la pagina principal</button>
                    <button onClick={() => handleClickContact()} className="Success-btn">Contáctenos</button>
                </div>
            </div>
        </div>
    )
}


export default Success;