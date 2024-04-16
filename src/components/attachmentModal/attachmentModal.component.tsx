import { useContext, useState } from "react";
import { Attachment} from "../../lib/types/types";
import Modal from "../modal/modal.component";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { AttachmentType } from "../../lib/enum/attachmentType.enum";
import './attachmentModal.style.scss';
import ThemeContext from "../../lib/context/themeProvider";

interface props{
    attachments:Attachment[];
    onOverlayClick:Function;
}

const AttachmentModal:React.FC<props> = ({attachments, onOverlayClick})=>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const {mode:themeMode} = useContext(ThemeContext);

    function next(e:React.MouseEvent<SVGElement>){
        e.stopPropagation();
        if(currentIndex<attachments.length-1){
            setCurrentIndex(prevState=>prevState+1);
        }
    }

    function prev(e:React.MouseEvent<SVGElement>){
        e.stopPropagation();
        if(currentIndex>0){
            setCurrentIndex(prevState=>prevState-1);
        }
    }

    return <Modal overlayProps={{onClick: onOverlayClick}}>
        <div className={`${themeMode} attachment-child-container`}>
            <FaChevronCircleLeft onClick={prev} color='var(--text1)' className={`modal-icon ${currentIndex===0?'disabled':null}`} size={30}/>
            <div className='attachment-modal-media-container'>
                {
                    attachments[currentIndex].type===AttachmentType.IMAGE
                        ?<img src={attachments[currentIndex].url} alt='attachment picture'/>
                        :<video src={attachments[currentIndex].url} controls /> 
                }
            </div>
            <FaChevronCircleRight onClick={next} color='var(--text1)' className={`modal-icon ${currentIndex===attachments.length-1?'disabled':null}`} size={30}/>
        </div>
    </Modal>
}

export default AttachmentModal;