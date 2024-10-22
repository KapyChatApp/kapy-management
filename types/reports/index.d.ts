export interface ImageContent {
  type: "image";
  url: string;
  altText: string;
}
export interface LinkContent {
  type: "link";
  url: string;
  title: string;
}
export interface FileContent {
  type: "file";
  fileName: string;
  fileUrl: string;
  fileType: string;
}

export interface TextContent {
  type: "text";
  content: string;
}

export interface PersonReport {
  id: string;
  name: string;
  status: boolean;
  type: "user";
}

export interface ReportDetail {
  id: string;
  reporterInfo: PersonReport;
  reportedInfo: PersonReport;
  createdAt: Date;
  title: string;
  content: string;
  targetedItem:
    | ImageContent
    | LinkContent
    | FileContent
    | PersonReport
    | TextContent;
  status: string;
}

export interface ReportData {
  report: ReportDetail;
}

export interface ReportDetailProps {
  report: ReportData[];
  handleSave: any;
}

export interface SelectionReportAction {
  key: string;
  value: string;
}
