import React from "react";
import obj from "./ObjetoTemporal.js";
// import ProductCard from "../../Components/ProductCard/ProductCard.js"
import "./Catalogo.css";

export default function Catalogo() {
  return (
    <div id="Catalogo-Container">
      <div id="Catalogo-Lista-Container">
        <lu id="Catalogo-Lista">Categories</lu>
        <li className="Catalogo-Lista-Item" style={{marginTop:30}}>Category</li>
        <li className="Catalogo-Lista-Item">Category</li>
        <li className="Catalogo-Lista-Item">Category</li>
        <button className="Catalogo-btn">Browse All</button>
      </div>

      <div >
        {obj &&
          obj.map((PC) => (
            <div>
              {/* <ProductCard></ProductCard> */}
              <img src={PC.thumbnail} alt="imagen aquí" id="ProductCard-Img"></img>
              <h3>{PC.name}</h3>
              <h5>Rating</h5>
              <h6>{PC.price}</h6>
            </div>
          ))}
      </div>
    </div>
  );
}
