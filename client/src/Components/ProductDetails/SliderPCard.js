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
        if (1 != undefined) {
            dispatch(getImages(1))
        }
    }, [props.id])
    console.log(images)

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
                    <div className="divImgPC" style={valor}><img className="imgPDet" src={"https://emporiodacerveja.vtexassets.com/arquivos/ids/176098/Cerveja-Patagonia-Amber-Lager-Long-Neck-355ml.jpg?v=637212809310330000"} /></div>
                    {
                        !!images && images.map(i => {
                            console.log(i.path, "vengo del maap")
                            return (
                                <div style={valor} className="divImgPC"><img className="imgPDet" src={i.path} /></div>
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