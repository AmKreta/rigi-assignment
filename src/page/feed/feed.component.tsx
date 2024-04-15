import React, { useContext, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Post  from "../../components/post/post.component";
import './feed.style.scss';
import ThemeContext from "../../lib/context/themeProvider";
import FriendListComponent from "../../components/friend-list/friendList.component";
import { useNavigate } from "react-router-dom";
import { setActivePost } from "../../store/posts/posts";

const Feed: React.FC = function () {
  const {mode} = useContext(ThemeContext);
  const posts = useSelector((state:RootState)=>state.post.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(function(){
    const scrollPosition = localStorage.getItem('feed-scroll-position');
    const current = ref.current;
    if(scrollPosition){
      current?.scrollTo({top:Number(scrollPosition)})
    }
    return ()=>{
      localStorage.setItem('feed-scroll-position', `${current!.scrollTop}`);
    }
  },[]);

  if(posts.loading){
    return <div>loading</div>
  }

  if(posts.error){
    return <div>error in loading posts</div>
  }
  
  if(!posts.data.length){
    return <div>no post to show</div>
  }

  const navigaeToPost = (e:React.MouseEvent<HTMLDivElement>)=>{
    const id = e.currentTarget.dataset['id'];
    const index = parseInt(e.currentTarget.dataset['index']!);
    dispatch(setActivePost(posts.data[index]));
    navigate(`/${id}`);
  }

  return <div className={`${mode} feed-container`} ref={ref}>
        {posts.data.map((post:any, index:number)=><Post post={post} key={post.id} onClick={navigaeToPost} index={index}/>)}
        <FriendListComponent />
    </div>
};

export default Feed;
