import React, { useState, useEffect, Fragment } from 'react';
import BeerForm from './BeerForm';
import dataBeer from './Mocks';
import Table from './Table';


const ComponentFormFather = () => {
    const [display, setDisplay] = useState(false);
    const [beers, setBeers] = useState([]);
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        //Axios backend listar
        setBeers(dataBeer)
    }, [])

    //Axios backend borrar   
    const removeBeers = (id) => {
        setBeers(
            beers.filter(beer => beer.id !== id)
        )
    }

    //Axios backend editar
    const editBeers = (beer) => {
        beers.map(b => {
            if (b.id === beer.id) {
                return beer
            } else {
                return b
            }
        })
        setEdit(false)
    }
    const seteadora = (set, state) => {
        if (!state) {
            set(true)
        } else {
            set(false)
        }
    }
    
    //Axios backend crear
    const createBeers = (newBeer) => {
        setBeers(beers.concat({ ...newBeer, id: beers.length + 1 }))
        setDisplay(false)
    }

    return (
        <Fragment>
            <button onClick={() => {seteadora(setDisplay, display)}
            }>New</button>
            {display ? <BeerForm createBeers={createBeers} /> : null}
            {edit ? <BeerForm editBeers={editBeers} /> : null}
            <Table beers={beers}
                removeBeers={removeBeers}
                seteadora={seteadora}
                estados={ [ edit, setEdit ]}
            />


        </Fragment>
    )

}



export default ComponentFormFather;
