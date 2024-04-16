import './loader.style.scss';

export default function Loader({height, width}:{height:number, width:number}){
    return <div className="loader" style={{height, width}}></div>
}