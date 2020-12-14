import React, { useState, useEffect } from 'react';
import Table from './Table';
import CategoryForm from './CategoryForm'
import { connect } from 'react-redux'
import { getCategories } from "../../store/actions/index";

const CategoryView = (props) => {
    const [category, setCategories] = useState([]);
    const [display, setDisplay] = useState(false);

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
            <button onClick={() => { seteadora(setDisplay, display) }
            }>New</button>
            {display ? <CategoryForm seteadora={{ seteadora, display, setDisplay }} /> : null}           
            <Table />
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