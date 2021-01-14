import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { deleteCategory } from '../../store/actions/index'
import './Table.css'

// beers, removeBeers, seteadora, estados, onUpdate,
const Table = (props) => {

    function handleClick(cat) {

        var result = window.confirm("¿Seguro desea eliminar esta categoría?");
        if (result) {
          props.deleteCategory(cat.id);
        }
      }

    const handleOnUpdate = useCallback(async (category) => {
        // La llamada a Axios        
        props.onUpdate({
            id: category.id,
            name: category.name,
            description: category.description
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onUpdate])
    return (
        <>
            <div className="contenedor">
                <table className="Table">
                    <tbody>

                        <tr id="Tr" className="titulo">
                            <th className="Th">id</th>
                            <th className="Th">nombre</th>
                            <th className="Th">description</th>
                            <th className="Th"></th>
                            <th className="Th"></th>
                        </tr>
                        {props.categories.map((c) => (
                            <tr id="Tr" key={c.id} >
                                <td className="Td">{c.id}</td>
                                <td className="Td">{c.name}</td>
                                <td className="Td">{c.description}</td>
                                <td className="Td"><button className="edit" onClick={() => { props.seteadora(props.estados[1], props.estados[0]); handleOnUpdate(c); }}>edit</button></td>
                                <td className="Td"><button className="x" onClick={() => handleClick(c)}>x</button></td>
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