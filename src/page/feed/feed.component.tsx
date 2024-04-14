import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Post as PostInterface } from "../../lib/types/types";
import Post  from "../../components/post/post.component";
import './feed.style.scss';
import ThemeContext from "../../lib/context/themeProvider";

const Feed: React.FC = function () {
  const {mode} = useContext(ThemeContext);
  const posts:PostInterface[] = useSelector((state:RootState)=>state.post.list.data) as any as PostInterface[];
  if(!posts.length){
    return <div>loading</div>
  }

  return <div className={`${mode} feed-container`}>
    {posts.map(post=><Post post={post} key={post.id} />)}
  </div>
};

export default Feed;
