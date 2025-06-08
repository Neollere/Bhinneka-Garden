import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const MainFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={footerRef}
      className="w-full bg-[#181c24] text-gray-300 py-6 px-4 flex flex-col md:flex-row items-center md:items-center justify-between shadow-inner rounded-t-2xl"
    >
      <div className="mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
        <span className="font-semibold text-lg">Bhinneka-1o</span> &copy; {new Date().getFullYear()}
      </div>
      <div className="flex flex-wrap justify-center md:justify-end gap-4 w-full md:w-auto">
        <a href="#" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Contact</a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
          aria-label="Instagram"
        >
          {/* Instagram SVG */}
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z"/>
          </svg>
        </a>
        <a
          href="https://youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
          aria-label="YouTube"
        >
          {/* YouTube SVG */}
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.13 5.5 12 5.5 12 5.5s-6.13 0-7.86.56a2.75 2.75 0 0 0-1.94 1.94C2.5 9.73 2.5 12 2.5 12s0 2.27.56 3.999a2.75 2.75 0 0 0 1.94 1.94C5.87 18.5 12 18.5 12 18.5s6.13 0 7.86-.56a2.75 2.75 0 0 0 1.94-1.94C21.5 14.27 21.5 12 21.5 12s0-2.27-.56-3.999zM10.5 15.5v-7l6 3.5-6 3.5z"/>
          </svg>
        </a>
        <a
          href="https://tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#25F4EE] transition"
          aria-label="TikTok"
        >
          {/* TikTok SVG */}
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.25 2a1 1 0 0 1 1 1v2.25a3.75 3.75 0 0 0 3.75 3.75h.25a1 1 0 1 1 0 2h-.25A5.75 5.75 0 0 1 16 3.25V3a1 1 0 0 1 1-1zm-4.5 4A5.75 5.75 0 1 1 7 17.75a1 1 0 1 1 2 0 3.75 3.75 0 1 0 3.75-3.75 1 1 0 1 1 0-2A5.75 5.75 0 0 1 12.75 6z"/>
          </svg>
        </a>
      </div>
    </motion.footer>
  );
};

export default MainFooter;