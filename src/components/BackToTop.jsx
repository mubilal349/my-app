import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react"; // optional icon (install: npm install lucide-react)

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "0.3s",
            zIndex: 9999,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1883ca")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
        >
          <ChevronUp size={22} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
