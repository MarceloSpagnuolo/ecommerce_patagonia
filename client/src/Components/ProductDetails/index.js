import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { postProductToCart, getProductById, getReviews } from '../../store/actions/index.js';
import { useHistory } from "react-router-dom";
import ReviewStars from "../Review/ReviewStarts";
import UserReview from "../Review/UserReview";
import NewReview from "../Review/NewReview";
import SliderPCard from "./SliderPCard";


const Product = (props) => {
  const [count, setCount] = useState(1);
  const [n, setN] = useState(0);
  const [a, setA] = useState(false)
  const [r, setR] = useState("")
  const [edite, setEdite] = useState(false)
  const [neview, setNeview] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();
  const { order, reviews, user } = useSelector(state => state);
  useEffect(() => {
    props.match.params.id && props.getProductById(props.match.params.id)
    dispatch(getReviews())
    return function cleanup() { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const review = !!reviews && reviews.length > 0 && reviews.filter((r) => r.productId === props.products.id)
    const rev = !!reviews && reviews.length > 0 && reviews.filter(r => user.id === r.userId && props.products.id === r.productId);

    let num = 0;
    !!review && review.length > 0 && review.forEach(m => {
      return num = parseInt(m.rate) + num
    })
    const final = num / review.length;
    setN(final)
    setR(rev)
    if (final > 0) setA(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews])

  function addCart() {
    dispatch(postProductToCart(order.id, props.products.id, { unitprice: props.products.price, quantity: count }));
    alert("Producto agregado al carrito");
    history.goBack();
  }



  return (
    <>
      <div className="contenido">
        <h3 id="Product-Name"><span className="beerName">{props.products.name || "Product Name"}</span>{/*<img src="https://cdn.discordapp.com/attachments/764979688446885898/792633765402509362/trazo1.gif"/>*/}</h3>
        <svg id={props.products.name && props.products.name.length > 12 ? "Capita" : "Capa_1"} data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352.7 53.45"><defs><style></style></defs><polygon className="cls-1" points="350.82 47.94 2.75 50.35 2.75 3.22 348.9 0.5 350.82 47.94" /><polygon className="cls-1" points="352.15 2.69 0.54 0.5 4.62 52.95 347.54 50.36 352.15 2.69" /></svg>
        <div className="container-img-p">
          <SliderPCard id={props.products.id} image={props.products.thumbnail} />
          <div id="Description">
            {props.products.stock === 0 && (<h3 id="ProductDetail-NoDisponible">No disponible</h3>)}
            <h2>Informacion sobre producto</h2>
            <p>{props.products.description || "Product Description"}</p>
          </div>
          <div className="starts">

            {a ? <ReviewStars rate={n} size={50} /> : null}
          </div>
          <div id="Precio-Container">
            <h5 id="Precio">Precio Unitario: ${props.products.price}</h5>
            <h5 id="Precio">Total: ${props.products.price * count}</h5>
          </div>
        </div>
        <div className="SubContainer">
          <button
            className="productDetail-button"
            type="button"
            color="primary"
            id="backDetail"
            onClick={() => history.goBack()}
          >
            Volver
          </button>
          <div className={props.products.stock > 0 ? "cuadroCantidad" : "errDiv"}>
            <button
              className="buttonCart"
              disabled={props.products.stock === 0}
              id="Sumar-Restar-"
              onClick={() => {
                count > 1 && setCount(count - 1);
              }}
            >
              -
            </button>
            <span className="numCart">{count}</span>
            <button
              className="buttonCart"
              id="Sumar-RestarM"
              disabled={props.products.stock === 0}
              onClick={() => {
                count < props.products.stock && setCount(count + 1);
              }}
            >
              +
            </button>
          </div>
          <button onClick={() => addCart()}
            className="productDetail-button"
            disabled={props.products.stock === 0} id="addToCart">Agregar al carrito</button>
        </div>
      </div>
      <div className="addComent">
        {user.role !== "admin" &&  user.role !== "user" ? null :
          !!r[0] && r[0].id ?
            <button className="addComentAction" onClick={() => { setEdite(!edite) }}>Edite su comentario</button>
        : <button className="addComentAction" onClick={() => { setNeview(!neview) }}>Escriba su comentario</button>
      }

      {neview ? <div className="div-newReview"><NewReview set={setNeview} id={props.products.id} /> </div> : null}
      {edite ? <div className="div-newReview"><NewReview set={setEdite} data={ r[0]} id={props.products.id} /> </div> : null}


      </div>
      <UserReview id={props.products.id} />
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