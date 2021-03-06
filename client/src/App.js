import React from 'react';
import Catalogo from '../src/Components/Catalogo/Catalogo.js';
import Navegation from '../src/Components/Navegation/index';
import Registro from '../src/Components/Registro/Registro';
import Home from '../src/Components/Home/home';
import { Route } from 'react-router-dom';
import ProductDetails from '../src/Components/ProductDetails/index.js';
import ComponentFormFather from '../src/Components/FormAdmin/ComponentFormFather';
import CategoryView from '../src/Components/CategoryForm/CategoryView';
import Relationship from '../src/Components/AdminRelaciones/RelationshipViews';
import Carrito from '../src/Components/carrito/Carrito';
import OrderDetails from '../src/Components/FormAdmin/orderDetail.js';
import TableOrders from './Components/FormAdmin/tableOrders.js';
import Admin from './Components/Admin/admin.js';
import TableUser from './Components/FormAdmin/TableUsers/tableUsers.js';
import Unauthorized from './Components/Unauthorized/unauthorized.js';
import Contacto from './Components/Contacto/contacto.js';
import Profile from './Components/Profile/Profile.js';
import ImageForm from './Components/Multer/Multer';
import PlaceOrderScreen from './Components/PlaceOrder/placeOrder.js';
import Success from "./Components/StatusPayment/success";
import Rejected from "./Components/StatusPayment/rejected"
import OrderUser from "./Components/Profile/orderDetailUsuario.js";

function App() {
  return (
    <>
      <Navegation />
      <Route exact path='/' component={Home} />
      <Route path='/products' component={Catalogo} />
      <Route path='/order/success' component={Success} />
      <Route path='/order/rejected' component={Rejected} />
      <Route exact path='/product/:id' component={ProductDetails} />
      <Route path='/admin/relations' component={Relationship} />
      <Route exact path='/admin/products' component={ComponentFormFather} />
      <Route exact path='/admin/categories' component={CategoryView} />
      <Route exact path='/admin/orders/:id' component={OrderDetails} />
      <Route exact path='/admin/orders' component={TableOrders} />
      <Route exact path='/categories' />
      <Route exact path='/cart' component={Carrito} />
      <Route exact path='/registro' component={Registro} />
      <Route exact path='/unauthorize' component={Unauthorized} />
      <Route exact path='/admin' component={Admin} />
      <Route exact path='/contacto' component={Contacto} />
      <Route exact path='/admin/users' component={TableUser} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/placeorder' component={PlaceOrderScreen} />
      <Route exact path='/as' component={ImageForm} />
      <Route exact path='/profile/orderdetail/:id' component={OrderUser} />
    </>
  );
}

export default App;
