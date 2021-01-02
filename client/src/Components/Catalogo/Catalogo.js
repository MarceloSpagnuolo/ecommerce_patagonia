import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard.js";
import "./Catalogo.css";
import {connect, useDispatch, useSelector } from "react-redux";
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
  const [ categ, setCateg ] = useState("");
  const [ count, setCount] = useState(0);
  const [ pagina, setPagina ] = useState(1);

  useEffect(() => {
    //Primero comprueba si estamos viendo productos por categoría
    if(props.history.location.pathname.includes("categoria")) {
      //Si es asi asigna a "categ" el nombre de la categoría
      const categ = props.history.location.pathname.split("/")[3];
      //Manda a llamar directamente la ruta que trae la cantidad de
      //productos es esa categoria
      axios.get("http://localhost:3001/products/count/"+categ)
      .then((res) => {
        //Setea en count la cantidad de productos de la categoría
        setCount(res.data.count);
      })
    } else if (props.history.location.pathname == "/products/search") {
        setCount(props.products.length)
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
  },[categ,props.location.search]) //se ejecuta cuando categ cambia

  useEffect(() => {
    const page = props.location.search.split("=")[1];

    if(props.history.location.pathname.includes("categoria")) {
      const categ = props.history.location.pathname.split("/")[3];
      dispatch(getProductByCategory(categ,12,(page-1)*12));
    } else if (props.history.location.pathname == "/products/search") {
    } else {
      dispatch(getProducts(12,(page-1)*12));
    }
    page && setPagina(parseInt(page))
    
    dispatch(getCategories());
    return function cleanup() {};
  }, [pagina, categ, props.location.search]); // Este useEffect se ejecuta cuando cambia la página

function handleClick(cat) {
  setCateg(cat);
  setPagina(1);
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
    <div id="Catalogo-Lista-Container">
      <ul id="Catalogo-Lista">Categorias</ul>
      {categories &&
        categories.map((cat) => (
          <Link key={cat.id}
            className = "catalogo-Link"
            to={`/products/categoria/${cat.name}/?page=1`}
            onClick={() => handleClick(cat.name)}
          >
            <li className="Catalogo-Lista-Item">{cat.name}</li>
          </Link>
        ))}
      <Link to="/products/?page=1">
        <button onClick={() => handleClickAll()} className="Catalogo-btn">
          Ver Todos
        </button>
      </Link>
    </div>
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
      <Link to={`${props.history.location.pathname}?page=${pagina-1}`}>
          <button className="Catalogo-Btn-Prev" onClick={() => handlePrev()}
          disabled={pagina === 1}>Anterior</button>
      </Link>
      <Link to={`${props.history.location.pathname}?page=${pagina+1}`}>
          <button className="Catalogo-Btn-Next" onClick={() => handleNext() }
          disabled={(pagina*12) >= count}>Siguiente</button>
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
