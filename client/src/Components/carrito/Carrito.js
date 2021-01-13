import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  delProductToCart,
  postProductToCart,
  emptyAllProductsOfCart,
} from '../../store/actions';
import './Carrito.css';

function Carrito() {
  const [total, setTotal] = useState(0);
  const { order } = useSelector((state) => state);
  console.log(order);
  const dispatch = useDispatch();
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [produ, setProdu] = useState({});
  const [cart, setCart] = useState(0);

  useEffect(() => {
    var cal = 0;
    if (order.products) {
      order.products.map((prod) => {
        cal += prod.Order_products.unitprice * prod.Order_products.quantity;
      });
    }
    setTotal(cal);
  }, [order]);

  // useEffect(() => {
  //     dispatch(getCartByUser(idUserCurrent))
  //     !order && order.length === 0 && dispatch(postCreateCart(idUserCurrent))
  // },[]);
  function handleCantidad(orderId, prodId, unitprice, quantity) {
    dispatch(postProductToCart(orderId, prodId, { unitprice, quantity }));
  }

  function deleteProduct(orderId, prodId, prodName, prodVol) {
    setProdu({ orderId, prodId, prodName, prodVol });
    setModal1(true);
  }

  function confirmDelProd() {
    dispatch(delProductToCart(produ.orderId, produ.prodId));
    setModal1(false);
  }

  function cancelDelProd() {
    setModal1(false);
  }

  function emptyCart(orderId) {
    setCart(orderId);
    setModal2(true);
  }

  function confirmEmptyCart() {
    dispatch(emptyAllProductsOfCart(cart));
    setModal2(false);
  }

  function cancelEmptyCart() {
    setModal2(false);
  }

  return (
    <div className='Carrito-Container'>
      <h1>Carrito de Compras</h1>

      {order.products && order.products.length > 0 ? (
        order.products.map((prod) => (
          <div className='Carrito-Producto'>
            <button
              className='Carrito-Btn-Cancel'
              onClick={() =>
                deleteProduct(order.id, prod.id, prod.name, prod.volume)
              }
            >
              X
            </button>
            <div className='Carrito-Detalles'>
              <div>
                <img
                  className='Carrito-Imagen'
                  src={prod.thumbnail}
                  alt='img-carrito'
                ></img>
              </div>
              <div>
                <h3>
                  {prod.name} {prod.volume}
                </h3>
                <h4>{prod.description}</h4>
              </div>
            </div>

            <div className='Carrito-Cantidad-Precio'>
              <div className='Carrito-Boton-Cantidad'>
                <button
                  className='Carrito-Btn-Menos'
                  onClick={() =>
                    handleCantidad(
                      order.id,
                      prod.id,
                      prod.Order_products.unitprice,
                      -1
                    )
                  }
                  disabled={prod.Order_products.quantity === 1}
                >
                  -
                </button>
                <h3 className='Carrito-Cantidad'>
                  {prod.Order_products.quantity}
                </h3>
                <button
                  className='Carrito-Btn-Mas'
                  onClick={() =>
                    handleCantidad(
                      order.id,
                      prod.id,
                      prod.Order_products.unitprice,
                      1
                    )
                  }
                >
                  +
                </button>
              </div>

              <h2>
                {parseFloat(
                  prod.Order_products.unitprice * prod.Order_products.quantity
                ).toFixed(2)}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <h1>Su Carrito de compras no contiene productos</h1>
      )}
      <div className='Carrito-Total'>
        <h2>Total</h2>
        <h2>{parseFloat(total).toFixed(2)}</h2>
      </div>
      <div className='Carrito-Comprar'>
        <button
          onClick={() => emptyCart(order.id)}
          className='Carrito-Continuar'
          disabled={order.products && order.products.length === 0}
        >
          Vaciar carrito
        </button>
        <button
          className='Carrito-Continuar'
          disabled={order.products && order.products.length === 0}
        >
          Continuar compra
        </button>
      </div>
      <div className='Modal-Container' id={modal1 ? 'modal1' : null}>
        <div className='Modal-Content'>
          <header className='Modal-Header'>Eliminar un producto</header>
          <section className='Modal-Section'>
            <img
              src='http://localhost:3001/images/question.png'
              className='Modal-Imagen'
              alt='img-pregunta'
            />
            <h3>
              ¿ Quiere Eliminar la {produ.prodName} de {produ.prodVol} ?
            </h3>
          </section>
          <footer className='Modal-Footer'>
            <button className='Modal-Botones' onClick={() => cancelDelProd()}>
              Cancelar
            </button>
            <button className='Modal-Botones' onClick={() => confirmDelProd()}>
              Eliminar
            </button>
          </footer>
        </div>
      </div>
      <div className='Modal-Container' id={modal2 ? 'modal1' : null}>
        <div className='Modal-Content'>
          <header className='Modal-Header'>Vaciar el Carrito</header>
          <section className='Modal-Section'>
            <img
              src='http://localhost:3001/images/exclamation.png'
              className='Modal-Imagen'
              alt='img-exclamacion'
            />
            <div className='Modal-Leyenda'>
              <h3>Está por vaciar completamente su carrito</h3>
              <h3>¿ Desea continuar ?</h3>
            </div>
          </section>
          <footer className='Modal-Footer'>
            <button className='Modal-Botones' onClick={() => cancelEmptyCart()}>
              Cancelar
            </button>
            <button
              className='Modal-Botones'
              onClick={() => confirmEmptyCart()}
            >
              Vaciar Carrito
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
