import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Post as PostInterface } from "../../lib/types/types";
import Post from "../../components/post/post.component";
import './detailedPost.styles.scss';
import { resetActivePost } from "../../store/posts/posts";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../lib/context/themeProvider";

const DetailedPost: React.FC = function () {
  const {mode} = useContext(ThemeContext);
  const post:PostInterface = useSelector((state:RootState)=>state.post.activePost);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    return ()=>{
      dispatch(resetActivePost())
     };
  },[]);

  if(!post){
    const timer = setTimeout(function(){
      navigate('../');
      clearTimeout(timer);
    })
    return <div>App Crashed....redirecting to main page</div>
  }

  return <div className={`${mode} detailed-post-container`}>
    <Post post={post}/>
  </div>
};

export default DetailedPost;