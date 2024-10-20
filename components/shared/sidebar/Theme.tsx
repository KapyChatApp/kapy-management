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
import { themes } from "@/constants/index";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Theme = () => {
  const { mode, setMode } = useTheme();
  const [selectedValue, setSelectedValue] = useState(mode);
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (value !== "system") {
      setMode(value);
      localStorage.setItem("theme", value);
    } else {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const newMode = isSystemDark ? "dark" : "light";
      setMode(newMode);
      localStorage.removeItem("theme");
    }
  };

  return (
    <Menubar className="relative border-none bg-transparent shadow-none h-9 w-9 p-0">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-primary-500 data-[state=open]:bg-primary-500 dark:focus:bg-primary-500 dark:data-[state=open]:bg-primary-500 rounded-full p-[6px] h-full w-fit bg-primary-500 cursor-pointer">
          {mode === "light" ? (
            <Icon
              icon="clarity:sun-line"
              width={24}
              height={24}
              className="text-light-900"
            />
          ) : (
            <Icon
              icon="carbon:moon"
              width={24}
              height={24}
              className="text-light-900"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-1 min-w-[120px] rounded-lg border py-2 dark:border-dark-500 dark:bg-dark-200 bg-light-900 border-light-500 cursor-pointer">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={() => {
                handleValueChange(item.value);
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
              className="flex items-center gap-4 px-2.5 py-2 focus:background-light700_dark400 cursor-pointer"
            >
              <Icon
                icon={item.icon}
                width={16}
                height={16}
                className={`${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              />
              <p
                className={`paragraph-regular  ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
