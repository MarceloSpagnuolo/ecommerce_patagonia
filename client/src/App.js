import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import Home from "../src/Components/Home/home";
import { Route } from "react-router-dom";
import ProductDetails from "../src/Components/ProductDetails/index.js";
import ComponentFormFather from "../src/Components/FormAdmin/ComponentFormFather";
import CategoryView from "../src/Components/CategoryForm/CategoryView";
import Relationship from "../src/Components/AdminRelaciones/RelationshipViews";
import Carrito from "../src/Components/carrito/Carrito";
import orderDetail from "../src/Components/FormAdmin/orderDetail"
import TableOrders from "./Components/FormAdmin/tableOrders.js";

function App() {
  return (
    <>
      <Navegation />
      <Route path="/products" component={Catalogo} />
      <Route path="/admin/relations" component={Relationship} />
      <Route exact path="/about" />
      <Route exact path="/admin/products" component={ComponentFormFather} />
      <Route exact path="/categories" />
      <Route exact path="/admin/categories" component={CategoryView} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Carrito} />
      <Route exact path="/admin/order/:id"  component={orderDetail} />
      <Route exact path="/admin/order" component={TableOrders} />
    </>
  );
}

export default App;
