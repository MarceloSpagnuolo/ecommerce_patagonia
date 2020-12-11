import React from "react";
import "./ProductCard.css";

/* Componente básicamente terminado salvo por el rating. el CSS es bastante estable y adaptable,
por lo cual no debería traer mayores problemas a la hora de adaptarlo con las props reales 
de la database */

export default function ProductCard(props) {
  return (
    <div>
      <div id="ProductCard-Img-Container">
        <img id="ProductCard-Img" src={props.thumbnail} alt="Imagen aquí"></img>
      </div>
      <div className="ProductCard-Container">
        <h4 id="ProductName">{props.name}</h4>
        <span>{props.volume}</span>
        <h5 id="ProductPrecio">${props.price}</h5>
      </div>
    </div>
  );
}
