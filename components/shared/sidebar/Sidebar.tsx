"use client";
import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/constants/index";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section
      className={`bg-transparent flex h-screen flex-col justify-start overflow-hidden border-none p-[16px] w-full`}
    >
      <div className={`flex flex-col w-full items-start justify-center`}>
        <div className={`flex flex-col w-full items-center justify-center `}>
          <Link
            key="logo"
            href="/"
            className={`text-dark100_light900 flex items-center justify-start bg-transparent gap-3 md:gap-1 w-full`}
          >
            <Image
              src="/assets/images/icon.png"
              alt="logo"
              width={34}
              height={34}
            />
            <p className="max-sm:text-wrap h-fit chewy-regular xl:h2-bold h3-medium">
              KAPY ChatApp
            </p>
          </Link>
        </div>
        <div className={`flex flex-col mt-[24px] w-full`}>
          {sidebarLinks.map((item) => {
            const isDynamicPath = /^\/\d+$/.test(pathname);
            const isAccountDynamicPath = pathname.startsWith("/account/");
            const isMessageDynamicPath = pathname.startsWith("/report/");
            const isActive =
              pathname === item.route ||
              (isDynamicPath && item.route === "/") ||
              (isAccountDynamicPath && item.route === "/account") ||
              (isMessageDynamicPath && item.route === "/message");
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`${
                  isActive
                    ? "bg-primary-500 text-light-900 hover:bg-primary-500"
                    : "text-dark100_light900 bg-transparent"
                } flex items-center justify-start rounded-lg hover:rounded-lg w-[240px]`}
              >
                <div className="bg-transparent flex items-end justify-start p-[12px]">
                  <Icon
                    icon={item.icon}
                    width={20}
                    height={20}
                    className="text-light900_dark100"
                  />
                  <p className="paragraph-regular ml-[12px]">{item.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
