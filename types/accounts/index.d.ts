export interface SelectionItem {
  value: string;
  label: string;
}

export interface PostList {
  id: string;
  title: string;
  createdAt: Date;
  flag: boolean;
}

export interface FriendList {
  id: string;
  userName: string;
  addedAt: Date;
  relationship: string;
}

export interface AccountDetail {
  userId: string;
  userName: string;
  fullName: string;
  ava: string;
  email: string;
  phone: string;
  birth: Date;
  address: string;
  country: string;
  status: boolean;
  createdAt: Date;
  postList: PostList[];
  pointTrust: string;
  friendList: FriendList[];
}

export interface AccountData {
  account: AccountDetail;
}

export interface AccountDetailProps {
  account: AccountData[];
  handleSave: any;
}
