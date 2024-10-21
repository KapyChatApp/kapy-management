import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import TableOtherList from "./TableOtherList";
import { AccountDetailProps } from "@/types/accounts";

const FriendList = ({ account }: AccountDetailProps) => {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="la:user-friends"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">
          List Friend ({account[0].account.friendList.length})
        </p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>
      <div className="w-full h-fit border-light-500 rounded-xl border-[0.5px] items-center justify-center p-2">
        <TableOtherList otherList={account[0].account.friendList} />
      </div>
    </div>
  );
};

export default FriendList;
