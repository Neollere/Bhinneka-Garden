import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaHome, FaQuestion, FaRegNewspaper, FaShoppingCart, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const icons = [
  { icon: <FaHome />, label: "Home", path: "/" },
  { icon: <FaShoppingCart />, label: "Cart", path: "/cart" },
  { icon: <FaRegNewspaper />, label: "News", path: "/news" },
  { icon: <FaQuestion />, label: "About", path: "/about" },
  { icon: <FaUser />, label: "Profile", path: "/account" },
];

export default function BottomNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeIdx = icons.findIndex(item => item.path === location.pathname);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  // Observer untuk footer
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) {
      setHide(false); // pastikan navbar muncul jika tidak ada footer
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHide(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleClick = (idx: number) => {
    const btn = btnRefs.current[idx];
    if (btn) {
      gsap.fromTo(
        btn,
        { scale: 1 },
        { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
    navigate(icons[idx].path);
  };

  return (
    <div
      className={`fixed bottom-1 left-1/2 -translate-x-1/2 z-9999 transition-opacity duration-300 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        ref={barRef}
        className="flex items-center bg-white rounded-full px-1 py-2 shadow-lg"
      >
        {icons.map((item, idx) => (
          <button
            key={item.label}
            ref={el => {
              btnRefs.current[idx] = el;
            }}
            onClick={() => handleClick(idx)}
            className={`mx-2 flex items-center justify-center w-12 h-12 rounded-full transition-colors
              ${activeIdx === idx ? "bg-black" : "bg-white"}
            `}
            style={{
              border: activeIdx === idx ? "3px solid black" : "3px solid transparent",
            }}
          >
            <span
              className={`text-2xl transition-colors
                ${activeIdx === idx ? "text-white" : "text-black/60"}
              `}
            >
              {item.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}