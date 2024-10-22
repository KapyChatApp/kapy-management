import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { notifications } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Notification = () => {
  const [notificate, setNotificate] = useState(false);
  useEffect(() => {
    const hasUnreadNotifications = notifications.some((item) => !item.isRead);
    setNotificate(hasUnreadNotifications);
  }, [notificate]);

  //backend-update-status
  const handleValueChange = (value: boolean, id: string) => {
    notifications.forEach((item) => {
      if (item.id === id) {
        item.isRead = true;
      }
    });
    const hasUnreadNotifications = notifications.some((item) => !item.isRead);
    setNotificate(hasUnreadNotifications);
  };

  return (
    <Menubar className="relative border-none bg-transparent shadow-none h-9 w-9 p-0">
      <MenubarMenu>
        <MenubarTrigger className="w-fit h-fit rounded-full bg-transparent p-0">
          <div
            className={`flex w-9 h-9 rounded-full items-center justify-center cursor-pointer ${
              notificate
                ? "bg-primary-200"
                : "bg-light-800 dark:bg-dark-300 hover:bg-light-300 hover:dark:bg-dark-300"
            }`}
          >
            {notificate ? (
              <Icon
                icon="clarity:notification-line"
                width={24}
                height={24}
                className="text-primary-500"
              />
            ) : (
              <Icon
                icon="clarity:notification-line"
                width={24}
                height={24}
                className="text-dark100_light900"
              />
            )}
          </div>
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-1 min-w-[458px] rounded-lg border py-2 background-light900_dark200 border-light-500 cursor-pointer max-h-[189px] overflow-scroll scrollable">
          {notifications.map((item, index) => (
            <MenubarItem
              key={item.value}
              onClick={() => {
                handleValueChange(item.isRead, item.id);
              }}
              className={`w-full h-fit p-0 bg-transparent`}
            >
              <Link
                href={`/${item.value}`}
                className={`flex items-center justify-between px-2.5 py-2 cursor-pointer hover:background-light700_dark400 w-full rounded-lg ${
                  index === notifications.length - 1 ? "" : "border-b-light-500"
                }`}
              >
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="text-dark100_light900 paragraph-semibold">
                    {item.title}
                  </p>
                  <p className="text-dark100_light900 body-light">
                    {item.content}
                  </p>
                </div>
                {item.isRead ? (
                  <Icon
                    icon="teenyicons:tick-outline"
                    width={16}
                    height={16}
                    className="text-accent-green"
                  />
                ) : (
                  <Icon
                    icon="mdi:dot"
                    width={30}
                    height={30}
                    className="text-accent-red"
                  />
                )}
              </Link>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Notification;
