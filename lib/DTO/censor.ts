import { FileContent } from "./message";
import { FileResponseDTO } from "./post";
import { ShortUserResponseDTO } from "./user";

export interface CheckedMessagesReponse {
  isProfane: boolean;
  status: string;
  _id: string;
  flag: boolean;
  contentId: FileContent[];
  text: string[];
  boxId: string;
  createAt: string;
  createBy: ShortUserResponseDTO;
}

export interface CheckedPostReponse {
  _id: string;
  firstName: string;
  lastName: string;
  userId: string;
  likedIds: number;
  shares: number;
  comments: number;
  caption: string;
  createAt: string;
  contents: FileResponseDTO[];
  flag: boolean;
}
