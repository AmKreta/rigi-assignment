export interface User{
    id:number;
    name:string;
    profilePicture:string;
};

export interface Attachment {
    id: number;
    url: string;
    type: "image" | "video";
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