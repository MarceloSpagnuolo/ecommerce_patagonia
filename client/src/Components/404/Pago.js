import React from "react";
import Axios from "axios";




const Pago = () => {
    const toPayment = async (id) => {
        const { data } = await Axios.post(
            `http://localhost:3001/mepa/checkout/${1}`,
        );
        window.location = data.redirect;
    };
    return (

        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img alt="" />
            <button onClick={() => toPayment()}
            >
                pagar
              </button>
        </div>
    )

}
export default Pago;