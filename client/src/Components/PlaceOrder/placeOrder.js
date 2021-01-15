import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './placeOrder.css';
import { postProductStock, updateOneOrder, updateUser, getUserByToken, cancelOrder } from "../../store/actions/index.js";
import axios from "axios";
import { useHistory } from "react-router-dom"

export default function PlaceOrderScreen() {
  const { order, user } = useSelector(state => state);
  const [ total, setTotal ] = useState(0);
  const [ edit, setEdit ] = useState(false);
  const [ mount, setMount ] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ User, setUser ] = useState({
    id: user.id,
      givenname: user.givenname,
      familyname: user.familyname,
      adress: user.adress,
      email: user.email,
      city: user.city,
      phone: user.phone,
      postal: user.postal
  })
  var usuario;

  useEffect(() => {
    usuario = localStorage.getItem("guestUser");
    if (usuario) {
      alert("Debe ser un usuario registrado para realizar la compra");
      window.location.href = "/"
    } else {
    if(order.products && order.products.length > 0) {
      var temporal = 0;
      order.products.map((elem) => {
        temporal += elem.Order_products.quantity * elem.Order_products.unitprice;
      })
      setMount(temporal)
      dispatch(updateOneOrder(order.id, {total: temporal, date: Date.now(), status: "creada"}));
      order.products.map((elem) => {
        dispatch(postProductStock(elem.id,
          {quantity: elem.Order_products.quantity, orderId: order.id }))
        })
    }
  }
  //ºlocalStoragesetItem("createOrder",)
  },[])  

  useEffect(() => {
    if (order.products && order.products.length > 0) {
      let subTotal = 0;
      let temporal = 0;
      order.products.map((elem) => {
        subTotal += elem.Order_products.quantity;
        temporal += elem.Order_products.quantity * elem.Order_products.unitprice;
      })
      setTotal(subTotal);
      setMount(temporal);
      localStorage.setItem("OrderCreated", JSON.stringify(order));
    }
  },[order])

    const toPayment = async (id) => {
      localStorage.removeItem("OrderCreated");
      const { data } = await axios.post(`http://localhost:3001/mepa/checkout/${id}`);
      window.location = data.redirect;
    }

    async function handleCambios(e) {
      e.preventDefault();
      dispatch(updateUser(user.id, User));
      const res = await axios.get(`http://localhost:3001/auth/me`);
      dispatch(getUserByToken(res.data));
      setEdit(false);
    }

    function handleCancel() {
      let respuesta = window.confirm("¿Realmente desea cancelar la compra?");
      if (respuesta) {
        localStorage.removeItem("OrderCreated");
        dispatch(cancelOrder(order.id));
        window.location.href = "/"
      }
    }

    function handleChange(e) {
      setUser({
        ...User,
        [e.target.name]: e.target.value
      })
    }

  return ( !usuario ?
    <div>
      <div className='order top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Envio</h2>
                { edit ? <form>
                  <div>
                    <label for="name">Usuario</label><br />
                    <input className="Place-Input" defaultValue={user.givenname+" "+user.familyname} readonly="true" name="name" type="text" />
                  </div>
                  <div>
                    <label for="adress">Dirección *</label><br />
                    <input onChange={(e) => handleChange(e)} className="Place-Input" defaultValue={user.adress} name="adress" type="text" required
                    title="Debe ingresar una dirección válida" />
                    
                  </div>
                  <div>
                    <label for="city">Ciudad *</label><br />
                    <input onChange={(e) => handleChange(e)} className="Place-Input" defaultValue={user.city} name="city" type="text" required />
                  </div>
                  <div>
                    <label for="phone">Teléfono *</label><br />
                    <input onChange={(e) => handleChange(e)} className="Place-Input" defaultValue={user.phone} name="phone" type="tel"
                      pattern="[0-9]{2,4} [0-9]{2,4}[-][0-9]{4}"
                      title="Ej: 11 9999-9999" required />
                  </div>
                  <div>
                    <label for="postal">Código Postal *</label><br />
                    <input onChange={(e) => handleChange(e)} className="Place-Input" defaultValue={user.postal} name="postal" type="text" required />
                  </div>
                  <div>
                    <button className="Order-Confirmar" onClick={(e) => handleCambios(e)} type="submit"
                    disabled={!User.adress || !User.city || !User.phone || !User.postal}>Confirmar cambios</button>
                  </div>
                </form> :
                <div className="Order-Datos">
                    <div>
                    <strong>
                      Nombre: {user.givenname} {user.familyname}
                    </strong>
                    <br />
                    <strong>Dirección: {user.adress}</strong>
                    <br />
                    <span>Ciudad: {user.city}</span>
                    <br />
                    <span>Código Postal: {user.postal}</span>
                    <br />
                    <span>Teléfono: {user.phone}</span>
                  </div>
                  <div>
                    <button onClick={() => setEdit(true)} className='Order-Confirmar'>Completar o Editar Información</button>
                  </div>

                </div>}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Productos</h2>
                <ul>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((prod) => (
                      <li key={prod.id} className="Order-Products-List">
                        <div className="Order-Products">
                          <div>
                            <div className="Order-Imagen-Container">
                              <img
                                className='Order-Imagen'
                                src={prod.thumbnail}
                                alt={prod.name}
                              ></img>
                            </div>
                          </div>
                          <div className="Order-Detail-Container">
                            <h3 className="Order-Product-Name">
                            {prod.name} {prod.volume}
                            </h3>
                            <span>{prod.appearance}</span>
                            <br />
                            <span>Cantidad: {prod.Order_products.quantity}</span>
                            <br />
                            <span>Precio unitario: $ {parseFloat(prod.Order_products.unitprice).toFixed(2)}</span>
                          </div>
                          <div classname="Order-Total-Container">
                            <h3>Total</h3>
                            <span>
                              $ {parseFloat(prod.Order_products.quantity * prod.Order_products.unitprice).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <h4>Cargando...</h4>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Resumen Compra</h2>
              </li>
              <li>
                <div className='order'>
                  <div>
                    <strong>Productos({total})</strong>
                  </div>
                  <div className='order'>
                    <strong>$ {parseFloat(mount).toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <div className="Checkout-Botones">
                <button className='Order-Confirmar' onClick={() => handleCancel()}>
                  Cancelar compra
                </button>
                <button type="submit" className='Order-Confirmar' type='button'
                disabled={!user.adress || !user.city || !user.phone || !user.postal}
                onClick={() => toPayment(order.id)}
                title={!user.adress || !user.city || !user.phone || !user.postal ? 
                  "Debe completar los datos de usuario" : null}>
                  Confirmar Compra
                </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
   : null );
}
