import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUser, postCreateCart } from "../../store/actions";
import "./Carrito.css";

var order = {
  products: [
    {
      id: 1,
      name: "Amber Lager",
      description: "Esta cerveza bien fria va como loco",
      price: 200.99,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHlzdC432zyFNkwS2cQx_bCWsNQf3y5f0be70qptJvvb98WdHGUGwJrsEtPafjg_QA5Rgui6PxQYA&usqp=CAc",
      quantity: 3,
    },
    {
      id: 2,
      name: "OctubreFEST",
      description: "Esta cerveza bien fria te pone loco",
      price: 230.0,
      thumbnail:
        "https://www.clubcervecero.com.py/tienda/web/imagen.php?src=assets/images/productos/PATAGONIA-OCTUBREFEST-BOTELLA-730ML_jlu0ece6.jpg&x=632&y=948&r=0&c=1&v=1&e=1",
      quantity: 4,
    },
  ],
  total: 1520,
};

function Carrito() {
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(order.products.quantity);
  //var total;
  //const { idUserCurrent, order } = useSelector(state => state);
  // const dispatch = useDispatch();

  useEffect(() => {
    var cal = 0;
    order.products.map((prod) => {
      cal += prod.price * prod.quantity;
    });
    setTotal(cal);
  }, [order]);

  // useEffect(() => {
  //     dispatch(getCartByUser(idUserCurrent))
  //     !order && order.length === 0 && dispatch(postCreateCart(idUserCurrent))
  // },[]);
  function handleMas(productId) {
    //putQuantity(iduser, idOrder, idProduct, 1);
  }

  function handleMenos() {
    //putQuantity(idUser, idOrder, idProduct, -1);
  }

  return (
    <div className="Carrito-Container">
      <h1>Carrito de Compras</h1>

      {order.products.length > 0 &&
        order.products.map((prod) => (
          <div className="Carrito-Producto">
            <div className="Carrito-Detalles">
              <div>
                <img className="Carrito-Imagen" src={prod.thumbnail}></img>
              </div>
              <div>
                <h3>{prod.name}</h3>
                <h4>{prod.description}</h4>
              </div>
            </div>

            <div className="Carrito-Cantidad-Precio">
              <div className="Carrito-Boton-Cantidad">
                <button className="Carrito-Btn-Menos">-</button>
                <h3 className="Carrito-Cantidad">{prod.quantity}</h3>
                <button
                  className="Carrito-Btn-Mas"
                  onClick={() => handleMas(prod.id)}
                >
                  +
                </button>
              </div>

              <h2>{parseFloat(prod.price * prod.quantity).toFixed(2)}</h2>
              {/* {(compraTotal = compraTotal + prod.price * prod.quantity)} */}
            </div>
          </div>
        ))}
      <div className="Carrito-Total">
        <h2>Total</h2>
        <h2>{parseFloat(total).toFixed(2)}</h2>
      </div>
      <div className="Carrito-Comprar">
        <button className="Carrito-Continuar">Continuar compra</button>
      </div>
    </div>
  );
}

export default Carrito;
