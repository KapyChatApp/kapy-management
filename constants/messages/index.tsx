import { SelectionItem } from "@/types";
import { MessageData } from "@/types/message";

export const messageDataList: MessageData[] = [
  {
    message: {
      id: "1",
      userId: "1",
      userName: "Alice",
      content: {
        type: "text",
        content:
          "This is a sample message that spans over two lines in order to demonstrate the long text feature of TextContent."
      },
      createdAt: new Date("2024-10-20T12:34:56"),
      flag: true
    }
  },
  {
    message: {
      id: "2",
      userId: "2",
      userName: "Bob",
      content: {
        type: "image",
        url: "/assets/ava/48.jpg",
        altText: "A scenic view"
      },
      createdAt: new Date("2024-10-19T14:20:30"),
      flag: false
    }
  },
  {
    message: {
      id: "3",
      userId: "3",
      userName: "Charlie",
      content: {
        type: "link",
        url: "https://example.com",
        title: "Check this out!"
      },
      createdAt: new Date("2024-10-18T09:15:45"),
      flag: false
    }
  },
  {
    message: {
      id: "4",
      userId: "1",
      userName: "Alice",
      content: {
        type: "file",
        fileName: "document.pdf",
        fileUrl: "https://example.com/document.pdf",
        fileType: "application/pdf"
      },
      createdAt: new Date("2024-10-18T10:05:00"),
      flag: false
    }
  },
  {
    message: {
      id: "5",
      userId: "4",
      userName: "Diana",
      content: {
        type: "text",
        content:
          "This is another sample message that also spans over two lines to provide a realistic view of how long text behaves."
      },
      createdAt: new Date("2024-10-17T16:48:10"),
      flag: false
    }
  },
  {
    message: {
      id: "6",
      userId: "2",
      userName: "Bob",
      content: {
        type: "image",
        url: "/assets/ava/48.jpg",
        altText: "A beautiful sunset"
      },
      createdAt: new Date("2024-10-16T11:22:33"),
      flag: false
    }
  },
  {
    message: {
      id: "7",
      userId: "5",
      userName: "Eve",
      content: {
        type: "link",
        url: "https://example.com/article",
        title: "Read this interesting article"
      },
      createdAt: new Date("2024-10-15T08:30:45"),
      flag: false
    }
  },
  {
    message: {
      id: "8",
      userId: "3",
      userName: "Charlie",
      content: {
        type: "file",
        fileName: "report.docx",
        fileUrl: "https://example.com/report.docx",
        fileType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      },
      createdAt: new Date("2024-10-14T12:10:20"),
      flag: false
    }
  },
  {
    message: {
      id: "9",
      userId: "6",
      userName: "Frank",
      content: {
        type: "text",
        content:
          "Here is an example of a message with two-line content. This will give you an idea of how to display longer text content effectively."
      },
      createdAt: new Date("2024-10-13T14:45:50"),
      flag: false
    }
  },
  {
    message: {
      id: "10",
      userId: "4",
      userName: "Diana",
      content: {
        type: "image",
        url: "/assets/ava/48.jpg",
        altText: "A serene landscape"
      },
      createdAt: new Date("2024-10-12T09:35:15"),
      flag: false
    }
  }
];

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
export const titleDetail_3: { title: string }[] = [{ title: "Status:" }];
