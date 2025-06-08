import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

type Message = {
  id: number;
  user: string;
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  { id: 1, user: "Alice", text: "Hi, welcome to the forum!", time: "09:00" },
  { id: 2, user: "Bob", text: "Hello Alice 👋", time: "09:01" },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // GSAP animasi pesan baru
  useEffect(() => {
    if (listRef.current) {
      const nodes = listRef.current.children;
      if (nodes.length > 0) {
        gsap.fromTo(
          nodes[nodes.length - 1],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    }
    // Scroll ke bawah setiap pesan baru
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      {
        id: Date.now(),
        user: "You",
        text: input,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg flex flex-col h-[500px]">
      <div className="flex items-center px-4 py-3 border-b">
        <span className="font-semibold text-lg">Forum Chat</span>
      </div>
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
        style={{ minHeight: 0 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.user === "You" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-400">{msg.user}</span>
              <span className="text-xs text-gray-300">{msg.time}</span>
            </div>
            <div
              className={`px-4 py-2 rounded-xl max-w-[80%] shadow
                ${
                  msg.user === "You"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 px-4 py-3 border-t bg-white"
      >
        <input
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;