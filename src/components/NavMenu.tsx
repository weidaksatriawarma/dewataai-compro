import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

type Item = { label: string; href: string; desc?: string }
type Group = { label: string; items: readonly Item[] }

interface Props {
  groups: readonly Group[]
  links: readonly Item[]
}

/**
 * Desktop navigation. Hydrated with `client:media` so the header ships no
 * JavaScript on phones, where the existing static panel already handles it.
 *
 * `viewport={false}` anchors each panel under its own trigger instead of a
 * shared floating viewport, which keeps the dropdown visually attached to the
 * word it belongs to.
 */
export default function NavMenu({ groups, links }: Props) {
  return (
    <NavigationMenu viewport={false} className="max-w-none">
      <NavigationMenuList className="gap-1 lg:gap-2">
        {groups.map((group) => (
          <NavigationMenuItem key={group.label}>
            <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-3 text-sm font-medium text-ink/70 hover:bg-muted hover:text-ink data-open:bg-muted data-open:text-ink data-popup-open:bg-muted">
              {group.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:rounded-xl group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-hairline group-data-[viewport=false]/navigation-menu:bg-background group-data-[viewport=false]/navigation-menu:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] group-data-[viewport=false]/navigation-menu:ring-0">
              <ul className="w-[22rem] divide-y divide-hairline">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      {/* The label/description stack lives on an inner element:
                          asChild concatenates classes rather than merging them,
                          so the primitive's own `flex` would otherwise beat any
                          display utility set here. */}
                      <a
                        href={item.href}
                        className="rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                      >
                        <span className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-ink">{item.label}</span>
                          {item.desc && (
                            <span className="text-xs leading-relaxed text-muted-foreground">
                              {item.desc}
                            </span>
                          )}
                        </span>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild>
              <a
                href={link.href}
                className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-ink/70 transition-colors hover:bg-muted hover:text-ink"
              >
                {link.label}
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
