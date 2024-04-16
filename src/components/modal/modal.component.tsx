import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './modal.styles.scss';

interface props{
    children: ReactNode,
    parent?:HTMLElement,
    overlayProps?:object
};

const Modal:React.FC<props> = ({children, parent = document.body, overlayProps})=>{
    return ReactDOM.createPortal(<div className='overlay' {...overlayProps}>
        {children}
    </div>, parent);
}


export default Modal;