import { FileContent, ResponseMessageDTO } from "./message";
import { ShortUserResponseDTO } from "./user";

export interface VerifyReportDTO {
  status: string;
}
export interface IPost {
  _id: string;
  userId: string;
  likedIds: string[];
  shares: string[];
  comments: string[];
  caption: string;
  contentIds: string[];
  flag: boolean;
}
export interface IComment {
  _id: string;
  userId: string;
  replyId: string;
  caption: string;
  contentId: string;
  repliedIds: string[];
  likedIds: string[];
  flag: boolean;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  password: string;
  roles: string[];
  avatar: string;
  avatarPublicId: string;
  background: string;
  backgroundPublicId: string;
  gender: boolean;
  address: string;
  job: string;
  hobbies: string;
  bio: string;
  point: number;
  relationShip: string;
  birthDay: Date;
  attendDate: Date;
  flag: boolean;
  friendIds: string[];
  bestFriendIds: string[];
  blockedIds: string[];
  postIds: string[];
  rateIds: string[];
}
export interface IMessage {
  _id: string;
  flag: boolean;
  readedId: string[];
  contentId: FileContent[];
  text: string[];
  boxId: string;
  createAt: string;
  createBy: string;
}
export interface ReportResponseDTO {
  _id: string;
  content: string;
  flag: boolean;
  status: string;
  userId: ShortUserResponseDTO;
  createAt: string;
  target: IPost | IUser | IComment | IMessage;
  targetType: string;
}

export interface CreateReportDTO {
  title: string;
  content: string;
  targetId: string;
  targetType: string;
}

export interface UpdateReportDTO {
  content: string;
}

export interface VerifyReportDTO {
  status: string;
}
