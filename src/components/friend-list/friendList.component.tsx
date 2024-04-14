import React, { useContext } from 'react';
import ThemeContext from '../../lib/context/themeProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { User } from '../../lib/types/types';
import './friendList.style.scss';

const FriendListComponent:React.FC = ()=>{
    const {mode:themeMode} = useContext(ThemeContext);
    const friends:User[] = useSelector((state:RootState)=>state.users.data);

    return <div className={`${themeMode} friend-list-container`}>
        <div className='friend-list-title'>Members</div>
        {
            friends.map(friend=><div key={friend.id} className='friend-list-item'>
                <img src={friend.profilePictureUrl} loading='lazy' />
                <div>{friend.name}</div>
            </div>)
        }
    </div>
}

export default FriendListComponent;