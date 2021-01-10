import React, { useState, useEffect } from "react";
import { Form, Field, ErrorMessage, Formik } from 'formik';
import "./NewReview.css"
import { addReview, getReviews, updateReview } from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";



const NewReview = (props) => {
    const [re, setRe] = useState([{}])
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"))
    const { reviews } = useSelector(state => state)

    useEffect(() => {
        dispatch(getReviews)
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
    }, [reviews.length, updateReview])


    return (
        <Formik initialValues={(Object.values(re[0]).length > 0 && re[0]) || {
            comment: '',
            rate: '1',
        }} validate={(values) => {
            const errors = {};
            if (values.comment.length <= 0) {
                errors.comment = "Tiene que existir un comentario"
            }
            if (values.comment.length > 250) {
                errors.comment = "La descripcion no tiene que ser mayor a 250 caracteres"
            }
            return errors;
        }} onSubmit={(values) => {
            if (Object.values(re[0]).length > 0 && re[0]) {

                dispatch(updateReview(re[0].id, values))
                window.location.reload()
            } else {
                dispatch(addReview(user.id, props.id, values))
            }
        }}>{({
            isSubmitting,
            isValid
        }) => (
            <>
                <Form className="form-review">
                    <div className="row-review">
                        <label htmlFor="producto">Puntuacion</label>
                        <ErrorMessage name="rate">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field name="rate" as="select" className="input-review" >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Field>
                    </div>

                    <div className="row-review">
                        <label htmlFor="producto">Comment</label>
                        <ErrorMessage name="comment">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field name="comment" className="input-review" />
                    </div>

                    <button
                        type="submit"
                        className={`submit-review ${isSubmitting || !isValid ? 'disabled' : ''}`}
                        disabled={isSubmitting || !isValid}
                    >Submit</button>

                </Form>
            </>
        )}
        </Formik >

    )
}

export default NewReview;