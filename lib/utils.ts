import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date | string): string => {
  const now = new Date();

  // Chuyển đổi chuỗi thành Date nếu cần
  const createdDate =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  // Kiểm tra xem createdDate có hợp lệ không
  if (isNaN(createdDate.getTime())) {
    return "Invalid date";
  }

  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? `${interval} year ago` : `${interval} years ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? `${interval} month ago` : `${interval} months ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? `${interval} day ago` : `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1
      ? `${interval} minute ago`
      : `${interval} minutes ago`;
  }

  return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
};

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Nếu dateString không phải là một chuỗi ngày hợp lệ
    return "Invalid date";
  }
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(dateString: Date): string {
  const date = new Date(dateString);
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };

  // Kiểm tra ngày
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  const isSameYear = date.getFullYear() === now.getFullYear(); // Kiểm tra năm

  if (isToday) {
    return `Today, ${date.toLocaleTimeString([], options)}`;
  } else if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], options)}`;
  } else {
    // Nếu năm không giống nhau, hiển thị năm
    const dateStringFormat = isSameYear
      ? date.toLocaleDateString(undefined, { month: "long", day: "numeric" }) // Không hiển thị năm
      : date.toLocaleDateString(); // Hiển thị năm

    return `${dateStringFormat}, ${date.toLocaleTimeString([], options)}`;
  }
}

export const getDefaultIcon = (type: string) => {
  switch (type) {
    case "docx":
      return "mdi:file-word";
    case "doc":
      return "mdi:file-word";
    case "pptx":
      return "mdi:file-powerpoint";
    case "xlsx":
      return "mdi:file-excel";
    case "pdf":
      return "bxs:file-pdf";
    default:
      return "basil:document-solid"; // Icon mặc định
  }
};

export const getDeviceInfo = () => {
  // Lấy thông tin trình duyệt từ user-agent (dùng window.navigator)
  const userAgent = window.navigator.userAgent;

  // Phân loại loại thiết bị
  let deviceType = "DESKTOP"; // Mặc định là DESKTOP
  if (/android/i.test(userAgent)) {
    deviceType = "PHONE"; // Android là điện thoại
  } else if (/iphone/i.test(userAgent)) {
    deviceType = "PHONE"; // iPhone là điện thoại
  } else if (/ipad|tablet/i.test(userAgent)) {
    deviceType = "TABLET"; // iPad hoặc thiết bị tablet
  } else if (/windows/i.test(userAgent) && /touch/i.test(userAgent)) {
    deviceType = "TABLET"; // Windows touch device có thể là tablet
  } else if (/macintosh/i.test(userAgent)) {
    deviceType = "DESKTOP"; // macOS thường là máy tính để bàn
  }

  // Lấy ngôn ngữ của trang (document.documentElement.lang) cho vùng
  const region = document.documentElement.lang || "Unknown";

  // Thông tin về hệ điều hành từ user-agent
  const osName = userAgent.includes("Windows")
    ? "Windows"
    : userAgent.includes("Mac OS X")
    ? "macOS"
    : userAgent.includes("Linux")
    ? "Linux"
    : "Unknown OS";

  // Thông tin trình duyệt (dựa trên user-agent)
  const browser = userAgent.includes("Chrome")
    ? "Chrome"
    : userAgent.includes("Firefox")
    ? "Firefox"
    : userAgent.includes("Safari")
    ? "Safari"
    : userAgent.includes("Edge")
    ? "Edge"
    : "Unknown Browser";

  // Phiên bản hệ điều hành và trình duyệt (dựa trên user-agent)
  const osMatch = userAgent.match(
    /(Windows NT|Mac OS X|Linux|Android|iOS) ([\d._]+)/
  );
  const osVersion = osMatch ? osMatch[2] : "Unknown Version";

  // Thông tin về trình duyệt từ window
  const brand = window.navigator.vendor || "Unknown Vendor"; // Nhà cung cấp trình duyệt
  const modelName = window.navigator.appName || "Unknown Browser"; // Tên trình duyệt

  // Tạo thông tin thiết bị trả về
  const deviceInfo = {
    deviceName: userAgent,
    deviceType: deviceType,
    brand: brand,
    modelName: modelName,
    osName: osName,
    osVersion: osVersion,
    region: region,
    isSafe: true
  };

  return deviceInfo;
};
