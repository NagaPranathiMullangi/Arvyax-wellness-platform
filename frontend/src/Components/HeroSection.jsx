import React, { useEffect, useRef } from "react";
import image1 from "../assets/image1.jpg";

const image2 =
  "https://mapmygenome.in/cdn/shop/articles/The_Benefits_of_Yoga_for_Mind_and_Body_-_Enhancing_Health_and_Wellness.webp?v=1718860676";

const image3 =
  "https://cdn.pixabay.com/photo/2016/11/18/15/05/beach-1835213_640.jpg";

const image5 =
  "https://media.post.rvohealth.io/wp-content/uploads/2020/02/man-exercising-plank-push-up-1200x628-facebook.jpg";

const images = [image1, image2, image3, image5];

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;
    const scrollStep = container.offsetWidth;

    const interval = setInterval(() => {
      if (container.scrollLeft + scrollStep >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        scrollAmount = 0;
      } else {
        scrollAmount += scrollStep;
        container.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex overflow-x-auto scroll-smooth w-full h-[60vh] whitespace-nowrap no-scrollbar">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="min-w-full h-[60vh] flex-shrink-0 flex items-center justify-center">
          <div className="w-[90vw] aspect-[16/6] flex items-center justify-center">
            <img
              src={img}
              alt={`hero-${idx}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
