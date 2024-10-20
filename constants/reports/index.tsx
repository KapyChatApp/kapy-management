import { ReportData } from "@/types/reports";

export const reportDataList: ReportData[] = [
  {
    report: {
      id: "1",
      reporterInfo: {
        id: "1",
        name: "Alice",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "2",
        name: "Bob",
        status: false,
        type: "user"
      },
      createdAt: new Date("2024-10-20T12:34:56Z"),
      title: "Inappropriate Content",
      content: "User Bob posted offensive content.",
      targetedItem: {
        type: "image",
        url: "/public/assets/ava/48.jpg",
        altText: "Offensive Image"
      },
      status: "pending"
    }
  },
  {
    report: {
      id: "2",
      reporterInfo: {
        id: "3",
        name: "Charlie",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "4",
        name: "David",
        status: true,
        type: "user"
      },
      createdAt: new Date("2024-10-19T09:21:45Z"),
      title: "Spam Links",
      content: "User David shared spam links in the comments.",
      targetedItem: {
        type: "link",
        url: "https://spamlink.com",
        title: "Spam Link"
      },
      status: "resolved"
    }
  },
  {
    report: {
      id: "3",
      reporterInfo: {
        id: "5",
        name: "Eve",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "6",
        name: "Frank",
        status: false,
        type: "user"
      },
      createdAt: new Date("2024-10-18T11:15:32Z"),
      title: "Hate Speech",
      content: "User Frank used hate speech in a post.",
      targetedItem: {
        type: "file",
        fileName: "hateful-post.pdf",
        fileUrl: "https://example.com/hateful-post.pdf",
        fileType: "application/pdf"
      },
      status: "pending"
    }
  },
  {
    report: {
      id: "4",
      reporterInfo: {
        id: "7",
        name: "Grace",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "8",
        name: "Hank",
        status: true,
        type: "user"
      },
      createdAt: new Date("2024-10-17T16:02:10Z"),
      title: "Fake Profile",
      content: "User Hank created a fake profile.",
      targetedItem: {
        type: "user",
        id: "user8",
        name: "Hank",
        status: true
      },
      status: "rejected"
    }
  },
  {
    report: {
      id: "5",
      reporterInfo: {
        id: "9",
        name: "Ivy",
        status: false,
        type: "user"
      },
      reportedInfo: {
        id: "10",
        name: "Jack",
        status: true,
        type: "user"
      },
      createdAt: new Date("2024-10-16T08:45:27Z"),
      title: "Harassment",
      content: "User Jack has been harassing others via messages.",
      targetedItem: {
        type: "link",
        url: "https://example.com/harassment-proof",
        title: "Harassment Proof"
      },
      status: "pending"
    }
  },
  {
    report: {
      id: "6",
      reporterInfo: {
        id: "11",
        name: "Kate",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "12",
        name: "Liam",
        status: true,
        type: "user"
      },
      createdAt: new Date("2024-10-15T14:23:19Z"),
      title: "Inappropriate File",
      content: "User Liam uploaded an inappropriate file.",
      targetedItem: {
        type: "file",
        fileName: "inappropriate-content.docx",
        fileUrl: "https://example.com/inappropriate-content.docx",
        fileType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      },
      status: "pending"
    }
  },
  {
    report: {
      id: "7",
      reporterInfo: {
        id: "13",
        name: "Mike",
        status: false,
        type: "user"
      },
      reportedInfo: {
        id: "14",
        name: "Nancy",
        status: true,
        type: "user"
      },
      createdAt: new Date("2024-10-14T19:36:55Z"),
      title: "Spam File",
      content: "User Nancy uploaded a spam file.",
      targetedItem: {
        type: "file",
        fileName: "spam-file.zip",
        fileUrl: "https://example.com/spam-file.zip",
        fileType: "application/zip"
      },
      status: "resolved"
    }
  },
  {
    report: {
      id: "8",
      reporterInfo: {
        id: "15",
        name: "Olivia",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "16",
        name: "Paul",
        status: false,
        type: "user"
      },
      createdAt: new Date("2024-10-13T10:12:44Z"),
      title: "False Information",
      content: "User Paul shared false information in the group chat.",
      targetedItem: {
        type: "link",
        url: "https://example.com/false-info",
        title: "False Information"
      },
      status: "pending"
    }
  },
  {
    report: {
      id: "9",
      reporterInfo: {
        id: "17",
        name: "Quincy",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "18",
        name: "Rachel",
        status: false,
        type: "user"
      },
      createdAt: new Date("2024-10-12T07:54:23Z"),
      title: "Offensive Language",
      content: "User Rachel used offensive language in comments.",
      targetedItem: {
        type: "image",
        url: "/public/assets/ava/48.jpg",
        altText: "Screenshot of offensive comments"
      },
      status: "rejected"
    }
  },
  {
    report: {
      id: "10",
      reporterInfo: {
        id: "19",
        name: "Steve",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "20",
        name: "Tina",
        status: false,
        type: "user"
      },
      createdAt: new Date("2024-10-11T11:03:16Z"),
      title: "Abusive Behavior",
      content: "User Tina exhibited abusive behavior.",
      targetedItem: {
        type: "user",
        id: "user20",
        name: "Tina",
        status: false
      },
      status: "resolved"
    }
  },
  {
    report: {
      id: "11",
      reporterInfo: {
        id: "19",
        name: "Steve",
        status: true,
        type: "user"
      },
      reportedInfo: {
        id: "20",
        name: "Tina",
        status: false,
        type: "user"
      },
      createdAt: new Date("2024-10-11T11:03:16Z"),
      title: "Abusive Behavior",
      content: "User Tina exhibited abusive behavior.",
      targetedItem: {
        type: "text",
        content: "Hellooooooooo"
      },
      status: "resolved"
    }
  }
];
