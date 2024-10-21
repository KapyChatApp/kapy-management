import { PaginationProps } from "@/types";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";

interface PaginationUI {
  page: PaginationProps;
}

const PaginationDisplay: React.FC<PaginationUI> = ({ page }) => {
  const {
    currentPage,
    setCurrentPage,
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    dataLength
  } = page;

  let displayedPages: any[] = [];
  let edgePage = 3;
  if (totalPages <= 5) {
    // Nếu tổng số trang nhỏ hơn hoặc bằng 5, hiển thị tất cả các trang
    displayedPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage > 3) {
      let distancePage = totalPages - currentPage;
      if (distancePage >= 3) {
        // Nếu trang hiện tại không là 4 trang cuối cùng
        if (currentPage > edgePage) {
          displayedPages = [
            currentPage,
            currentPage + 1,
            currentPage + 2,
            "...",
            totalPages
          ];
          edgePage = edgePage + 3;
        }
      } else {
        displayedPages = ["...", totalPages - 2, totalPages - 1, totalPages];
      }
    } else {
      displayedPages = [1, 2, 3, "...", totalPages];
    }
  }

  return (
    <div className="flex flex-row bg-transparent w-full justify-between items-center">
      {totalPages > 0 ? (
        <div className="flex items-center justify-start text-dark600_light600 body-light">
          Show {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, dataLength)}{" "}
          of {dataLength} results
        </div>
      ) : (
        <div className="flex items-center justify-start text-dark600_light600 body-light">
          Show {dataLength} results
        </div>
      )}
      <div className="flex w-fit h-fit">
        <Pagination className="mx-auto flex w-full justify-end">
          <PaginationContent className="flex flex-row items-center justify-end gap-[12px]">
            <PaginationItem>
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex w-fit h-fit bg-transparent hover:bg-transparent p-0"
              >
                <Icon
                  icon="carbon:previous-outline"
                  width={20}
                  height={18}
                  className="text-dark100_light900"
                />
              </Button>
            </PaginationItem>

            {displayedPages.map((page, index) => {
              if (page === "...") {
                return (
                  <PaginationItem key={`ellipsis`}>
                    <span className="text-dark600_light600 body-light">
                      ...
                    </span>
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => {
                        setCurrentPage(page);
                      }}
                      className={`${
                        currentPage === page
                          ? "active background-light500_dark300 rounded-full items-center justify-center h-fit w-fit"
                          : "items-center justify-center h-fit w-fit"
                      }`}
                    >
                      <p className="text-dark100_light900 body-light px-[6px] py-0">
                        {page}
                      </p>
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            })}

            <PaginationItem>
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex w-fit h-fit bg-transparent hover:bg-transparent p-0"
              >
                <Icon
                  icon="carbon:next-outline"
                  width={20}
                  height={18}
                  className="text-dark100_light900"
                />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationDisplay;
