import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { deleteCategory } from '../../store/actions/index'
import './Table.css'

// beers, removeBeers, seteadora, estados, onUpdate,
const Table = (props) => {


    const handleOnUpdate = useCallback(async (category) => {
        // La llamada a Axios        
        props.onUpdate({
            id: category.id,
            name: category.name,
            description: category.description
        })

    }, [props.onUpdate])
    return (
        <>
            <div className="contenedor">
                <table>
                    <tbody>

                        <tr className="titulo">
                            <th>id</th>
                            <th>nombre</th>
                            <th>description</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {props.categories.map((c) => (
                            <tr key={c.id} p={console.log(c)}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.description}</td>
                                <td><button className="edit" onClick={() => { props.seteadora(props.estados[1], props.estados[0]); handleOnUpdate(c); }}>edit</button></td>
                                <td><button className="x" onClick={() => { props.deleteCategory(c.id); }}>x</button></td>
                            </tr>
                        ))
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}


function mapStateToProps(state) {
    return {
        categories: state.categories

    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteCategory: (id) => dispatch(deleteCategory(id))
    };
}




export default connect(mapStateToProps, mapDispatchToProps)(Table);