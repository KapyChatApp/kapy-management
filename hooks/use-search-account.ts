import { UserResponseDTO } from "@/lib/DTO/user";
import { useState } from "react";

const useSearchAccount = (accountList: UserResponseDTO[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const list = accountList.filter((acc) => {
    const name = `${acc.firstName} ${acc.lastName}`.toLowerCase();
    const id = acc._id.toLowerCase();
    const phoneNumber = acc.phoneNumber.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      name.includes(lowerCaseSearchTerm) ||
      id.includes(lowerCaseSearchTerm) ||
      phoneNumber.includes(lowerCaseSearchTerm)
    );
  });

  return { searchTerm, setSearchTerm, list };
};

export default useSearchAccount;
