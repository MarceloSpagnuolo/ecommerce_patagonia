import React, { useState, useEffect } from 'react';
import Table from './Table';
import CategoryForm from './CategoryForm'
import { connect } from 'react-redux'
import { getCategories } from "../../store/actions/index";
import Modal from "../Modal/Modal.js";
// import { Redirect } from 'react-router-dom';


const CategoryView = (props) => {
    const [display, setDisplay] = useState(false);
    const [cat, setCat] = useState();
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        //Axios backend listar
        props.getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const seteadora = (set, state) => {
        set(!state)
    }
    return props.user.role === "admin" ? (
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
    : <div className="Authorized-Container">
        <img className="Authorized-Imagen" src="http://localhost:3001/images/401.jpg" alt=""/>
      </div>
}


function mapStateToProps(state) {
    return {
        categories: state.categories,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)