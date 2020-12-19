import React, { useCallback } from "react";
import { connect } from "react-redux";
import { deleteProduct, modifyProduct } from "../../store/actions/index";
import "./Table.css";

// beers, removeBeers, seteadora, estados, onUpdate,
const Table = (props) => {
  function handleClick(beer) {

    var result = window.confirm("Want to delete?");
    if (result) {
      props.deleteProduct(beer.id);
    }
  }

  const handleOnUpdate = useCallback(
    async (beer) => {
      // La llamada a Axios

      props.onUpdate({
        id: beer.id,
        name: beer.name,
        appearance: beer.appearance,
        description: beer.description,
        price: beer.price,
        stock: beer.stock,
        volume: beer.volume,
        thumbnail: beer.thumbnail,
        categories: beer.categories,
      });
    },
    [props.onUpdate]
  );
  return (
    <>
      <div className="contenedor">
        <table>
          <tbody>
            <tr className="titulo">
              <th>Id</th>
              <th>Name</th>
              <th>Appearance</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Volumen</th>
              <th></th>
              <th></th>
            </tr>
            {props.products.map((beer) => {
              return (
                <tr key={beer.id} className="index">
                  <td>{beer.id}</td>
                  <td>{beer.name}</td>
                  <td>{beer.appearance}</td>
                  <td>{beer.description}</td>
                  <td>{beer.price}</td>
                  <td>{beer.stock}</td>
                  <td>{beer.volume}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => {
                        props.seteadora(props.estados[1], props.estados[0]);
                        handleOnUpdate(beer);
                      }}
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button className="x" onClick={() => handleClick(beer)}>
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    modifyProduct: (id) => dispatch(modifyProduct(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);