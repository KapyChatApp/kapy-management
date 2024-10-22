import { CreationItemProps, SidebarLink } from "@/types";

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

export const creationItem: CreationItemProps[] = [
  {
    title: "Full name",
    type: "text",
    key: "name"
  },
  {
    title: "Phone number",
    type: "number",
    key: "phone"
  },
  {
    title: "Nationality",
    type: "select",
    key: "nation"
  },
  {
    title: "Date of birth",
    type: "date",
    key: "date"
  },
  {
    title: "Email",
    type: "text",
    key: "email"
  },
  {
    title: "Experience",
    type: "text",
    key: "experience"
  },
  {
    title: "Country",
    type: "select",
    key: "country"
  },
  {
    title: "District",
    type: "select",
    key: "district"
  },
  {
    title: "City",
    type: "select",
    key: "city"
  },

  {
    title: "Address",
    type: "text",
    key: "address"
  },
  {
    title: "Username",
    type: "text",
    key: "username"
  },
  {
    title: "Password",
    type: "text",
    key: "password"
  }
];
