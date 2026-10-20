import { useState } from "react";

export interface AccordionGalleryItem {
  image: string;
  label: string;
  text?: string;
  link?: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: "hover" | "click";
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  height?: number;
  gap?: number;
  radius?: number;
  orientation?: "horizontal" | "vertical";
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = "hover",
  overlayColor = "#0d1b3e",
  textColor = "#ffffff",
  grayscale = false,
  showLabels = true,
  duration = 0.6,
  height = 460,
  gap = 10,
  radius = 16,
  orientation = "horizontal",
}: AccordionGalleryProps) {
  const [active, setActive] = useState<number>(defaultIndex);
  const horizontal = orientation === "horizontal";
  const rest = (1 - expandRatio) / Math.max(items.length - 1, 1);

  return (
    <div
      role="list"
      className={`flex w-full ${horizontal ? "flex-row" : "flex-col"}`}
      style={{
        gap,
        height: horizontal ? height : undefined,
        width: horizontal ? undefined : "100%",
      }}
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const grow = isActive ? expandRatio : rest;
        return (
          <button
            key={item.image + i}
            type="button"
            role="listitem"
            aria-label={item.label}
            aria-expanded={isActive}
            onMouseEnter={trigger === "hover" ? () => setActive(i) : undefined}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="group relative min-w-0 overflow-hidden text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-aqua"
            style={{
              flexGrow: grow,
              flexBasis: 0,
              flexShrink: 1,
              minHeight: horizontal ? undefined : 72,
              borderRadius: radius,
              transitionDuration: `${duration}s`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionProperty: "flex-grow",
            }}
          >
            <img
              src={item.image}
              alt={item.label}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all ${
                grayscale && !isActive ? "grayscale" : ""
              }`}
              style={{
                transitionDuration: `${duration}s`,
                transform: isActive ? "scale(1)" : "scale(1.08)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
            <div
              className="absolute inset-0 transition-opacity"
              style={{
                background: `linear-gradient(to top, ${overlayColor}e6 0%, ${overlayColor}66 45%, transparent 75%)`,
                opacity: isActive ? 1 : 0.35,
                transitionDuration: `${duration}s`,
              }}
            />
            {showLabels && (
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p
                  className="font-display text-lg font-bold whitespace-nowrap"
                  style={{ color: textColor }}
                >
                  {item.label}
                </p>
                {item.text && (
                  <p
                    className="mt-1 text-sm transition-all"
                    style={{
                      color: textColor,
                      opacity: isActive ? 0.75 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(8px)",
                      transitionDuration: `${duration}s`,
                    }}
                  >
                    {item.text}
                  </p>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
