import React from "react";
import "./ProductCard.css";

export default function ProductCard() {
    return (
      <div id="ProductCard-Container">
        <img
          id="ProductCard-Img"
          src="https://cdn.shopify.com/s/files/1/1103/5152/products/preview-full-Patagonia_Amber_Lager_1000_x_2048_efb25f80-f87e-49c5-b9d0-8fd0b647a30b_600x.jpg?v=1559755721"
        alt="Imagen aquí"></img>
        <div>
          <h4 id="ProductName">Product Name</h4>
          <span>Ranking</span>
    <h5 id="ProductPrecio">Precio</h5>
        </div>
      </div>
    );
  }