import { useEffect, useRef, useState } from "react";
import { TimelineItem } from "./TimelineItem";
import timeline1 from "@/assets/timeline-1.jpg";
import timeline2 from "@/assets/timeline-2.jpg";
import timeline3 from "@/assets/timeline-3.jpg";
import timeline4 from "@/assets/timeline-4.jpg";

interface TimelineItemData {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
}

const timelineData: TimelineItemData[] = [
  {
    id: 1,
    date: "2024",
    title: "Project Genesis",
    description: "The beginning of our innovative journey with cutting-edge design and modern technology.",
    image: timeline1,
    side: "left",
  },
  {
    id: 2,
    date: "2023",
    title: "Mountain Discovery",
    description: "Exploring new horizons and pushing boundaries to reach unprecedented heights.",
    image: timeline2,
    side: "right",
  },
  {
    id: 3,
    date: "2022",
    title: "Architecture Vision",
    description: "Building the foundation for tomorrow with sustainable and innovative design principles.",
    image: timeline3,
    side: "left",
  },
  {
    id: 4,
    date: "2021",
    title: "Creative Workspace",
    description: "Establishing a collaborative environment that fosters creativity and productivity.",
    image: timeline4,
    side: "right",
  },
];

export const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemsRef = useRef<Map<number, HTMLElement>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = parseInt(entry.target.getAttribute("data-id") || "0");
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, itemId]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    const currentItems = Array.from(itemsRef.current.values());
    currentItems.forEach((item) => {
      if (observerRef.current) {
        observerRef.current.observe(item);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setItemRef = (id: number, element: HTMLElement | null) => {
    if (element) {
      itemsRef.current.set(id, element);
    } else {
      itemsRef.current.delete(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Our Journey Through Time
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover the milestones that shaped our story and the moments that defined our path forward.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 timeline-line h-full top-0 hidden md:block"></div>
          
          {/* Mobile Timeline Line */}
          <div className="absolute left-8 w-1 timeline-line h-full top-0 md:hidden"></div>

          <div className="space-y-24 md:space-y-32">
            {timelineData.map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                isVisible={visibleItems.has(item.id)}
                ref={(el) => setItemRef(item.id, el)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};