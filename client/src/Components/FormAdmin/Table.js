import React, { Fragment, useEffect } from 'react'


const Table = ({ beers, removeBeers, seteadora, estados }) => {

    return (
        <Fragment>
            {console.log(beers)}
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Appearance</th>
                        <th>Description</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Volumen</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                    {beers.map((beer) => {
                        return (
                            <Fragment key={beer.id}>
                                <tr>
                                    <td>{beer.id}</td>
                                    <td>{beer.appearance}</td>
                                    <td>{beer.description}</td>
                                    <td>{beer.name}</td>
                                    <td>{beer.price}</td>
                                    <td>{beer.stock}</td>
                                    <td>{beer.volumen}</td>
                                    <td><button onClick={() => {seteadora(estados[1], estados[0]);}}>edit</button></td>
                                    <td><button onClick={() => { removeBeers(beer.id) }}>x</button></td>
                                </tr>
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Table;