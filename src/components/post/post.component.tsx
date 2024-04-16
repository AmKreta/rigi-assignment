import React, { useContext, useState } from "react";
import { Post as PostInterface } from "../../lib/types/types";
import "./post.styles.scss";
import formatDate from "../../lib/dateFormat/dateFormat";
import ThemeContext from "../../lib/context/themeProvider";
import { AttachmentType } from "../../lib/enum/attachmentType.enum";
import AttachmentModal from "../attachmentModal/attachmentModal.component";

interface props {
  post: PostInterface;
  isLoading?: boolean;
  onClick?:(e:React.MouseEvent<HTMLDivElement>)=>void;
  index?:number
}

const Post: React.FC<props> = function ({ post, isLoading, onClick, index }) {
  const {mode} = useContext(ThemeContext);  
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  return (
    <div className={`${mode} post-container`}>
      <div className="author-profile-picture">
        <img src={post.author.profilePictureUrl} loading="lazy" alt='user dp'/>
      </div>
      <div className="post-main">
        <div className="post-header">
            <div className="post-profile-name">{post.author.name}</div>
            <div className="post-created-at">
                <span>created at : </span>
                <span>{formatDate(post.createdAt as any)}</span>
            </div>
        </div>
        <div className="post-content" onClick={onClick} data-id={post.id} data-index={index}>{post.text}</div>
        {
            post.attachments.length
                ?<div className={`post-attachment-container num-attachment-${post.attachments.length>=3?3:post.attachments.length}`} onClick={()=>setShowAttachmentModal(true)}>
                    {
                        post
                            .attachments
                            .slice(0,3)
                            .map((attachment, attachmentIndex)=><div key={attachment.id} className={`post-attachment post-attachment-${attachmentIndex}`}>
                                {
                                    attachment.type===AttachmentType.IMAGE
                                        ? <img data-post-index={index} src={attachment.url} loading="lazy" alt='post-attachment'/>
                                        : <video data-post-index={index} src={attachment.url} controls preload="metadata"/>
                                }
                            </div>)
                    }
                </div>
            :null
        }
      </div>
      {
        showAttachmentModal
          ?<AttachmentModal attachments={post.attachments} onOverlayClick={()=>setShowAttachmentModal(false)}/>
          :null
      }
    </div>
  );
};

export default Post;
