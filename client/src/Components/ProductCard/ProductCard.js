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
        {/* <Link target="_blank" to={`/products/${props.id}`}> */}
        <img id="ProductCard-Img" src={props.thumbnail} alt="Imagen aquí"></img>
        {/*  </Link> */}
      </div>
      <div className="ProductCard-Props">
        {/* <Link target="_blank" to={`/products/${props.id}`}> */}
        <h3 id="ProductName">{props.name}</h3>
        {/* </Link> */}
        <span>{props.volume}</span>
        <h5 id="ProductPrecio">${props.price}</h5>
      </div>
    </div>
  );
}
