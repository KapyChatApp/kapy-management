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
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  userId: Schema.Types.ObjectId;
  likedIds: Schema.Types.ObjectId[];
  replieds: CommentResponseDTO[];
  caption: string;
  createAt: string;
  createBy: string;
  content?: FileResponseDTO;
}

export interface CreatePostDTO {
  userId: Schema.Types.ObjectId | undefined;
  caption: string;
  contentIds: Schema.Types.ObjectId[];
}

export interface PostResponseDTO {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  userId: Schema.Types.ObjectId;
  likedIds: Schema.Types.ObjectId[];
  shares: PostResponseDTO[];
  comments: CommentResponseDTO[];
  caption: string;
  createAt: string;
  contents: FileResponseDTO[];
}
