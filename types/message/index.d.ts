export interface MessageDetail {
  id: string;
  userId: string;
  userName: string;
  content: ImageContent | LinkContent | FileContent | TextContent;
  createdAt: Date;
  flag: boolean;
}
export interface MessageData {
  message: MessageDetail;
}

export interface MessageDetailProps {
  message: MessageData[];
  handleSave: any;
}
