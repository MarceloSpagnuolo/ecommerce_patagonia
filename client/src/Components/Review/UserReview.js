import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import ReviewStarts from "./ReviewStarts"
import "./UserReview.css"
import { getReviews } from "../../store/actions/index"


const UserReview = (props) => {
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state); //si no funciona probar state.users    
    const review = !!reviews && reviews.length > 0 && reviews.filter((r) => r.productId === props.id)
    useEffect(() => {
        dispatch(getReviews())
    }, [reviews.length])

 

    return (
        <>
            {!!review && review.length > 0 && review.map((m) => {
                return (
                    <div className="asdas" key={m.productId + "%" + m.userId}>
                        <div className="userReview" ><h3>{m.user != undefined ? m.user.name : "Anonimo"}</h3></div>
                        <div className="userRateReview"> <ReviewStarts rate={m.rate} size={30} /></div>
                        <div className="userCommentReview"><p>{m.comment}</p></div>
                        <div className="userDateReview">{m.date}</div>
                    </div>
                )

            })}
        </>
    )
}

export default UserReview;