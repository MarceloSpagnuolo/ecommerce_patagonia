import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard.js";
import "./Catalogo.css";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getCategories,
  getProductByCategory,
} from "../../store/actions/index";
import { Link } from "react-router-dom";
import axios from "axios";


function Catalogo(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state);
  const [categ, setCateg] = useState("");
  const [count, setCount] = useState(0);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    //Primero comprueba si estamos viendo productos por categoría
    if (props.history.location.pathname.includes("categoria")) {
      //Si es asi asigna a "categ" el nombre de la categoría
      const categ = props.history.location.pathname.split("/")[3];
      //Manda a llamar directamente la ruta que trae la cantidad de
      //productos es esa categoria
      axios.get("http://localhost:3001/products/count/" + categ)
        .then((res) => {
          //Setea en count la cantidad de productos de la categoría
          setCount(res.data.count);
        })
    } else {
      //Si no se están mostrando los productos por categoría, manda a llamar
      //la misma ruta pero con el prefijo "all" que indica que se necesita
      //que se cuenten todos los productos
      axios.get("http://localhost:3001/products/count/all")
        .then((res) => {
          //Setea count con todos los productos
          setCount(res.data.count);
        })
    }
  }, [categ]) //se ejecuta cuando categ cambia

  useEffect(() => {
    const page = props.location.search.split("=")[1];

    if (props.history.location.pathname.includes("categoria")) {
      const categ = props.history.location.pathname.split("/")[3];
      dispatch(getProductByCategory(categ, 12, (page - 1) * 12));
    } else if (props.history.location.pathname == "/products/search") {
    } else {
      dispatch(getProducts(12, (page - 1) * 12));
    }

    dispatch(getCategories());
    return function cleanup() { };
  }, [pagina, categ]); // Este useEffect se ejecuta cuando cambia la página

  function handleClick(cat) {
    setCateg(cat);
  }

  function handleClickAll() {
    setPagina(1);
    setCateg("");
  }

  function handleNext() {
    setPagina(pagina + 1);
  }

  function handlePrev() {
    setPagina(pagina - 1);
  }


  return (
    <div id="Catalogo-Container">
      {/* *                                                                                          */}

      <div className="preubaC">
        <div id="Catalogo-Lista-Container">
          <ul id="Catalogo-Lista-title">Categorias</ul>
          {categories &&
            categories.map((cat) => (
              <Link key={cat.id}
                className="catalogo-Link"
                to={`/products/categoria/${cat.name}/?page=1`}
                onClick={() => handleClick(cat.name)}
              >
                <div className="divCatalogoName">
                  <li className="Catalogo-Lista-Item">{cat.name}</li>
                  <div className="abvc"><svg id="cls23" data-name="cls23" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243.94 36.68"><defs><style></style></defs><path class="cls23" d="M168.72,5.15a238.63,238.63,0,0,1,38.35,4.32,139.83,139.83,0,0,1,18.67,5,67.85,67.85,0,0,1,9,3.85A29.59,29.59,0,0,1,238.94,21a12.58,12.58,0,0,1,1.93,1.81,5.22,5.22,0,0,1,1.34,2.82,3.28,3.28,0,0,1-.38,1.88,4.15,4.15,0,0,1-1.12,1.27,10.44,10.44,0,0,1-2.4,1.36,34.74,34.74,0,0,1-4.78,1.51c-3.18.77-6.38,1.3-9.57,1.76-6.39.91-12.8,1.48-19.2,2-12.82.92-25.65,1.37-38.49,1.58q-15.15.21-30.29.15c-10.1-.07-20.18-.09-30.3-.41C92.43,36.26,79.2,35.4,66,33.87S39.7,30.25,26.84,26.65a94.78,94.78,0,0,1-9.55-3.21,46.3,46.3,0,0,1-4.64-2.17,24.93,24.93,0,0,1-2.26-1.42,10,10,0,0,1-2.12-2,4.36,4.36,0,0,1-.77-1.71,3.15,3.15,0,0,1,.41-2.21A6.06,6.06,0,0,1,9,12.64c.38-.29.75-.61,1.14-.85a24.08,24.08,0,0,1,4.74-2.31,74.64,74.64,0,0,1,9.72-2.75C31.16,5.29,37.72,4.31,44.3,3.46S57.43,1.9,64.06,1.35c13.28-1,26.54-.53,39.74,0l39.6,1.75c6.61.3,13.21.76,19.81,1.31,3.29.29,6.59.57,9.87,1l9.86,1.18,9.85,1.19,4.92.59,4.91.73c6.54,1,13.07,2.14,19.55,3.55,4.25.92,8.47,2,12.65,3.25A64.64,64.64,0,0,1,241,18.06a21.23,21.23,0,0,1,5.82,3.46A5,5,0,0,1,248.61,25,2.91,2.91,0,0,1,247.8,27a5.94,5.94,0,0,1-1.5,1.17,24,24,0,0,1-6.39,2.17A112.55,112.55,0,0,1,227,32.25c-8.66.81-17.32,1.17-26,1.4s-17.32.28-26,.25q-26-.1-51.94-1.25c-17.31-.75-34.6-1.72-51.87-3.09-8.3-.66-16.59-1.4-24.86-2.33s-16.55-2-24.76-3.65A64.31,64.31,0,0,1,9.37,20.07a13.37,13.37,0,0,1-2.92-1.69A5.41,5.41,0,0,1,5.16,17a3.2,3.2,0,0,1-.44-2.23,4.15,4.15,0,0,1,.94-1.86,10.27,10.27,0,0,1,1.27-1.21A16.4,16.4,0,0,1,9.71,9.84,51.7,51.7,0,0,1,21.76,5.78c4.1-.92,8.23-1.61,12.36-2.17A398.89,398.89,0,0,1,75.45.73C89.33.38,103.22.35,117,.55c-17,1.67-35.09.28-52.42,2.1C52.22,4,39.7,5.07,27.37,7.26c-3.07.57-6.13,1.21-9.11,2a35.25,35.25,0,0,0-8.42,3.35c-.31.19-.59.4-.89.59s-.55.43-.81.65a3.29,3.29,0,0,0-1,1.23.59.59,0,0,0,0,.35A1.34,1.34,0,0,0,7.5,16,6.09,6.09,0,0,0,9,17.14a36.64,36.64,0,0,0,8.55,3,199.75,199.75,0,0,0,21.23,3.63c7.16.89,14.35,1.6,21.54,2.23,14.4,1.24,28.84,2.14,43.28,2.94,21.43,1.16,42.87,1.95,64.32,2.15,10.72.1,21.44.08,32.15-.18s21.42-.71,31.95-2c2.63-.34,5.23-.76,7.76-1.33a30.5,30.5,0,0,0,3.62-1.07A9.17,9.17,0,0,0,245,25.8a2.83,2.83,0,0,0,.89-.71s0,0,0-.05l0,0H246c.12,0-.13,0-.11,0a1.15,1.15,0,0,0-.07-.34,2.47,2.47,0,0,0-.66-1,11.47,11.47,0,0,0-2.81-2,44.39,44.39,0,0,0-7.13-2.93,145.94,145.94,0,0,0-15.4-4c-5.21-1.09-10.48-2-15.76-2.85-2.64-.41-5.28-.84-7.94-1.15l-8-.95L172.19,8c-10.65-1.06-21.33-1.85-32-2.24L104,4.28c-12-.42-24.11-.79-36.06-.09C62,4.55,55.94,5.25,50,5.94S38,7.48,32.13,8.53c-2.94.53-5.87,1.12-8.75,1.82A60.43,60.43,0,0,0,15,13a15.91,15.91,0,0,0-3.52,1.94,5.17,5.17,0,0,0-.64.57c-.07.06-.07.07-.08.09s0,0,0,0h0l-.1,0-.11,0h.05a.55.55,0,0,0,.18,0s0,0,0,.08a1.83,1.83,0,0,0,.31.47,11.84,11.84,0,0,0,3.11,2.26,40.08,40.08,0,0,0,3.91,1.84,115.9,115.9,0,0,0,17.06,5.12C41,26.61,46.92,27.69,52.86,28.6c11.87,1.81,23.86,3,35.88,3.71s24.05,1,36.13,1.09,24.14.1,36.21,0c13.24-.18,26.49-.35,39.72-.85,6.61-.27,13.22-.61,19.79-1.21,3.29-.31,6.57-.68,9.8-1.22,1.62-.27,3.23-.59,4.8-1a13.46,13.46,0,0,0,4.36-1.77,1.68,1.68,0,0,0,.87-1.6,3.85,3.85,0,0,0-1-1.93,17.12,17.12,0,0,0-3.7-3.1,55.62,55.62,0,0,0-8.81-4.47A127.48,127.48,0,0,0,208,10.26,204.3,204.3,0,0,0,168.72,5.15Z" transform="translate(-4.67 -0.43)" /></svg></div>
                </div>
              </Link>
            ))}
          <Link to="/products/?page=1">
            <button onClick={() => handleClickAll()} className="Catalogo-btn">
              Ver Todos
        </button>
          </Link>
        </div>
      </div>

      {/* *                                                                                          */}
      <div className="Catalogo-Products-Pagination">
        <div id="Catalogo-ProductCard-Container">

          {props.products.length > 0 && props.products.map((prod) => (
            <div key={prod.id}>

              <ProductCard
                id={prod.id}
                name={prod.name}
                thumbnail={prod.thumbnail}
                stock={prod.stock}
                price={prod.price}
                volume={prod.volume}
                categorias={prod.categories}
              ></ProductCard>

            </div>
          ))}

        </div>
        <div className="Catalago-Pagination">
          <Link to={`${props.history.location.pathname}?page=${pagina - 1}`}>
            <button className="Catalogo-Btn-Prev" onClick={() => handlePrev()}
              disabled={pagina === 1}>Anterior</button>
          </Link>
          <Link to={`${props.history.location.pathname}?page=${pagina + 1}`}>
            <button className="Catalogo-Btn-Next" onClick={() => handleNext()}
              disabled={(pagina * 12) >= count}>Siguiente</button>
          </Link>
        </div>
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
    getProducts: (limit, offset) => dispatch(getProducts(limit, offset)),
    getCategories: () => dispatch(getCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
