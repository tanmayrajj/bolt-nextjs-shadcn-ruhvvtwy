"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <SidebarMenuItem suppressHydrationWarning>
            <SidebarMenuButton asChild size="sm" tooltip={theme === "dark" ? "Light mode" : "Dark mode"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <button>
                    {theme === "dark" ? <Sun /> : <Moon />}
                    <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
                </button>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
