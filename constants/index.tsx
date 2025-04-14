import { CreationItemProps, Notifications, SidebarLink } from "@/types";

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

export const notifications: Notifications[] = [
  {
    id: "1",
    title: "Account",
    content: "Your account has been successfully updated.",
    value: "account",
    isRead: false
  },
  {
    id: "2",
    title: "Report",
    content: "Your weekly report is ready for review.",
    value: "report",
    isRead: true
  },
  {
    id: "3",
    title: "Message",
    content: "You have received a new message from John.",
    value: "message",
    isRead: false
  },
  {
    id: "4",
    title: "Account",
    content: "Password changed successfully.",
    value: "account",
    isRead: true
  },
  {
    id: "5",
    title: "Message",
    content: "You have received a new message from Alice.",
    value: "message",
    isRead: false
  },
  {
    id: "6",
    title: "Report",
    content: "Monthly sales report is available.",
    value: "report",
    isRead: true
  }
];

export const censors = [
  { value: "message", label: "Message", icon: "uiw:message" },
  { value: "post", label: "Post", icon: "solar:feed-linear" }
];
