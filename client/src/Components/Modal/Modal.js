import React from 'react';
import './Modal.css';


const Modal = ({ children, title, show, onClose }) => {
    return show ? (
        <div className="modal">
            <div className="content">
                <div className="header">
                    <button className="close-modal" onClick={() => {
                        onClose && onClose()
                    }}>
                        x
                    </button>
                </div>
                <div className="body-modal">
                    <span className="title">{title}</span>
                    {children}
                </div>
            </div>
        </div>
    ) : null;
}


export default Modal;