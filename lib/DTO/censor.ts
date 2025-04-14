import { FileContent } from "./message";
import { ShortUserResponseDTO } from "./user";

export interface CheckedMessages {
  isProfane: boolean;
  status: string;
  _id: string;
  flag: boolean;
  readedId: string[];
  contentId: FileContent[];
  text: string[];
  boxId: string;
  createAt: string;
  createBy: ShortUserResponseDTO;
  isReact: string[];
  isReported: boolean;
}
