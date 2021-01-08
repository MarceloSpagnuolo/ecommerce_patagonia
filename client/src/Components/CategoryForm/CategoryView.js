import React, { useState, useEffect } from 'react';
import Table from './Table';
import CategoryForm from './CategoryForm'
import { connect } from 'react-redux'
import { getCategories } from "../../store/actions/index";
import Modal from "../Modal/Modal.js";


const CategoryView = (props) => {
    const [display, setDisplay] = useState(false);
    const [cat, setCat] = useState();
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        //Axios backend listar
        props.getCategories()
    }, [])

    const seteadora = (set, state) => {
        set(!state)
    }
    return (
        <>
            <div className="prueba">
                <button className="new" onClick={() => { seteadora(setDisplay, display) }
                }>New</button>

                <Modal title="Administrador de categoria" show={display} onClose={() => setDisplay((val) => !val)}>
                    <CategoryForm seteadora={{ seteadora, display, setDisplay }} />
                </Modal>

                <Modal title="Editar categoria" show={edit} onClose={() => setEdit((val) => !val)}>
                    <CategoryForm data={cat} seteadora={{ seteadora, edit, setEdit }} />
                </Modal>

                <Table seteadora={seteadora}
                    estados={[edit, setEdit]}
                    onUpdate={setCat}
                />
            </div>
        </>
    )
}


function mapStateToProps(state) {
    return {
        categories: state.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)