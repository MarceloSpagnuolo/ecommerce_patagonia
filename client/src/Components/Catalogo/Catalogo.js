import React, { useEffect, useState } from "react";
import obj from "./ObjetoTemporal.js";
import ProductCard from "../ProductCard/ProductCard.js";
import "./Catalogo.css";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../store/actions/index";

/* Componente a medio terminar. El CSS de ProductCard es necesario para que se vea bien la Card a la hora
de renderizar. el CSS de categorías es un poco inestable y es necesario modificarlo cuando se pasen props,
pero por ahora no quiero renegar mucho más, ya que no tengo idea cuantas categorías van a haber.
El código y la lógica funcionan bien, salvo por la falta de props en la parte de categorías.*/

export function Catalogo(props) {
  useEffect(() => {
    props.getProducts();
    return clearInterval();
  }, []);

  return (
    <div id="Catalogo-Container">
      <div id="Catalogo-Lista-Container">
        <lu id="Catalogo-Lista">Categories</lu>
        <li className="Catalogo-Lista-Item" style={{ marginTop: 30 }}>
          Category
        </li>
        <li className="Catalogo-Lista-Item">Category</li>
        <li className="Catalogo-Lista-Item">Category</li>
        <button className="Catalogo-btn">Browse All</button>
      </div>

      <div id="Catalogo-ProductCard-Container">
        {props.products.map((PC) => (
          <div>
            <ProductCard
              name={PC.name}
              thumbnail={PC.thumbnail}
              price={PC.price}
              volume={PC.volume}
            ></ProductCard>
          </div>
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
