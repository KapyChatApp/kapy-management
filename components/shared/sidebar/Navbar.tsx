import React from "react";
import GlobalSearch from "../search/globalSearch";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Theme } from "./Theme";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-6 justify-start items-center w-full h-fit bg-transparent">
      <div className="flex w-[879px] h-9 ">
        <GlobalSearch />
      </div>

      <Button className="flex w-9 h-9 p-[6px] rounded-full bg-light-800 dark:bg-dark-300 hover:bg-light-300 hover:dark:bg-dark-300">
        <Icon
          icon="clarity:notification-line"
          width={24}
          height={24}
          className="text-dark100_light900 bg-transparent"
        />
      </Button>

      <div className="flex h-fit w-fit">
        <Theme />
      </div>

      <div className="flex flex-row items-center justify-center rounded-lg h-9 w-[113px] background-light800_dark300 cursor-pointer">
        <div className="flex items-center justify-center w-fit h-fit gap-2 ">
          <Image
            src="/assets/ava/48.jpg"
            alt=""
            width={28}
            height={28}
            className="rounded-full"
          />
          <div className="flex flex-col w-full">
            <p className="text_dark100_light900 small-regular">Junie</p>
            <p className="text_dark100_light900 small-light">Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
