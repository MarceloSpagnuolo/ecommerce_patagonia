import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { getProductJoinCategory, getCategories } from '../../store/actions/index'
import Relationship from './FormRelationship'
import Table from './Table'

const RelationshipViews = (props) => {
    const [display, setDisplay] = useState(false);
    const [cat, setCat] = useState();
    const [edit, setEdit] = useState(false)
    
    useEffect(() => {
        //Axios backend listar
        props.getProductJoinCategory()
        props.getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

    const seteadora = (set, state) => {
        set(!state)
    }
    
    return (
        <>
           <div className="prueba">               
                <button className="new" onClick={() => { seteadora(setDisplay, display) }
                }>New</button>
            {display ? <Relationship seteadora={{ seteadora, display, setDisplay }} /> : null}
            {edit ? <Relationship data={cat} seteadora={{ seteadora, edit, setEdit }} /> : null}
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
        products: state.products,
        categories: state.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProductJoinCategory: () => dispatch(getProductJoinCategory()),
        getCategories: () => dispatch(getCategories()),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RelationshipViews)