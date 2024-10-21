import { SelectionItem } from "@/types";
import { AccountData } from "@/types/accounts";

export const selectionItem: SelectionItem[] = [
  {
    value: "all",
    label: "All accounts"
  },
  {
    value: "active",
    label: "Active accounts"
  },
  {
    value: "inactive",
    label: "Inactive accounts"
  }
];

export const accountDataList: AccountData[] = [
  {
    account: {
      userId: "1",
      userName: "johnDoe",
      fullName: "John Doe",
      ava: "/assets/ava/48.jpg",
      email: "john@example.com",
      phone: "123-456-7890",
      birth: new Date("1990-01-15"),
      address: "123 Main St California",
      country: "USA",
      status: true,
      createdAt: new Date("2020-01-01"),
      postList: [
        {
          id: "1",
          title: "My First Post",
          createdAt: new Date("2020-02-01"),
          flag: true
        },
        {
          id: "2",
          title: "Vacation in Hawaii",
          createdAt: new Date("2020-03-10"),
          flag: false
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "1",
          userName: "janeDoe",
          addedAt: new Date("2020-05-01"),
          relationship: "Friend"
        },
        {
          id: "2",
          userName: "mikeSmith",
          addedAt: new Date("2020-06-01"),
          relationship: "Best Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "2",
      userName: "janeDoe",
      fullName: "Jane Doe",
      ava: "/assets/ava/48.jpg",
      email: "jane@example.com",
      phone: "123-555-7890",
      birth: new Date("1992-05-20"),
      address: "456 Oak Ave San Fransisco",
      country: "USA",
      status: false,
      createdAt: new Date("2020-03-10"),
      postList: [
        {
          id: "3",
          title: "Hello World",
          createdAt: new Date("2020-04-01"),
          flag: true
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "3",
          userName: "johnDoe",
          addedAt: new Date("2020-05-10"),
          relationship: "Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "3",
      userName: "mikeSmith",
      fullName: "Mike Smith",
      ava: "/assets/ava/48.jpg",
      email: "mike@example.com",
      phone: "987-654-3210",
      birth: new Date("1988-08-08"),
      address: "789 Pine St Texas",
      country: "Canada",
      status: true,
      createdAt: new Date("2021-01-01"),
      postList: [
        {
          id: "4",
          title: "Coding Tips",
          createdAt: new Date("2021-02-15"),
          flag: true
        },
        {
          id: "5",
          title: "Traveling in Europe",
          createdAt: new Date("2021-05-20"),
          flag: false
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "4",
          userName: "johnDoe",
          addedAt: new Date("2021-03-01"),
          relationship: "Friend"
        },
        {
          id: "5",
          userName: "janeDoe",
          addedAt: new Date("2021-04-01"),
          relationship: "Best Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "4",
      userName: "lindaLee",
      fullName: "Linda Lee",
      ava: "/assets/ava/48.jpg",
      email: "linda@example.com",
      phone: "555-123-4567",
      birth: new Date("1995-12-30"),
      address: "321 Cedar Rd",
      country: "UK",
      status: true,
      createdAt: new Date("2020-10-20"),
      postList: [
        {
          id: "6",
          title: "My New Hobby",
          createdAt: new Date("2020-12-01"),
          flag: true
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "6",
          userName: "johnDoe",
          addedAt: new Date("2020-11-01"),
          relationship: "Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "5",
      userName: "tomHarris",
      fullName: "Tom Harris",
      ava: "/assets/ava/48.jpg",
      email: "tom@example.com",
      phone: "555-987-6543",
      birth: new Date("1991-03-25"),
      address: "654 Maple St",
      country: "Australia",
      status: false,
      createdAt: new Date("2022-05-15"),
      postList: [
        {
          id: "7",
          title: "Fitness Goals",
          createdAt: new Date("2022-06-10"),
          flag: false
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "7",
          userName: "mikeSmith",
          addedAt: new Date("2022-06-20"),
          relationship: "Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "6",
      userName: "saraJones",
      fullName: "Sara Jones",
      ava: "/assets/ava/48.jpg",
      email: "sara@example.com",
      phone: "555-654-3210",
      birth: new Date("1994-07-07"),
      address: "987 Elm St",
      country: "USA",
      status: true,
      createdAt: new Date("2021-11-10"),
      postList: [
        {
          id: "8",
          title: "Healthy Recipes",
          createdAt: new Date("2021-12-01"),
          flag: true
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "8",
          userName: "lindaLee",
          addedAt: new Date("2021-12-15"),
          relationship: "Best Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "7",
      userName: "davidKing",
      fullName: "David King",
      ava: "/assets/ava/48.jpg",
      email: "david@example.com",
      phone: "555-789-1234",
      birth: new Date("1985-11-11"),
      address: "111 Birch St",
      country: "USA",
      status: true,
      createdAt: new Date("2023-02-20"),
      postList: [
        {
          id: "9",
          title: "Learning New Languages",
          createdAt: new Date("2023-03-01"),
          flag: true
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "9",
          userName: "johnDoe",
          addedAt: new Date("2023-03-10"),
          relationship: "Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "8",
      userName: "annaTaylor",
      fullName: "Anna Taylor",
      ava: "/assets/ava/48.jpg",
      email: "anna@example.com",
      phone: "555-321-6547",
      birth: new Date("1993-09-09"),
      address: "456 Willow Ln",
      country: "Canada",
      status: true,
      createdAt: new Date("2022-07-01"),
      postList: [
        {
          id: "10",
          title: "Photography Tips",
          createdAt: new Date("2022-08-01"),
          flag: true
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "10",
          userName: "mikeSmith",
          addedAt: new Date("2022-08-10"),
          relationship: "Best Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "9",
      userName: "lucasMiller",
      fullName: "Lucas Miller",
      ava: "/assets/ava/48.jpg",
      email: "lucas@example.com",
      phone: "555-987-1111",
      birth: new Date("1990-04-20"),
      address: "789 Oak Dr",
      country: "Australia",
      status: false,
      createdAt: new Date("2023-05-15"),
      postList: [
        {
          id: "11",
          title: "Nature Adventures",
          createdAt: new Date("2023-06-01"),
          flag: false
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "11",
          userName: "tomHarris",
          addedAt: new Date("2023-06-10"),
          relationship: "Friend"
        }
      ]
    }
  },
  {
    account: {
      userId: "10",
      userName: "emmaWilson",
      fullName: "Emma Wilson",
      ava: "/assets/ava/48.jpg",
      email: "emma@example.com",
      phone: "555-654-9870",
      birth: new Date("1997-06-15"),
      address: "123 Cypress St",
      country: "UK",
      status: true,
      createdAt: new Date("2020-08-20"),
      postList: [
        {
          id: "12",
          title: "Yoga for Beginners",
          createdAt: new Date("2020-09-01"),
          flag: true
        }
      ],
      pointTrust: "03",
      friendList: [
        {
          id: "12",
          userName: "lindaLee",
          addedAt: new Date("2020-09-10"),
          relationship: "Best Friend"
        }
      ]
    }
  }
];

export type SortableKeys =
  | "account.userId"
  | "account.userName"
  | "account.createdAt"
  | "account.email"
  | "account.phone";

export const titleTableHead: { title: string; key: SortableKeys | null }[] = [
  { title: "ID", key: "account.userId" },
  { title: "Created At", key: "account.userName" },
  { title: "Account Name", key: "account.createdAt" },
  { title: "Email", key: "account.email" },
  { title: "Phone", key: "account.phone" },
  { title: "Status", key: null },
  { title: "Action", key: null }
];

export const titleDetailFirst: { title: string }[] = [
  { title: "ID:" },
  { title: "Full name:" },
  { title: "Status:" }
];
export const titleDetailSec: { title: string }[] = [
  { title: "Email:" },
  { title: "Phone:" },
  { title: "Birth:" }
];
export const titleDetailThir: { title: string }[] = [
  { title: "Address:" },
  { title: "Country:" },
  { title: "Created At:" }
];

export type SortablePostKeys =
  | "otherList.id"
  | "otherList.title"
  | "otherList.createdAt";

export const titlePostDetail: {
  title: string;
  key: SortablePostKeys | null;
}[] = [
  { title: "ID", key: "otherList.id" },
  { title: "Title", key: "otherList.title" },
  { title: "Created At", key: "otherList.createdAt" },
  { title: "Status", key: null }
];

export type SortableFriendsKeys =
  | "otherList.id"
  | "otherList.userName"
  | "otherList.addedAt";
export const titleFriendList: {
  title: string;
  key: SortableFriendsKeys | null;
}[] = [
  { title: "ID", key: "otherList.id" },
  { title: "Name", key: "otherList.userName" },
  { title: "Added At", key: "otherList.addedAt" },
  { title: "Relationship", key: null }
];
