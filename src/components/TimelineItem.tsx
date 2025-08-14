import { forwardRef } from "react";

interface TimelineItemData {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
}

interface TimelineItemProps {
  item: TimelineItemData;
  isVisible: boolean;
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ item, isVisible }, ref) => {
    const { date, title, description, image, side } = item;

    return (
      <div
        ref={ref}
        data-id={item.id}
        className={`
          relative flex items-center justify-center
          ${side === "left" ? "md:justify-start" : "md:justify-end"}
        `}
      >
        {/* Desktop Layout - Column-based */}
        <div className="hidden md:block w-full">
          <div className="grid grid-cols-2 gap-8 relative">
            {/* Left Column */}
            <div className={`${side === "left" ? "flex justify-end" : ""}`}>
              {side === "left" && (
                <div
                  className={`
                    timeline-item timeline-item-left
                    ${isVisible ? "animate-in" : ""}
                    text-right max-w-lg
                  `}
                >
                  <div className="timeline-image w-96 h-96 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className={`${side === "right" ? "flex justify-start" : ""}`}>
              {side === "right" && (
                <div
                  className={`
                    timeline-item timeline-item-right
                    ${isVisible ? "animate-in" : ""}
                    text-left max-w-lg
                  `}
                >
                  <div className="timeline-image w-96 h-96 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
            </div>

            {/* Date Marker - Centered over the gap */}
            <div
              className={`
                absolute left-1/2 top-48 transform -translate-x-1/2 -translate-y-1/2
                timeline-date px-6 py-3 rounded-full text-sm font-bold
                transition-all duration-500 delay-200
                ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
              `}
            >
              {date}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full pl-16">
          <div
            className={`
              timeline-item timeline-item-right
              ${isVisible ? "animate-in" : ""}
            `}
          >
            {/* Date Marker for Mobile */}
            <div
              className={`
                absolute left-8 top-6 transform -translate-x-1/2
                timeline-date px-4 py-2 rounded-full text-xs font-bold
                transition-all duration-500 delay-200
                ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
              `}
            >
              {date}
            </div>

            {/* Content */}
            <div className="text-left">
              <div className="timeline-image w-full max-w-md h-80 rounded-2xl overflow-hidden mb-6">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";