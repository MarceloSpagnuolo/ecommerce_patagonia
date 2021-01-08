import React, { useState, useEffect } from 'react';
import BeerForm from './BeerForm';
import Table from './Table';
import { connect } from 'react-redux'
import { getProductJoinCategory } from "../../store/actions/index";
import "./ComponentFormFather.css"
import Modal from "../Modal/Modal.js";

const ComponentFormFather = (props) => {
    const [display, setDisplay] = useState(false);
    const [beers, setBeers] = useState([]);
    const [edit, setEdit] = useState(false)
    const [beer, setBeer] = useState();

    useEffect(() => {
        //Axios backend listar
        props.getProductJoinCategory()
        setBeers(props.products)
    }, [edit])

    const seteadora = (set, state) => {
        set(!state)
    }

    return (
        <>
            <div className="prueba">
                <button className="new" onClick={() => { seteadora(setDisplay, display) }
                }>New</button>
                <Modal title="Administrador de Productos" show={display} onClose={() => setDisplay((val) => !val)}>
                    <BeerForm seteadora={{ seteadora, display, setDisplay }} />
                </Modal>
                <Modal title="Editar Producto" show={edit} onClose={() => setEdit((val) => !val)}>
                    <BeerForm data={beer} seteadora={{ seteadora, edit, setEdit }} />
                </Modal>

                <Table seteadora={seteadora}
                    estados={[edit, setEdit]}
                    onUpdate={setBeer}
                />
            </div>
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
        getProductJoinCategory: () => dispatch(getProductJoinCategory()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentFormFather);
