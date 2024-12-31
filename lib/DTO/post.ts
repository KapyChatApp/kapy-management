import { Schema } from "mongoose";

export interface FileResponseDTO {
  _id: string;
  fileName: string;
  url: string;
  bytes: number;
  width: number;
  height: number;
  format: string;
  type: string;
}

export interface CommentResponseDTO {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  userId: string;
  likedIds: string[];
  replieds: CommentResponseDTO[];
  caption: string;
  createAt: string;
  createBy: string;
  content?: FileResponseDTO;
}

export interface CreatePostDTO {
  userId: string | undefined;
  caption: string;
  contentIds: string[];
}

export interface PostResponseDTO {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  userId: string;
  likedIds: string[];
  shares: PostResponseDTO[];
  comments: CommentResponseDTO[];
  caption: string;
  createAt: string;
  contents: FileResponseDTO[];
  flag: boolean;
}
