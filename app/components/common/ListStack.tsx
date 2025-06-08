import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin);

type ListStackItem = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  date?: string;
  detail?: React.ReactNode;
  button?: React.ReactNode;
};

type ListStackProps = {
  items: ListStackItem[];
};

const CARD_HEIGHT = 60;
const STACK_OFFSET = 260;

const ListStack: React.FC<ListStackProps> = ({ items }) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (stackRef.current) {
      gsap.fromTo(
        stackRef.current.children,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.13,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [items, showAll]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: 620,
    minHeight: CARD_HEIGHT + STACK_OFFSET * (Math.max(1, (showAll ? items.length : 1)) - 1) + 200,
    margin: "2px auto",
    background: "#fff",
    borderRadius: 28,
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    padding: "24px 0 32px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  };

  const stackInnerStyle: React.CSSProperties = {
    position: "relative",
    width: "94vw",
    maxWidth: 300,
    minWidth: 0,
    minHeight: CARD_HEIGHT + STACK_OFFSET * (Math.max(1, (showAll ? items.length : 1)) - 1),
    boxSizing: "border-box",
  };

  const visibleItems = showAll ? items : items.slice(0, 1);

  return (
    <div style={containerStyle}>
      <div ref={stackRef} style={stackInnerStyle}>
        {visibleItems.map((item, idx) => {
          const top = showAll ? idx * STACK_OFFSET : 0;
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top,
                zIndex: visibleItems.length - idx,
                boxShadow:
                  idx === 0
                    ? "0 4px 16px rgba(0,0,0,0.07)"
                    : idx === 1
                    ? "0 2px 8px rgba(0,0,0,0.04)"
                    : "0 1px 4px rgba(0,0,0,0.03)",
                borderRadius: 18,
                background: "#fff",
                minHeight: CARD_HEIGHT,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "1.1rem 1.3rem",
                transition:
                  "top 0.45s cubic-bezier(.4,2,.6,1), box-shadow 0.2s, border-radius 0.2s",
                boxSizing: "border-box",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#18181b",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 18,
                  flexShrink: 0,
                  marginBottom: 8,
                }}
              >
                {item.icon ?? (
                  <svg
                    width={24}
                    height={24}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                )}
              </div>
              {/* Text */}
              <div style={{ flex: 1, width: "100%" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    color: "#18181b",
                    wordBreak: "break-word",
                  }}
                >
                  {item.title}
                </div>
                {item.subtitle && (
                  <div
                    style={{
                      color: "#71717a",
                      fontSize: "0.98rem",
                      marginTop: 2,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.subtitle}
                  </div>
                )}
                {/* Detail */}
                {item.detail && (
                  <div
                    style={{
                      color: "#444",
                      fontSize: "0.97rem",
                      marginTop: 2,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.detail}
                  </div>
                )}
                {/* Button */}
                {item.button && (
                  <div style={{ marginTop: 8 }}>{item.button}</div>
                )}
              </div>
              {/* Date */}
              {item.date && (
                <div
                  style={{
                    color: "#71717a",
                    fontSize: "0.97rem",
                    marginLeft: 0,
                    marginTop: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.date}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Show All / Hide Button */}
      <button
        onClick={() => {
          if (showAll) {
            gsap.to(window, { scrollTo: { y: 0 }, duration: 0.7, ease: "power2.inOut" });
            setShowAll(false);
          } else {
            setShowAll(true);
          }
        }}
        style={{
          marginTop: 220,
          padding: "0.7rem 2.2rem",
          borderRadius: 999,
          border: "2px solid #18181b",
          background: "#fff",
          fontWeight: 500,
          fontSize: "1.08rem",
          color: "#18181b",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "background 0.15s,border 0.15s",
          width: "90vw",
          maxWidth: 320,
        }}
      >
        {showAll ? "Hide" : "Show All"}
        <span
          style={{
            fontSize: 18,
            marginLeft: 8,
            transition: "transform 0.2s",
            transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>
    </div>
  );
};

export default ListStack;