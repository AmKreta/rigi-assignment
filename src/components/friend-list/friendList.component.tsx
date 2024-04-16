import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import ThemeContext from '../../lib/context/themeProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { User } from '../../lib/types/types';
import './friendList.style.scss';

const FriendListComponent:React.FC = ()=>{
    const {mode:themeMode} = useContext(ThemeContext);
    const friends:User[] = useSelector((state:RootState)=>state.users.data);
    const [showMembersInSmallScreen, setShowMembersInSmallScreen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    function toggleShowInSmallScreen(){
        setShowMembersInSmallScreen(prevState=>!prevState);
    }

    useEffect(function(){
        function checkScreen(){
            if(window.innerWidth<1100){
                setIsSmallScreen(true);
            }
            else{
                setIsSmallScreen(false);
            }
        }
        window.addEventListener('resize', checkScreen);
        checkScreen();
        return ()=>{
            window.removeEventListener('resize', checkScreen);
        }
    },[]);

    return isSmallScreen
        ?showMembersInSmallScreen
            ?<>
                {
                    createPortal( <div className={`${themeMode} friend-list-container`}>
                        <div className='friend-list-title'>Members</div>
                        {
                            friends.map(friend=><div key={friend.id} className='friend-list-item'>
                            <img src={friend.profilePictureUrl} loading='lazy' alt='user-dp'/>
                            <div>{friend.name}</div>
                            </div>)
                        }
                        </div>, 
                    document.body)
                }
                <IoClose color='var(--text1)' className='hamburger' onClick={toggleShowInSmallScreen}/>
            </>
            :<RxHamburgerMenu color='var(--text1)' className='hamburger' onClick={toggleShowInSmallScreen}/>
        :<div className={`${themeMode} friend-list-container`}>
            <div className='friend-list-title'>Members</div>
            {
                friends.map(friend=><div key={friend.id} className='friend-list-item'>
                <img src={friend.profilePictureUrl} loading='lazy' alt='user-dp'/>
                <div>{friend.name}</div>
                </div>)
            }
        </div>;
}

export default FriendListComponent;