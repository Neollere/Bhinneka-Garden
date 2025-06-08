import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const newsData = [
  {
    id: 1,
    title: "Visi & Misi",
    summary:
      "Visi: Mewujudkan Taman Edukasi Interaktif yang memperkenalkan kekayaan Indonesia dengan cara yang modern, inspiratif, dan membangkitkan rasa kebanggaan nasional.",
    content:
      "Misi : Menghadirkan wahana budaya, suku bangsa, dan kekayaan alam secara interaktif. Mengintegrasikan teknologi masa kini seperti VR, AR, AI, dan ruangLED 3D untuk memperkuat pengalaman pengunjung.•Menumbuhkan rasa cinta tanah air dan kesadaran Bhineka TunggalIka.•Memberikan pengalaman fisik, emosional, dan spiritual tentang makna persatuan dalam keberagaman.",
  },
  {
    id: 2,
    title: "Mengapa Taman Bhineka?",
    summary:
      "SpaceX successfully launches its latest rocket into orbit, marking a new milestone.",
    content:
      "Diperkirakan Indonesia memiliki lebih dari 17.000 pulau, 1.300 suku bangsa, dan ratusan bahasa daerah. Kekayaan budaya, alam, dan kearifan lokal ini adalah identitas sekaligus kekuatan bangsa. Namun, di tengah arus globalisasi dan perkembangan zaman, kesadaran akan pentingnya persatuan dalam keberagaman (Bhinneka Tunggal Ika) perlu terus dipupuk, khususnya pada generasi muda. Taman Bhineka adalah wahana interaktif modern yang menghadirkan kekayaan alam, suku bangsa, dan budaya Indonesia dari Sabang sampai Merauke. Menggunakan teknologi terkini seperti VR, AR, AI, hologram, dan LED Room 3D, taman ini menawarkan pengalaman yang edukatif, menghibur, dan membangkitkan kesadaran akan persatuan bangsa. Taman Bhineka: Indonesia Dalam Genggaman hadir sebagai jawaban atas tantangan ini: menciptakan pengalaman edukatif, imersif, dan menyenangkan tentang kekayaan Indonesia dengan memanfaatkan teknologi terkini.",
  },
  {
    id: 3,
    title: "Climate Change Conference 2025",
    summary:
      "World leaders gather to discuss urgent climate action and sustainable solutions.",
    content:
      "Full article about the 2025 Climate Change Conference. Key takeaways, agreements, and future plans.",
  },
];

export default function NewsPage() {
  const listRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, []);

  // Update tinggi konten saat expandedId berubah
  useEffect(() => {
    if (expandedId !== null && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [expandedId]);

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        About Taman Bhineka
      </motion.h1>
      <div ref={listRef}>
        {newsData.map((news) => {
          const isExpanded = expandedId === news.id;
          return (
            <motion.div
              key={news.id}
              layout
              onClick={() => setExpandedId(isExpanded ? null : news.id)}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
              style={{
                background: isExpanded ? "#f5f8ff" : "#fff",
                borderRadius: 18,
                padding: isExpanded ? "2.5rem" : "1.5rem",
                marginBottom: "2rem",
                boxShadow: isExpanded
                  ? "0 6px 32px rgba(0,0,0,0.10)"
                  : "0 2px 12px rgba(0,0,0,0.04)",
                cursor: "pointer",
                overflow: "hidden",
                transition: "background 0.3s, box-shadow 0.3s, padding 0.3s",
              }}
              transition={{
                layout: { duration: 0.6, type: "spring", bounce: 0.25 },
              }}
            >
              <h2 style={{ margin: 0 }}>{news.title}</h2>
              <p style={{ margin: "0.5rem 0 0 0", color: "#555" }}>
                {news.summary}
              </p>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: contentHeight }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      opacity: { duration: 0.35 },
                      height: { duration: 0.5, ease: "easeInOut" },
                    }}
                    style={{
                      marginTop: "1.5rem",
                      color: "#333",
                      fontSize: "1.08rem",
                      lineHeight: 1.7,
                      overflow: "hidden",
                    }}
                  >
                    {/* Ref dipasang di div ini untuk ukur scrollHeight */}
                    <div ref={contentRef}>
                      {news.content
                        .split("•")
                        .map((part, i) => (
                          <p key={i} style={{ marginBottom: "1rem" }}>
                            {part.trim()}
                          </p>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
