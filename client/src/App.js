import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import { Route } from 'react-router-dom';
import ProductDetails from "../src/Components/ProductDetails/index.js"

function App() {
  return (
    <React.Fragment>
      <Navegation />
      <Route path={"/products"} component={Catalogo} />
      <Route exact path="/about" />
      <Route exact path="/categories" />
      <Route exact path={[`/product/:id`]} component={ProductDetails} />
    </React.Fragment>
  );
}

export default App;