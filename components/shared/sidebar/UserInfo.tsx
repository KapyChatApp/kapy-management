"use client";

import React, { useState } from "react";

import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import Image from "next/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const UserInfo = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}auth/manage/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/signin";
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Menubar className="flex border-none bg-transparent shadow-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="h-fit w-fit bg-transparent cursor-pointer p-0">
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
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-1 min-w-[120px] rounded-lg border py-2 dark:border-dark-500 dark:bg-dark-200 bg-light-900 border-light-500 cursor-pointer">
          <MenubarItem
            key={""}
            onClick={handleLogout}
            className="flex items-center gap-4 px-2.5 py-2 focus:background-light700_dark400 cursor-pointer"
          >
            <p className={`paragraph-regular`}>Log out</p>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
