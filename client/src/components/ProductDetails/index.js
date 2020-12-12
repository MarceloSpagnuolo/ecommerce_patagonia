import React from "react";
import { useState } from "react";
import "./style.css";
import { connect } from "react-redux";

const Product = (props) => {
  const [count, setCount] = useState(1);
  console.log(props.location.state.prod)


  return (
    <>
      <div className="contenido">
        <h3 id="Product-Name">{props.location.state.prod.name || "Product Name"}</h3>

        <img
          className="item-image"
          src={props.location.state.prod.thumbnail} alt="Imagen Aquí">
        {/*   src="https://image.shutterstock.com/image-vector/image-not-found-grayscale-photo-600w-1737334631.jpg"
           alt="Imagen Aquí" */}
        </img>

        <p id="Description">{props.location.state.prod.description || "Product Description"}</p>

           <div id="Precio-Container">
        <h5 id="Precio">Total: ${props.location.state.prod.price * count}</h5>
        <h5 id="Precio">Precio Unitario: ${props.location.state.prod.price}</h5>
        </div>

        <div className="SubContainer">
          <button className="button">Agregar al carrito</button>
   
            <button
              className="button"
              id="Sumar-Restar"
              onClick={() => {
                count > 1 && setCount(count - 1);
              }}
            >
              -
            </button>

            
            <span>Cantidad: {count}</span>
            

            <button
              className="button"
              id="Sumar-Restar"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
          
          <button
            className="button"
            type="button"
            color="primary"
            onClick={() => alert("click")}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, null)(Product);
