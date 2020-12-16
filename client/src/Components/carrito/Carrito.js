import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUser, postCreateCart } from '../../store/actions';



var order = {
    products: [{
        name: "Amber Lager",
        description: "Esta cerveza bien fria va como loco",
        price: 200,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHlzdC432zyFNkwS2cQx_bCWsNQf3y5f0be70qptJvvb98WdHGUGwJrsEtPafjg_QA5Rgui6PxQYA&usqp=CAc",
        quantity: 3,
    }, {
        name: "OctubreFEST",
        description: "Esta cerveza bien fria te pone loco",
        price: 230,
        thumbnail: "https://www.clubcervecero.com.py/tienda/web/imagen.php?src=assets/images/productos/PATAGONIA-OCTUBREFEST-BOTELLA-730ML_jlu0ece6.jpg&x=632&y=948&r=0&c=1&v=1&e=1",
        quantity: 4,

    }],
    total: 1520,

}



function Carrito() {

    //const { idUserCurrent, order } = useSelector(state => state);
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(getCartByUser(idUserCurrent))
    //     !order && order.length === 0 && dispatch(postCreateCart(idUserCurrent))
    // });


    return (
        <div className="Carrito-Container">
            <h1>Carrito de Compras</h1>

            {order.products.length > 0 && order.products.map((prod) => (
                <div className="Carrito-Producto">

                    <div className="Carrito-Detalles">
                        <div>
                            <img src={prod.thumbnail}></img>
                        </div>
                        <div>
                            <h3>{prod.name}</h3>
                            <h5>{prod.description}</h5>
                        </div>
                    </div>

                    <div className="Carrito-Cantidad-Precio">
                        <div className="Carrito-Boton-Cantidad">
                            <button>-</button>
                            <h5>{prod.quantity}</h5>
                            <button>+</button>
                        </div>
                        <h3>{prod.price * prod.quantity}</h3>
                    </div>


                </div>
            ))}
            <div className="Carrito-Total">
                <h3>Total</h3>
                <h4>{order.total}</h4>
            </div>
            <div className="Carrito-Comprar">
                <button>Continuar compra</button>
            </div>
        </div>

    )

}


export default Carrito;