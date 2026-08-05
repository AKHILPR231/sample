import { useEffect, useRef } from "react";

import { SparklesIcon } from "@/components/icons";

import { ChatBubble } from "./components/ChatBubble";
import { DraftResultCard } from "./components/DraftResultCard";
import { OptionChips } from "./components/OptionChips";
import { SuggestionChips } from "./components/SuggestionChips";
import { ThinkingDots } from "./components/ThinkingDots";
import type { UseAdminChat } from "./hooks/useAdminChat";

type Props = {
  chat: UseAdminChat;
};

export function ChatBody({ chat }: Props) {
  const {
    messages,
    started,
    flowActive,
    selectWelcomeChip,
    selectSingle,
    toggleMulti,
    submitMulti,
    runAction,
    applyResult,
  } = chat;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  if (!started) {
    return (
      <div className="cw-body" ref={scrollRef}>
        <div className="cw-welcome">
          <span className="cw-welcome__badge">
            <SparklesIcon size={26} />
          </span>
          <p className="cw-welcome__lead">Admin assistant</p>
          <h3 className="cw-welcome__title">How can I help you manage the outlet?</h3>
          <SuggestionChips onSelect={selectWelcomeChip} />
        </div>
      </div>
    );
  }

  return (
    <div className="cw-body" ref={scrollRef}>
      {messages.map((message) => {
        switch (message.kind) {
          case "ai":
          case "user":
            return (
              <div key={message.id} className="cw-enter">
                <ChatBubble text={message.text} variant={message.kind} />
              </div>
            );
          case "thinking":
            return (
              <div key={message.id} className="cw-enter">
                <ThinkingDots />
              </div>
            );
          case "options":
            return (
              <div key={message.id} className="cw-enter">
                <OptionChips
                  message={message}
                  onSingle={selectSingle}
                  onToggle={toggleMulti}
                  onSubmit={submitMulti}
                  onAction={runAction}
                />
              </div>
            );
          case "result":
            return (
              <div key={message.id} className="cw-enter">
                <DraftResultCard message={message} onApply={applyResult} />
              </div>
            );
          default:
            return null;
        }
      })}

      {!flowActive ? (
        <SuggestionChips compact onSelect={selectWelcomeChip} />
      ) : null}
    </div>
  );
}
