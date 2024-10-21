export interface SidebarLink {
  icon: string;
  route: string;
  label: string;
}

export interface TopPageProps {
  titlePage: string;
  selectionItem: SelectionItem[];
  filterItem: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  otherClasses: string;
}

export interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  indexOfLastItem: number;
  indexOfFirstItem: number;
  totalPages: number;
  dataLength: number;
}

export interface TableProps {
  indexOfLastItem: number;
  indexOfFirstItem: number;
  filterItem: string;
  itemsPerPage: number;
  inputValue: string;
}

export interface ConfirmModalProps {
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  action: string;
}
