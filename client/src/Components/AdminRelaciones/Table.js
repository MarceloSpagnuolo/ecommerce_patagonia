import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { deleteProductJoinCategory } from '../../store/actions/index'
import './Table.css'

// beers, removeBeers, seteadora, estados, onUpdate,
const Table = (props) => {
    
    // console.log(props, 'de taablita')
    
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
                <table>
                    <tbody>

                        <tr className="titulo">
                            <th>Cerveza</th>
                            <th>Categoria</th>
                            <th>Volumen</th>
                            <th></th>

                        </tr>
                        {props.products.length > 0 && props.products.map((c) => {
                            let newArr = [];
                            for (let i = 0; i < c.categories.length; i++) {
                                let id =c.categories[i].id
                                console.log(id)
                                newArr.push(
                                    <tr key={Math.random()+c.id}>
                                        <td>{c.name}</td>
                                        <td>{c.categories[i].name}</td>
                                        <td>{c.volume}</td>
                                        <td><button className="xrs" onClick={() => { props.deleteProductJoinCategory(c.id, id);console.log(id) }}>Eliminar</button></td>
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