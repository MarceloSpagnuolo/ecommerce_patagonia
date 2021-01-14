import React, { useState, useEffect } from "react";
import { Form, Field, ErrorMessage, Formik } from 'formik';
import "./NewReview.css"
import { addReview, getReviews, updateReview } from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";


const NewReview = (props) => {
    const [re, setRe] = useState([{}])
    const dispatch = useDispatch();
    const { reviews, user } = useSelector(state => state)
    useEffect(() => {
        dispatch(getReviews)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reviews.length, updateReview])

    useEffect(() => {
        const review = !!reviews && reviews.length > 0 && reviews.filter(r => user.id === r.userId && props.id === r.productId);

        if (review.length > 0) {
            setRe([{
                comment: review[0].comment,
                rate: review[0].rate,
                id: review[0].id
            }])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reviews.length, updateReview])

    return (
        <Formik initialValues={props.data|| {
            comment: '',
            rate: '1',
        }} validate={(values) => {
            const errors = {};
            if (values.comment.length <= 0) {
                errors.comment = "Huele a pelele que no escribe un comentario"
            }
            if (values.comment.length > 250) {
                errors.comment = "La descripcion no tiene que ser mayor a 250 caracteres"
            }
            return errors;
        }} onSubmit={(values) => {
            if (props.data) {
                dispatch(updateReview(re[0].id, values))
                props.set(false)

            } else {
                dispatch(addReview(user.id, props.id, values))
                props.set(false)
            }
        }}>{({
            isSubmitting,
            isValid
        }) => (
            <div className="elGordito">
                <Form className="form-review">
                    <div className="reviewTextPuntuacion">
                        <div className="row-review textPuntuacion">
                            <label className="textPun" htmlFor="producto">Puntuación</label>
                            <ErrorMessage name="rate">
                                {message => <div className="error">{message}</div>}
                            </ErrorMessage>
                            <Field name="rate" as="select" className="input-review rate" >
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </Field>
                        </div>
                    </div>

                    <div className="row-review textComentario">
                        <label className="textComen" htmlFor="producto">Comentario</label>
                        <ErrorMessage name="comment">
                            {message => <div className="errorReview">{message}</div>}
                        </ErrorMessage>
                        <Field as="textarea" name="comment" className="input-review comentario" />
                    </div>
                    <button className="cerrarReview" onClick={() => { props.set(false) }}>Cancelar</button>

                    <button
                        type="submit"
                        className={`submit-review ${isSubmitting || !isValid ? 'disabled' : ''}`}
                        disabled={isSubmitting || !isValid}
                    >Enviar</button>

                </Form>
            </div>
        )}
        </Formik >

    )
}

export default NewReview;