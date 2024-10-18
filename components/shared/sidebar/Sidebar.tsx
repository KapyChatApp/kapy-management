"use client";
import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/constants/index";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

const Sidebar = () => {
  const [isParagraphVisible, setIsParagraphVisible] = useState(true);

  const toggleParagraphVisibility = () => {
    setIsParagraphVisible(!isParagraphVisible);
  };

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 992) {
        setIsParagraphVisible(false);
      } else {
        setIsParagraphVisible(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <section
        className={`background-light850_dark200 flex h-screen flex-col justify-center overflow-hidden border-none p-[16px] ${
          isParagraphVisible ? "w-[22%]" : "min-h-fit"
        }`}
      >
        <div className={`flex-1 w-full items-center justify-center`}>
          <div className={`flex flex-col w-full items-center justify-center `}>
            <Link
              key="logo"
              href="/"
              className={`text-dark100_light900 flex items-center ${
                isParagraphVisible ? "justify-start" : "justify-center"
              } bg-transparent gap-3 md:gap-1 w-full`}
            >
              <Image
                src="/assets/images/icon.png"
                alt="logo"
                width={34}
                height={34}
              />
              {isParagraphVisible && (
                <p className="max-sm:text-wrap h-fit chewy-regular xl:h2-bold h3-medium">
                  KAPY ChatApp
                </p>
              )}
            </Link>
          </div>
          <div
            className={`flex flex-col mt-[24px] ${
              isParagraphVisible
                ? "w-full"
                : "w-fit items-center justify-center"
            }`}
          >
            {sidebarLinks.map((item) => {
              const isDynamicPath = /^\/\d+$/.test(pathname);
              const isGroupDynamicPath = pathname.startsWith("/groups/");
              const isFriendDynamicPath = pathname.startsWith("/friends/");
              const isActive =
                pathname === item.route ||
                (isDynamicPath && item.route === "/") ||
                (isGroupDynamicPath && item.route === "/groups") ||
                (isFriendDynamicPath && item.route === "/friends");
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={`${
                    isActive
                      ? "bg-light-700 dark:bg-dark-400 dark:bg-opacity-80 rounded-lg w-full h-[44px] text-dark100_light900"
                      : "text-dark100_light900 bg-transparent"
                  } flex items-center justify-start hover:bg-light-700 hover:dark:bg-dark-400 hover:dark:bg-opacity-80 hover:rounded-lg`}
                >
                  <div className="bg-transparent flex items-end justify-start p-[12px]">
                    <Icon
                      icon={item.icon}
                      width={20}
                      height={20}
                      className="text-light900_dark100"
                    />
                    {isParagraphVisible && (
                      <p className="paragraph-regular ml-[12px]">
                        {item.label}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
