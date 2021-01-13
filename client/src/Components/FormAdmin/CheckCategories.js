import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postProductJoinCategory, deleteProductJoinCategory } from "../../store/actions";
import "./CheckCategories.css"

const Check = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    let toggle = true

    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function estado(e) {
        if (e.target.checked) {
            dispatch(postProductJoinCategory(props.data.id, e.target.value))
        } else {
            dispatch(deleteProductJoinCategory(props.data.id, e.target.value))
        };
    }

    function comprueba(id) {
        let response = false;
        props.data.categories && props.data.categories.forEach(element => {
            if (element.id === id) {
                response = true
            }
        });
        return response
    }

    return (
        <div className="CheckCategories-Checkboxs">
            {categories.length > 0 && categories.map((p) => (
                <label key={p.id}>
                    <input className="CheckCategories-Check" onChange={estado.bind(this)} type="checkbox" name="prueba" value={p.id} defaultChecked={comprueba(p.id)} />
                    {p.name}{toggle}
                </label>
            ))}
        </div>
    )
}

export default Check;