import React, { useState } from 'react';

import { uploadAction } from './ActionUpdate';
import { addImages } from "../../store/actions/index"
import { useDispatch } from "react-redux"


const ImageForm = (props) => {
    const [image, setImage] = useState([]);
    const [preview, setPreview] = useState(false);
    const dispatch = useDispatch()

    const handleImageUpload = (e) => {
        const j = Array.from(e.target.files)
        setImage(j)
        setPreview(true);
    }

    const clearImage = () => {
        setPreview(false);
        setImage('');
    }

    const handleSubmit = () => {
        image.map(i => {
            uploadAction(i);
            dispatch(addImages(i.name, props.id))
        })

        setPreview(false);
        setImage([]);
    }

    return (
        <div>
            {preview ?
                <div>
                    <button onClick={clearImage}>Cancelar imagen</button>
                    <button onClick={handleSubmit}>Upload!</button>
                </div>
                :
                <div>
                    <input type="file" onChange={handleImageUpload} accept="png jpg jpeg gif" multiple />
                </div>
            }
        </div>
    );
}

export default ImageForm;