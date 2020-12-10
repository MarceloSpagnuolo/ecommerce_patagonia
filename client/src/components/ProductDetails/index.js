import React, { Fragment } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style.css";

//import findCurrentItem from

const Product = ({ titulo, descripcion, referencia, precio, cantidad }) => {
  const [count, setCount] = useState(0);

  var sumar = function () {
    setCount(count + 1);
  };
  var restar = function () {
    if (count > 0) return setCount(count - 1);
  };

  var handleclick = function () {};

  //const { id } = match.params;
  const image =
    "https://www.thegourmetjournal.com/wp-content/uploads/2020/08/Cerveza.jpg";
  return (
    <Fragment>
      <div className="contenido">
        <div>
          <h3 className="Texto">{`Product Name Here` || `${titulo}`}</h3>

            <div id="img-container">
            <img
            className="item-image"
            src={image}
          />
            </div>
          
          {/* <img src="linkdel.com" className="item-image"></img> */}

          <p className="Texto">{`description Here` || `${descripcion}`}</p>

          <h5 className="Texto">{`Precio Aca` || `${precio}`}</h5>

          <div className="SubContainer">
            <button className="button">Agregar al carrito</button>
            <div>Unidades
              <button
                className="button"
                onClick={() => {
                  restar();
                }}
              >
                -
              </button>
              {count}

              <button
                className="button"
                onClick={() => {
                  sumar();
                }}
              >
                +
              </button>

                                
              </div>
              <Link exact to={"/"}>
              <button
                className="button2"
                type="button"
                // color="primary"
                onClick={() => handleclick}
              >
                Back
              </button>
              </Link>
            </div>
          
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, null)(Product);
