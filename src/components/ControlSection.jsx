import React from "react";
import { useNavigate } from "react-router-dom";

const ControlSection = () => {
  const navigate = useNavigate();
  const sections = [
    {
      title: "Accessories",
      img: "/img/banner/landscape no 2.jpg",
      align: "left",
    },
    {
      title: "Design Your Wheel",
      img: "/img/banner/landscape no 3.jpg",
      align: "right",
    },
    { title: "Buy Now", img: "/img/banner/landscape no 1.jpg", align: "right" },
  ];
  const handleClick = () => {
    navigate("/accessories-page"); // 👈 route to your accessories page
  };

  return (
    <>
      {sections.map((section, index) => (
        <div
          key={index}
          className="relative w-full sm:aspect-[3/4] md:h-screen cursor-pointer group overflow-hidden"
          onClick={handleClick}
        >
          {/* Background Image */}
          <img
            src={section.img}
            alt={section.title}
            className="w-full h-full object-contain md:object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              objectPosition: section.align?.includes("left")
                ? "left 10%"
                : "right 10%",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default ControlSection;
