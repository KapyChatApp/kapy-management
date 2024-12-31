import { Schema } from "mongoose";
export interface UserRegisterDTO {
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  password: string;
  rePassword: string;
  gender: boolean;
  birthDay: Date;
}

export interface UserLoginDTO {
  phoneNumber: string;
  password: string;
}
export interface AuthenticationDTO {
  message: string;
  token: string;
}

export interface UserResponseDTO {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  role: string[];
  avatar: string;
  background: string;
  gender: boolean;
  address: string;
  job: string;
  hobbies: string;
  bio: string;
  point: number;
  relationShip: string;
  birthDay: string;
  attendDate: string;
  flag: boolean;
  friendIds: string[];
  bestFriendIds: string[];
  blockedIds: string[];
  postIds: string[];
  rateIds: string[];
  createAt: string;
  createBy: string;
}

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  nickName: string;
  gender: boolean;
  address: string;
  job: string;
  hobbies: string;
  bio: string;
  relationShip: string;
  birthDay: string;
}

export interface UpdatePasswordDTO {
  password: string;
  rePassword: string;
}

export interface PublicUserDTO {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  gender: boolean;
  address: string;
  job: string;
  hobbies: string;
  bio: string;
  relationShip: string;
  birthDay: Date;
  relations: string[];
}
export interface FindUserDTO {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  relation: string;
  mutualFriends: ShortUserResponseDTO[];
}

export interface ShortUserResponseDTO {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
}

export interface OnlineEvent {
  userId: string;
  online: boolean;
  updateTime: Date;
}

export interface FriendResponseDTO {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  nickName: string;
  mutualFriends: ShortUserResponseDTO[];
  createAt: string;
  relation: string;
}
