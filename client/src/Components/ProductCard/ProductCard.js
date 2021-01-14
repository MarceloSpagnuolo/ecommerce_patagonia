import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postProductToCart } from "../../store/actions/index";

/* Componente básicamente terminado salvo por el rating. el CSS es bastante estable y adaptable,
por lo cual no debería traer mayores problemas a la hora de adaptarlo con las props reales 
de la database */

export default function ProductCard(props) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  function agregaCarrito(orderId, prodId, unitprice, quantity) {
    let flag = true
    !!order.products &&
      order.products.forEach((el) => {
        if (el.id === props.id) {
          if (props.stock <= el.Order_products.quantity) {
            flag = false;
            alert("Stock Insuficiente");
          }
        }
      });
        if (flag) {
          dispatch(postProductToCart(orderId, prodId, { unitprice, quantity }));
        }

  }

  return (
    <div id="ProductCard-Container">
      <div id="ProductCard-Img-Container">
        <Link className="catalogo-Link" to={`/product/${props.id}`}>
          <img
            id="ProductCard-Img"
            src={props.thumbnail}
            alt="Imagen aquí"
          ></img>
        </Link>
        <div className="gfd">
          {props.categorias &&
            props.categorias.map((elem) => (
              <span
                key={elem.name}
                id={elem.name.replace(" ", "_")}
                className="nameCategorias"
              >
                {elem.name.replace("Edicion", "")}
              </span>
            ))}
        </div>
      </div>
      <div className="ProductCard-Props">
        <Link className="catalogo-Link" to={`/product/${props.id}`}>
          <h3 id={props.name.length > 7 ? "ProductName" : "PnameLitle"}>
            {props.name}
          </h3>
        </Link>
        {props.stock === 0 && (
          <h4 id="ProductCart-NoDisponible">No Disponible</h4>
        )}
        <span className={props.name.length > 7 ? "vol-pc" : "vol-lc"}>
          {props.volume}
        </span>
        <div id="ProductCard-btnContainer">
          <h5 id="ProductPrecio">${props.price}</h5>
          <button
            onClick={
              props.stock === 0
                ? null
                : () => agregaCarrito(order.id, props.id, props.price, 1)
            }
            id="ProductCard-btnAddCarr"
            className={props.stock === 0 ? "sinStock" : ""}
          >
            {props.stock === 0 ? "Sin Stock" : " Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
