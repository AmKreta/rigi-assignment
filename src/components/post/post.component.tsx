import React, { useContext } from "react";
import { Post as PostInterface } from "../../lib/types/types";
import "./post.styles.scss";
import formatDate from "../../lib/dateFormat/dateFormat";
import ThemeContext from "../../lib/context/themeProvider";

interface props {
  post: PostInterface;
  isLoading?: boolean;
}

const Post: React.FC<props> = function ({ post, isLoading }) {
  const {mode} = useContext(ThemeContext);  
  return (
    <div className={`${mode} post-container`}>
      <div className="author-profile-picture">
        <img src={post.author.profilePictureUrl} loading="lazy"/>
      </div>
      <div className="post-main">
        <div className="post-header">
            <div className="post-profile-name">{post.author.name}</div>
            <div className="post-created-at">
                <span>created at : </span>
                <span>{formatDate(post.createdAt as any)}</span>
            </div>
        </div>
        <div className="post-content">{post.text}</div>
        {
            post.attachments.length
                ?<div className={`post-attachment-container num-attachment-${post.attachments.length>=3?3:post.attachments.length}`}>
                    {
                        post.attachments.map(attachment=><div key={attachment.id} className="post-attachment">
                            
                        </div>)
                    }
                </div>
            :null
        }
      </div>
    </div>
  );
};

export default Post;
