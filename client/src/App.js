import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import Home from "../src/Components/Home/home"
import { Route } from 'react-router-dom';
import ProductDetails from "../src/Components/ProductDetails/index.js"
import ComponentFormFather from "../src/Components/FormAdmin/ComponentFormFather"
import CategoryView from "../src/Components/CategoryForm/CategoryView"

function App() {
  return (
    <React.Fragment>
      <Navegation />
      <Route path={"/products"} component={Catalogo} />
      <Route exact path="/about" />
      <Route exact path="/admin" component={ComponentFormFather} />
      <Route exact path="/categories" />
      <Route exact path="/cat" component={CategoryView} />
      <Route exact path={[`/product/:id`]} component={ProductDetails} />
      <Route exact path="/" component={Home} />
    </React.Fragment>
  );
}

export default App;