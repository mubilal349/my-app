import React from "react";

const ControlSection = () => {
  return (
    <>
      <div className="relative w-full  sm:aspect-[3/4] md:h-screen">
        <img
          src="/img/img-7.webp"
          alt=""
          className="w-full h-full object-contain md:object-cover object-center"
          style={{ objectPosition: "right 20%" }}
        />
      </div>

      <div className="relative w-full  sm:aspect-[3/4] md:h-screen">
        <img
          src="/img/img-8.jpg"
          alt=""
          className="w-full h-full object-contain md:object-cover object-center"
          style={{ objectPosition: "left 20%" }}
        />
      </div>

      <div className="relative w-full  sm:aspect-[3/4] md:h-screen">
        <img
          src="/img/img-9.webp"
          alt=""
          className="w-full h-full object-contain md:object-cover object-center"
          style={{ objectPosition: "right 20%" }}
        />
      </div>
    </>
  );
};

export default ControlSection;
