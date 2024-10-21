import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import TableOtherList from "./TableOtherList";
import { AccountDetailProps } from "@/types/accounts";

const PostDetail = ({ account }: AccountDetailProps) => {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="bx:detail"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">
          Post Detail ({account[0].account.postList.length})
        </p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>
      <div className="flex flex-row gap-1 items-center justify-start">
        <Icon
          icon="material-symbols-light:star-outline"
          width={20}
          height={20}
          className="text-dark100_light900"
        />
        <div className="flex flex-row gap-2 items-center justify-start">
          <p className="text-dark100_light900 paragraph-15-light">
            Point trust:
          </p>
          <p className="text-dark100_light900 paragraph-15-semibold">
            {account[0].account.pointTrust}
          </p>
        </div>
      </div>
      <div className="w-full h-fit border-light-500 rounded-xl border-[0.5px] items-center justify-center p-2">
        <TableOtherList otherList={account[0].account.postList} />
      </div>
    </div>
  );
};

export default PostDetail;
