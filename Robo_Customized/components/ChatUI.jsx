"use client";

import { useState } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMsg = { role: "assistant", content: data.reply };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  }

  return (
    <div className="bg-white shadow-lg p-4 w-full max-w-xl rounded-2xl">
      <div className="h-80 overflow-y-auto border p-3 rounded-lg bg-gray-50 mb-4">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-2 my-2 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto w-fit"
                : "bg-gray-200 w-fit"
            }`}
          >
            {msg.content}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded-lg"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
