import React, { useState, useEffect } from 'react';
import Table from './Table';
import CategoryForm from './CategoryForm'
import { connect } from 'react-redux'
import { getCategories } from "../../store/actions/index";

const CategoryView = (props) => {
    const [category, setCategories] = useState([]);
    const [display, setDisplay] = useState(false);
    const [cat, setCat] = useState();
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        //Axios backend listar
        props.getCategories()
        setCategories(props.categories)
    }, [])

    const seteadora = (set, state) => {
        set(!state)
    }
    return (
        <>
           <div className="prueba">               
                <button className="new" onClick={() => { seteadora(setDisplay, display) }
                }>New</button>
            {display ? <CategoryForm seteadora={{ seteadora, display, setDisplay }} /> : null}
            {edit ? <CategoryForm data={cat} seteadora={{ seteadora, edit, setEdit }} /> : null}
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