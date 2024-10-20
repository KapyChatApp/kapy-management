import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "clarity:sun-line" },
  { value: "dark", label: "Dark", icon: "carbon:moon" },
  {
    value: "system",
    label: "System",
    icon: "material-symbols:computer-outline"
  }
];

export const sidebarLinks: SidebarLink[] = [
  {
    icon: "tabler:report",
    route: "/",
    label: "Dashboard"
  },
  {
    icon: "material-symbols:supervisor-account-outline",
    route: "/account",
    label: "Accounts"
  },
  {
    icon: "uiw:message",
    route: "/message",
    label: "Messages"
  },
  {
    icon: "material-symbols:report-outline",
    route: "/report",
    label: "Reports"
  }
];
