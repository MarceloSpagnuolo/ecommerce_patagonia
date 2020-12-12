import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import {Route} from 'react-router-dom';
import ProductDetails from "../src/Components/ProductDetails/index.js"

function App() {
  return (
    <React.Fragment>
    <Navegation />
    <Route exact path={["/products", "/products/categoria/:nombreCat"]}  component={Catalogo} />
    <Route exact path="/about" />
    <Route exact path="/categories"/>
    <Route exact path={`/products/where={"id":id}`} component={ProductDetails} />
    </React.Fragment>
  );
}

export default App;