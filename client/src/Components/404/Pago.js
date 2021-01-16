import React from "react";
<<<<<<< HEAD
import Axios from "axios";
=======
import axios from "axios";
>>>>>>> cf79ba5a69094a264823d40e6d3fdcc8db344c79




const Pago = () => {
    const toPayment = async (id) => {
<<<<<<< HEAD
        const { data } = await Axios.post(
            `http://localhost:3001/mepa/checkout/${1}`,
=======
        const { data } = await axios.post(
            `/mepa/checkout/${1}`,
>>>>>>> cf79ba5a69094a264823d40e6d3fdcc8db344c79
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