import { ReportResponseDTO } from "@/lib/DTO/report";
import { UserResponseDTO } from "@/lib/DTO/user";
import { useState } from "react";

const useSearchReport = (ReportList: ReportResponseDTO[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const list = ReportList.filter((item) => {
    const content = `${item.content}`.toLowerCase().trim();
    const id = item._id.toLowerCase();
    const createBy = `${item.userId.firstName} ${item.userId.firstName}`
      .toLowerCase()
      .trim();
    const createAt = new Date(item.createAt).toLocaleString().trim();
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    return (
      content.includes(lowerCaseSearchTerm) ||
      id.includes(lowerCaseSearchTerm) ||
      createBy.includes(lowerCaseSearchTerm) ||
      createAt.includes(lowerCaseSearchTerm)
    );
  });

  return { searchTerm, setSearchTerm, list };
};

export default useSearchReport;
