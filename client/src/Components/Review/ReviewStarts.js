import React from "react";
import ReactStars from "react-rating-stars-component";


const ReviewStars = (props) => {


    return (
        <ReactStars
            count={5}
            size={parseInt(props.size)}
            value={parseInt(props.rate)}
            isHalf={true}
            edit={props.edit || false}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor={"#ffd700"}
        />
    )
}

export default ReviewStars