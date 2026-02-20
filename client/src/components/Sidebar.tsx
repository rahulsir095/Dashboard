"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  School,
  FileText,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Teachers", href: "/teachers", icon: Users },
  { label: "Classrooms", href: "/classrooms", icon: School },
  { label: "Reports", href: "/reports", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-64 min-h-screen p-6 flex flex-col
        bg-zinc-50 dark:bg-zinc-950
        border-r border-zinc-200 dark:border-zinc-800
      "
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold text-purple-600 mb-10">
        SAVRA
      </h1>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-purple-100 text-purple-900 font-semibold dark:bg-purple-900/30 dark:text-purple-200"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }
              `}
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? "text-purple-700 dark:text-purple-300"
                    : "text-purple-500"
                }
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="mt-8 text-sm">
        <div className="flex items-center gap-3">
          <div
            className="
              w-8 h-8 rounded-full
              bg-yellow-400 text-white
              flex items-center justify-center font-bold
            "
          >
            SR
          </div>

          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Shauryaman Ray
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              School Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}