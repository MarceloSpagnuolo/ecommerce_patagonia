import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { deleteProduct, modifyProduct } from '../../store/actions/index'

// beers, removeBeers, seteadora, estados, onUpdate,
const Table = (props) => {


    const handleOnUpdate = useCallback(async (beer) => {
        // La llamada a Axios
        props.onUpdate({
            id: beer.id,
            name: beer.name,
            appearance: beer.appearance,
            description: beer.description,
            price: beer.price,
            stock: beer.stock,
            volume: beer.volume,
            thumbnail: beer.thumbnail
        })
    }, [props.onUpdate])

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Appearance</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Volumen</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                    {props.products.map((beer) => {
                        return (

                            <tr key={beer.id}>
                                <td>{beer.id}</td>
                                <td>{beer.name}</td>
                                <td>{beer.appearance}</td>
                                <td>{beer.description}</td>
                                <td>{beer.price}</td>
                                <td>{beer.stock}</td>
                                <td>{beer.volume}</td>
                                <td><button onClick={() => { props.seteadora(props.estados[1], props.estados[0]); handleOnUpdate(beer) }}>edit</button></td>
                                <td><button onClick={() => { props.deleteProduct(beer.id); }}>x</button></td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </>
    )
}


function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        modifyProduct: (id) => dispatch(modifyProduct(id))
    };
}




export default connect(mapStateToProps, mapDispatchToProps)(Table);