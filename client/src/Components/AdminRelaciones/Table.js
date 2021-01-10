import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { deleteProductJoinCategory } from '../../store/actions/index'
import './Table.css'

// beers, removeBeers, seteadora, estados, onUpdate,
const Table = (props) => {
    
    // const handleOnUpdate = useCallback(async (category) => {
    //     // La llamada a Axios        
    //     props.onUpdate({
    //         id: category.id,
    //         name: category.name,
    //         description: category.description
    //     })

    // }, [props.onUpdate])
    return (
        <>
            <div className="contenedor">
                <table className="Table">
                    <tbody>

                        <tr id="Tr" className="titulo">
                            <th className="Th">Cerveza</th>
                            <th className="Th">Categoria</th>
                            <th className="Th">Volumen</th>
                            <th className="Th"></th>

                        </tr>
                        {props.products.length > 0 && props.products.map((c) => {
                            let newArr = [];
                            for (let i = 0; i < c.categories.length; i++) {
                                let id =c.categories[i].id
                                newArr.push(
                                    <tr id="Tr" key={Math.random()+c.id}>
                                        <td className="Td">{c.name}</td>
                                        <td className="Td">{c.categories[i].name}</td>
                                        <td className="Td">{c.volume}</td>
                                        <td className="Td"><button className="xrs" onClick={() => { props.deleteProductJoinCategory(c.id, id);console.log(id) }}>Eliminar</button></td>
                                    </tr>
                                )
                            }
                            return newArr
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories,


    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteProductJoinCategory: (id, id2) => dispatch(deleteProductJoinCategory(id, id2))
    };
}




export default connect(mapStateToProps, mapDispatchToProps)(Table);