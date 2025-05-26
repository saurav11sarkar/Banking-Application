"use client";

import * as React from "react";
import { Banknote, Bot, Settings2, SquareTerminal } from "lucide-react";

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
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Services",
      url: "/amount",
      icon: Banknote,
      items: [
        {
          title: "Amount",
          url: "/amount",
        },
        {
          title: "Transaction",
          url: "/transaction",
        },
        {
          title: "Fixed Deposit",
          url: "/fixed-deposit",
        },
        {
          title: "ATM Card",
          url: "/atm-card",
        },
      ],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: Settings2,
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
        <NavUser user={user ?? { name: "", email: ""}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
