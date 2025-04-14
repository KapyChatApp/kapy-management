"use client";

import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { censors, themes } from "@/constants/index";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalLayout from "@/components/censor/ModalLayout";

export const Censor = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Menubar className="relative border-none bg-transparent shadow-none h-9 w-9 p-0">
        <MenubarMenu>
          <MenubarTrigger className="focus:bg-slate-400 data-[state=open]:bg-slate-400 dark:focus:bg-slate-400 dark:data-[state=open]:bg-slate-400 rounded-full p-[6px] h-full w-fit bg-slate-400 cursor-pointer">
            <Icon
              icon="solar:shield-check-linear"
              width={24}
              height={24}
              className="text-light-900"
            />
          </MenubarTrigger>
          <MenubarContent className="absolute -right-12 mt-1 min-w-[120px] rounded-lg border py-2 dark:border-dark-500 dark:bg-dark-200 bg-light-900 border-light-500 cursor-pointer">
            {censors.map((item) => (
              <MenubarItem
                key={item.value}
                onClick={() => {
                  handleValueChange(item.value);
                }}
                className="flex items-center gap-4 px-2.5 py-2 focus:background-light700_dark400 cursor-pointer"
              >
                <Icon
                  icon={item.icon}
                  width={16}
                  height={16}
                  className="text-dark100_light900"
                />
                <p className="text-dark100_light900">{item.label}</p>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {selectedValue !== "" && (
        <ModalLayout
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
      )}
    </>
  );
};
