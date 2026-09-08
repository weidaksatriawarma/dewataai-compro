import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  BubbleChatIcon,
  Shield01Icon,
  GridViewIcon,
  Building03Icon,
  BookOpen01Icon,
  Analytics01Icon,
  Route01Icon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

/** Keyed off `icon` in lib/site.ts so both locales draw the same glyph. */
const ICONS = {
  booking: Calendar03Icon,
  chat: BubbleChatIcon,
  safety: Shield01Icon,
  register: GridViewIcon,
  about: Building03Icon,
  vision: Rocket01Icon,
  manifesto: BookOpen01Icon,
  investor: Analytics01Icon,
  thesis: Route01Icon,
} as const

type Item = { label: string; href: string; desc?: string; icon?: keyof typeof ICONS }
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
      <NavigationMenuList className="gap-2 lg:gap-5">
        {groups.map((group) => (
          <NavigationMenuItem key={group.label}>
            <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-4 text-sm font-medium text-ink/70 hover:bg-muted hover:text-ink data-open:bg-muted data-open:text-ink data-popup-open:bg-muted">
              {group.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:mt-2.5 group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-hairline group-data-[viewport=false]/navigation-menu:bg-background group-data-[viewport=false]/navigation-menu:p-2 group-data-[viewport=false]/navigation-menu:shadow-[0_22px_60px_-28px_rgba(0,0,0,0.5)] group-data-[viewport=false]/navigation-menu:ring-0">
              <ul className="w-[23rem] space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      {/* The icon/label/description layout lives on an inner
                          element: asChild concatenates classes rather than
                          merging them, so the primitive's own `flex` would beat
                          any display utility set here. */}
                      <a
                        href={item.href}
                        className="rounded-xl px-3.5 py-3.5 transition-colors hover:bg-muted"
                      >
                        <span className="flex items-start gap-3.5">
                          {item.icon && (
                            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-hairline bg-muted text-ink">
                              <HugeiconsIcon
                                icon={ICONS[item.icon]}
                                size={17}
                                strokeWidth={1.7}
                              />
                            </span>
                          )}
                          <span className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-ink">{item.label}</span>
                            {item.desc && (
                              <span className="text-xs leading-relaxed text-muted-foreground">
                                {item.desc}
                              </span>
                            )}
                          </span>
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
                className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-ink/70 transition-colors hover:bg-muted hover:text-ink"
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
