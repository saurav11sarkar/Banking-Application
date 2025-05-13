"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";


// import { NavProjects } from "@/components/modules/dashboard/nav-projects"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContexts";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";


// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Shop",
      url: "/user/shop/all-products",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/user/shop/product",
        },
        {
          title: "Manage Categories",
          url: "/user/shop/categorie",
        },
        {
          title: "Manage Brands",
          url: "/user/shop/brand",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/user/settings/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? { name: "", email: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
