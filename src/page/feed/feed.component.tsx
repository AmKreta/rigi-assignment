import React, { useContext, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Post  from "../../components/post/post.component";
import './feed.style.scss';
import ThemeContext from "../../lib/context/themeProvider";
import FriendListComponent from "../../components/friend-list/friendList.component";
import { useNavigate } from "react-router-dom";
import { fetchPosts, setActivePost } from "../../store/posts/posts";
import { Post as PostInterface } from "../../lib/types/types";
import Modal from "../../components/modal/modal.component";
import Loader from "../../components/loader/loader.component";
import IntersectionObserverComponent from "../../lib/intrsectionObserverComponent/intersectionObserver.component";

const Feed: React.FC = function () {
  const {mode} = useContext(ThemeContext);
  const posts = useSelector((state:RootState)=>state.post.list);
  const filter = useSelector((state:RootState)=>state.post.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  function loadMorePosts(isVisible:boolean){
    if(isVisible){
      dispatch(fetchPosts() as any);
    }
  }

  useLayoutEffect(function(){
    const scrollPosition = localStorage.getItem('feed-scroll-position');
    const current = ref.current;
    if(scrollPosition){
      current?.scrollTo({top:Number(scrollPosition)})
    }
    return ()=>{
      localStorage.setItem('feed-scroll-position', `${current?.scrollTop}`);
    }
  },[]);

  if(posts.loading && !posts.data.length){
    return <Modal>
      <Loader height={60} width={60}/>
    </Modal>
  }

  if(posts.error){
    return <Modal>
      <div style={{color:'var(--text1)'}}>error in loading posts....refresh again</div>
    </Modal>
  }
  
  if(!posts.data.length){
    return <Modal>
      <div style={{color:'var(--text1)'}}>no post to show</div>
    </Modal>
  }

  const navigaeToPost = (e:React.MouseEvent<HTMLDivElement>)=>{
    const id = e.currentTarget.dataset['id'];
    const index = parseInt(e.currentTarget.dataset['index']!);
    dispatch(setActivePost(posts.data[index]));
    navigate(`/${id}`);
  }

  return <div className={`${mode} feed-container`} ref={ref}>
        {posts
          .data
          .filter((post:PostInterface)=>filter ? post.text.toLocaleLowerCase().includes(filter) : true)
          .map((post:any, index:number)=><Post 
            post={post} 
            key={post.id} 
            onClick={navigaeToPost} 
            index={index}
          />)}
        <IntersectionObserverComponent callback={loadMorePosts} options={{root:document.body}}>
          {
            (ref)=>(<div ref={ref as any}>
              <Loader height={40} width={40}/>
            </div>)
          }
        </IntersectionObserverComponent>
        <FriendListComponent />
    </div>
};

export default Feed;
