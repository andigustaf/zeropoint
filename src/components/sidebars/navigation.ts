import {
  IoCashOutline,
  IoFileTrayFullOutline,
  IoFlashOutline,
  IoHomeOutline,
  IoPeopleCircleOutline,
  IoReceiptOutline,
  IoStatsChartOutline,
  IoTrendingUp,
} from "react-icons/io5";
import { IconType } from "react-icons";

export type Menu = {
  role: string[];
  url?: string;
  icon?: IconType;
  title: string;
  items?: any[];
  type?: string;
};

export const menus: Menu[] = [
  {
    role: ["admin"],
    url: "/admin",
    icon: IoHomeOutline,
    title: "Dashboard",
    items: [],
  },
  {
    role: ["admin"],
    url: "/admin/employees",
    icon: IoPeopleCircleOutline,
    title: "Employee",
    items: [],
  },
];
