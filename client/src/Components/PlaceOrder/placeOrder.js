import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../shipping/CheckoutSteps';
import './placeOrder.css';

export default function PlaceOrderScreen() {
  const { order, user } = useSelector(state => state);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    if (order.products && order.products.length > 0) {
      let subTotal = 0;
      order.products.map((elem) => {
        subTotal += elem.Order_products.quantity;
      })
      setTotal(subTotal);
    }
  },[order])  

  return (
    <div>
      <div className='order top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Envio</h2>
                <form>
                  <div>
                    <label for="name">Usuario</label><br />
                    <input readonly="true" name="name" type="text" />
                  </div>
                  <div>
                    <label for="adress">Dirección *</label><br />
                    <input name="adress" type="text" required
                    title="Debe ingresar una dirección válida" />
                    
                  </div>
                  <div>
                    <label for="city">Ciudad *</label><br />
                    <input name="city" type="text" required />
                  </div>
                  <div>
                    <label for="phone">Teléfono *</label><br />
                    <input name="phone" type="tel"
                      pattern="[0-9]{2,4} [0-9]{2,4}[-][0-9]{4}"
                      title="Ej: 11 9999-9999" required />
                  </div>
                  <div>
                    <button type="submit">Aceptar</button>
                  </div>
                </form>
                <p>
                  <strong>
                    Nombre: {user.givenname} {user.familyname}
                  </strong>
                  <br />
                  <strong>Dirección: {user.address}</strong>
                  <br />
                  <span>Ciudad:  {user.city}</span>
                  <br />
                  <span>Código Postal:{user.postal}</span>
                  <br />
                  <span>Teléfono: {user.phone}</span>
                  <br />
                </p>
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
                    <strong>$</strong>
                  </div>
                </div>
              </li>
              <li>
                <button type="submit" className='Order-Confirmar' type='button'
                disabled={!user.adress || !user.city || !user.phone || !user.postal}
                title={!user.adress || !user.city || !user.phone || !user.postal ? 
                  "Debe completar los datos de usuario" : null}>
                  Confirmar Compra
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
