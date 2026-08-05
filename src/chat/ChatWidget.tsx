import { useState } from "react";

import { ChatIcon, CloseIcon, SendIcon } from "@/components/icons";

import { ChatBody } from "./ChatBody";
import { useAdminChat } from "./hooks/useAdminChat";

import "./ChatWidget.css";

/**
 * Floating admin assistant. Mirrors the mobile AI-planner flow (welcome chips →
 * scripted Q&A → generated draft) but scoped to admin tasks. Handles open/close
 * plus the conversation state via `useAdminChat`.
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useAdminChat();

  const handleSend = () => chat.sendFreeText();

  return (
    <>
      {isOpen && (
        <div
          className="chat-widget__panel"
          role="dialog"
          aria-label="Admin assistant"
        >
          <div className="chat-widget__panel-header">
            <span className="chat-widget__title">
              <ChatIcon size={16} />
              Assistant
            </span>
            <div className="chat-widget__header-actions">
              {chat.started ? (
                <button
                  type="button"
                  className="chat-widget__reset"
                  onClick={chat.reset}
                >
                  New chat
                </button>
              ) : null}
              <button
                type="button"
                className="chat-widget__close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <CloseIcon size={16} />
              </button>
            </div>
          </div>

          <ChatBody chat={chat} />

          <div className="chat-widget__panel-footer">
            <input
              type="text"
              value={chat.inputText}
              onChange={(event) => chat.setInputText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              placeholder="Ask about stores, hours, brands…"
              className="chat-widget__input"
              aria-label="Message"
            />
            <button
              type="button"
              className="chat-widget__send-button"
              onClick={handleSend}
              aria-label="Send"
            >
              <SendIcon size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="chat-widget__launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <CloseIcon size={24} /> : <ChatIcon size={24} />}
      </button>
    </>
  );
}
