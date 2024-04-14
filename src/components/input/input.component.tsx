import React from 'react';
import './input.style.scss';
import { IconType } from 'react-icons';

interface props{
    value:string;
    onChange:(val:string)=>void;
    StartIcon?:IconType
}

const Input:React.FC<props> = ({value, onChange, StartIcon})=>{
    return <div className="input-container">
        {
            StartIcon
                ? <StartIcon />
                : null
        }
        <input type='text' value={value} onChange={e=>onChange(e.target.value)} className="input" />
    </div>;
}

export default Input;