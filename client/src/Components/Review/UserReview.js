import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import ReviewStarts from "./ReviewStarts"
import "./UserReview.css"
import { getReviews, deleteReview } from "../../store/actions/index"


const UserReview = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState(false)
    const { reviews, user } = useSelector(state => state); //si no funciona probar state.users    
    const review = !!reviews && reviews.length > 0 && reviews.filter((r) => r.productId === props.id)

    useEffect(() => {
        dispatch(getReviews())
    }, [reviews.length, state])

    function eliminaraRev(id) {
        dispatch(deleteReview(id))
    }

    return (
        <>
            {!!review && review.length > 0 && review.map((m) => {
                return (
                    <div className="asdas" key={m.productId + "%" + m.userId}>
                        <div className="userReview" ><h3>{m.user !== undefined ? m.user.givenname : "Anonimo"}</h3></div>
                        <div className="userRateReview"> <ReviewStarts rate={m.rate} size={30} /></div>
                        <div className="userCommentReview"><p>{m.comment}</p></div>
                        <div className="userDateReview">{m.date}</div>
                        {user.id === m.userId || user.givenname === "Admin" ?
                            <div className="eliRev">
                                <button className="eliRevBtn" onClick={() => { eliminaraRev(m.id); setState(!state) }}>X</button>
                            </div> : null
                        }
                    </div>
                )
            })}
        </>
    )
}

export default UserReview;