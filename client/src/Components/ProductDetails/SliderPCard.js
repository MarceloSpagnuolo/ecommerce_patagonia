import React, { useState, useEffect } from "react";
import "./SliderPCard.css";
import { useDispatch, useSelector } from "react-redux"
import { getImages } from "../../store/actions/index"


const SliderPCard = (props) => {
    const [numero, setNumero] = useState(0)   //Con este estado controlamos el pocentaje  de avance de las imagenes
    const [num, setNum] = useState(1)         //Con este estado controlamos la cantidad de veces que puden clickiar a los lados
    const dispatch = useDispatch()
    const { images } = useSelector(state => state);

    useEffect(() => {
        if (props.id !== undefined) {
            dispatch(getImages(props.id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id])

    const valor = {
        transform: `translateX(${numero}em)`,
    }
    function next() {
        if (images.length + 1 - num > 0) {
            setNum(num + 1)
            setNumero(numero - 31.9)
            return
        }
        return
    }
    function back() {
        if (num !== 1) {
            setNum(num - 1)
            setNumero(numero + 31.9)
            return
        }
        return
    }

    return (
        <div className="divSliderPDet">

            <div className="destacadoProducts">
                <div className="imgContPCard">
                    <div className="divImgPC" style={valor}><img className="imgPDet" src={props.image} alt="" /></div>
                    {
                        !!images && images.map(i => {
                            return (
                                <div style={valor} className="divImgPC"><img className="imgPDet" src={i.path} alt="" /></div>
                            )
                        })}
                </div>
            </div>
            <div className="LeftPDet">
                <button className="buttBackPDet" onClick={() => back()} disabled={num === 1}> {"<"} </button>
            </div>

            <div className="rightPDet">
                <button className="buttNextPDet" onClick={() => next()} disabled={images.length + 1 - num === 0}> {">"} </button>
            </div>
        </div>
    )
}

export default SliderPCard;