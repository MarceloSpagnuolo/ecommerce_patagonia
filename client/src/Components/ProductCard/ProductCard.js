import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

/* Componente básicamente terminado salvo por el rating. el CSS es bastante estable y adaptable,
por lo cual no debería traer mayores problemas a la hora de adaptarlo con las props reales 
de la database */

export default function ProductCard(props) {
  return (
    <div id="ProductCard-Container">
      <div id="ProductCard-Img-Container">
        <img id="ProductCard-Img" src={props.thumbnail} alt="Imagen aquí"></img>
      </div>
      <div className="ProductCard-Props">
        <h3 id="ProductName">{props.name}</h3>
        {props.stock === 0 && (<h4 id="ProductCart-NoDisponible">No Disponible</h4>)}
        <span>{props.volume}</span>
        <div id="ProductCard-btnContainer">
          <h5 id="ProductPrecio">${props.price}</h5>
          <h5 
            id={props.stock === 0 ? "ProductCard-btnAddCarr-Disabled" :"ProductCard-btnAddCarr"}>
            Agregar al carrito</h5>
        </div>
      </div>
    </div>
  );
}
