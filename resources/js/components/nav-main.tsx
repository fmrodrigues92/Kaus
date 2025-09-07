import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                            {item.tree && item.tree.length > 0 &&
                                <div className="ml-6 h-auto rounded-b-lg overflow-y-auto">
                                    {item.tree.map((subItem) => (
                                        <Link key={subItem.title} href={subItem.href} className="flex items-center px-2 py-1 rounded-md text-sm hover:bg-accent-foreground/10 " prefetch>
                                            {subItem.icon && <subItem.icon className="mr-2 size-4" />}
                                            <span>{subItem.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            }
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
