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
        destacado: beer.destacado,
        categories: beer.categories,
      });
    },
    [props.onUpdate]
  );
  return (
    <>
      <div className="contenedor">
        <table className="Table">
          <tbody>
            <tr id="Tr" className="titulo">
              <th className="Th">Id</th>
              <th className="Th">Name</th>
              <th className="Th">Appearance</th>
              <th className="Th">Description</th>
              <th className="Th">Price</th>
              <th className="Th">Stock</th>
              <th className="Th">Destacado</th>
              <th className="Th">Volumen</th>
              <th className="Th"></th>
              <th className="Th"></th>
            </tr>
            {props.products && props.products.map((beer) => {
              return (
                <tr id="Tr" key={beer.id} className="index">
                  <td className="Td">{beer.id}</td>
                  <td className="Td">{beer.name}</td>
                  <td className="Td">{beer.appearance}</td>
                  <td className="Td">{beer.description}</td>
                  <td className="Td">{beer.price}</td>
                  <td className="Td">{beer.stock}</td>
                  <td className="Td">{beer.destacado ? "SI" : "NO"}</td>
                  <td className="Td">{beer.volume}</td>
                  <td className="Td">
                    <button
                      className="edit"
                      onClick={() => {
                        props.seteadora(props.estados[1], props.estados[0]);
                        handleOnUpdate(beer);
                      }}
                    >
                      Edit
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