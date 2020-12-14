import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { connect } from "react-redux";
import { getProductById } from '../../store/actions/index.js';
import { useHistory } from "react-router-dom";

const Product = (props) => {
  const [count, setCount] = useState(1);
  const history = useHistory();

  useEffect(() => {
    props.match.params.id && props.getProductById(props.match.params.id)
    return function cleanup() { };
  }, []);


  return (
    <>
      <div className="contenido">
        <h3 id="Product-Name">{props.products.name || "Product Name"}</h3>

        <img
          className="item-image"
          src={props.products.thumbnail} alt="Imagen Aquí">
          {/*   src="https://image.shutterstock.com/image-vector/image-not-found-grayscale-photo-600w-1737334631.jpg"
           alt="Imagen Aquí" */}
        </img>

        <p id="Description">{props.products.description || "Product Description"}</p>

        <div id="Precio-Container">
          <h5 id="Precio">Total: ${props.products.price * count}</h5>
          <h5 id="Precio">Precio Unitario: ${props.products.price}</h5>
        </div>

        <div className="SubContainer">
          <button className="productDetail-button" id="productDetailCarrito">Agregar al carrito</button>

          <button
            className="productDetail-button"
            id="Sumar-Restar"
            onClick={() => {
              count > 1 && setCount(count - 1);
            }}
          >
            -
            </button>


          <span>Cantidad: {count}</span>


          <button
            className="productDetail-button"
            id="Sumar-Restar"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
            </button>

          <button
            className="productDetail-button"
            type="button"
            color="primary"
            onClick={() => history.goBack()}
          >
            Volver
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

function mapDispatchToProps(dispatch) {
  return {
    getProductById: (id) => dispatch(getProductById(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
