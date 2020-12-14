import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import Home from "../src/Components/Home/home"
import { Route } from 'react-router-dom';
import ProductDetails from "../src/Components/ProductDetails/index.js"
import ComponentFormFather from "../src/Components/FormAdmin/ComponentFormFather"
import CategoryView from "../src/Components/CategoryForm/CategoryView"
import Relationship from "../src/Components/AdminRelaciones/RelationshipViews"

function App() {
  return (
    <>
      <Navegation />
      <Route path="/products" component={Catalogo} />
      <Route path="/rs" component={Relationship} />
      <Route exact path="/about" />
      <Route exact path="/admin" component={ComponentFormFather} />
      <Route exact path="/categories" />
      <Route exact path="/cat" component={CategoryView} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/" component={Home} />
    </>
  );
}

export default App;