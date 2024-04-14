import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Post  from "../../components/post/post.component";
import './feed.style.scss';
import ThemeContext from "../../lib/context/themeProvider";
import FriendListComponent from "../../components/friend-list/friendList.component";

const Feed: React.FC = function () {
  const {mode} = useContext(ThemeContext);
  const posts = useSelector((state:RootState)=>state.post.list);

  if(posts.loading){
    return <div>loading</div>
  }

  if(posts.error){
    return <div>error in loading posts</div>
  }
  
  if(!posts.data.length){
    return <div>no post to show</div>
  }

  return <div className={`${mode} feed-container`}>
        {posts.data.map((post:any)=><Post post={post} key={post.id} />)}
        <FriendListComponent />
    </div>
};

export default Feed;
