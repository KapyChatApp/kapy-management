import { SelectionItem } from "@/types";

export const selectionItemMessage: SelectionItem[] = [
  {
    value: "all",
    label: "All messages"
  },
  {
    value: "image",
    label: "Images"
  },
  {
    value: "file",
    label: "Files"
  },
  {
    value: "video",
    label: "Videos"
  },
  {
    value: "audio",
    label: "Audios"
  },
  {
    value: "text",
    label: "Texts"
  }
];

export type SortableMessageKeys = "id" | "userName" | "createdAt";

export const titleTableHeadMessage: {
  title: string;
  key: SortableMessageKeys | null;
}[] = [
  { title: "ID", key: "id" },
  { title: "Created At", key: "createdAt" },
  { title: "Account Name", key: "userName" },
  { title: "Content", key: null },
  { title: "Category", key: null },
  { title: "Action", key: null }
];

export const titleDetail_1: { title: string }[] = [
  { title: "ID:" },
  { title: "Created At:" }
];
export const titleDetail_2: { title: string }[] = [
  { title: "User ID:" },
  { title: "User Name:" }
];
export const titleDetail_3: { title: string }[] = [
  { title: "Status:" },
  { title: "Flag:" }
];
