"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  from: "support" | "user";
  text: string;
};

const replies = [
  "Thanks for writing! A Loomora agent will be with you shortly.",
  "Noted. Could you share your order ID so we can check faster?",
  "We are here 9am–10pm every day. Anything else we can help with?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "support", text: "Hi! Welcome to Loomora. How can we help you today?" },
  ]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const replyIndex = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((current) => [...current, { from: "user", text }]);

    timerRef.current = setTimeout(() => {
      const reply = replies[replyIndex.current % replies.length];
      replyIndex.current += 1;
      setMessages((current) => [...current, { from: "support", text: reply }]);
    }, 900);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-[60] flex h-[26rem] w-[21rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-3 bg-[#12509b] p-4 text-white">
            <div>
              <p className="text-sm font-bold">Loomora Support</p>
              <p className="text-xs text-white/80">
                We typically reply in a few minutes
              </p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 transition-opacity hover:opacity-80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={bodyRef}
            className="flex-1 space-y-2.5 overflow-y-auto bg-zinc-50 p-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                    message.from === "user"
                      ? "rounded-br-sm bg-[#12509b] text-white"
                      : "rounded-bl-sm bg-white text-zinc-700 shadow-sm"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-zinc-200 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") send();
              }}
              placeholder="Type a message..."
              className="h-10 w-full min-w-0 rounded-full border border-zinc-300 px-4 text-sm outline-none transition-colors focus:border-[#12509b]"
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={send}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#12509b] text-white transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label="Open support chat"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#12509b] text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
