import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.hook';

type IntersectionObserverOptions = IntersectionObserverInit & { freezeOnceVisible?: boolean };

interface props{
    callback:(isVisible:boolean)=>void;
    options: IntersectionObserverOptions;
    children:(ref:any)=>React.ReactNode
};

const IntersectionObserverComponent:React.FC<props> = ({callback, options, children}) => {
    const ref = useIntersectionObserver(callback, options)
    return <>
        {
            children(ref)
        }
    </>
}

export default IntersectionObserverComponent;