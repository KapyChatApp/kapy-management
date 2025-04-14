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
