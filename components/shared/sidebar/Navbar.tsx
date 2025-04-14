"use client";
import React from "react";
import GlobalSearch from "../search/globalSearch";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Theme } from "./Theme";
import Image from "next/image";
import Notification from "./Notification";
import { UserInfo } from "./UserInfo";
import { Censor } from "./Censor";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Navbar = () => {
  return (
    <div className="flex flex-row gap-6 justify-start items-center w-full h-fit bg-transparent">
      <div className="flex w-[879px] h-9 ">
        <GlobalSearch />
      </div>

      <div className="flex h-fit w-fit">
        <Censor />
      </div>

      {/* <Button className="flex w-9 h-9 p-[6px] rounded-full bg-light-800 dark:bg-dark-300 hover:bg-light-300 hover:dark:bg-dark-300">
        <Icon
          icon="clarity:notification-line"
          width={24}
          height={24}
          className="text-dark100_light900 bg-transparent"
        />
      </Button> */}

      <Notification />

      <div className="flex h-fit w-fit">
        <Theme />
      </div>

      <UserInfo />
    </div>
  );
};

export default Navbar;
