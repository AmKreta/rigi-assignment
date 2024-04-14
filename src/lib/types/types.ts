import { AttachmentType } from "../enum/attachmentType.enum";

export interface User{
    id:number;
    name:string;
    profilePictureUrl:string;
};

export interface Attachment {
    id: number;
    url: string;
    type: AttachmentType;
}
  
export interface Author {
    id: number;
    name: string;
    profilePictureUrl: string;
}
  
export interface Post {
    id: number;
    text: string;
    createdAt: string;
    author: Author;
    attachments: Attachment[];
}