import { SortableMessageKeys } from "../messages";

export const titleTableHeadConsoredMessage: {
  title: string;
  key: SortableMessageKeys | null;
}[] = [
  { title: "ID", key: "id" },
  { title: "Created At", key: "createdAt" },
  { title: "Account Name", key: "userName" },
  { title: "Content", key: null },
  { title: "Status", key: null }
];

export type SortableCheckedPostKeys =
  | "id"
  | "userName"
  | "createdAt"
  | "likeCount"
  | "commentCount"
  | "attachmentCount";
export const titleTableHeadConsoredPost: {
  title: string;
  key: SortableCheckedPostKeys | null;
}[] = [
  { title: "ID", key: "id" },
  { title: "Created At", key: "createdAt" },
  { title: "Account Name", key: "userName" },
  { title: "Caption", key: null },
  { title: "Attachment", key: "attachmentCount" },
  { title: "Likes", key: "likeCount" },
  { title: "Comments", key: "commentCount" },
  { title: "Status", key: null }
];
