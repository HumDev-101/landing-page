'use client'
import React, { useState, useRef, useEffect ,Suspense} from "react";
import { askQuery, conversationalAI } from '../..//api/aiAPI';
import { useSearchParams } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import useWindowResize from '../../components/hooks/useWindowResize';

function LLMSearchInside() {
  const queryParams = useSearchParams();
  const buttonRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const [screenFreeze, setScreenFreeze] = useState(false);
  const isDesktop = useWindowResize();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const llmModel = queryParams.get('llmModel');
  const name = queryParams.get('name');
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [messages]);

  const handleSearch = async () => {
    if (query) {
      setQuery("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: query, sender: "user" },
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "loading", sender: "ai" },
      ]);
      let clone = [...messages];
      clone.push({ text: query, sender: "user" });
      let aiResponse = await conversationalAI(clone, llmModel);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          text:
            aiResponse.httpCode === 200
              ? aiResponse.data
              : aiResponse.msg,
          sender: "ai",
        },
      ]);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-4">
      {/* Back Arrow */}
      {/* Main Container */}
      <div className="flex flex-col items-center justify-start gap-5 w-full">
        <div className={`flex flex-col items-center ${messages.length > 0 ? '' : 'mt-[30%] md:mt-[60%]'}`}>
          <div className={`overflow-y-auto ${messages.length > 0 ? 'h-[60vh]' : ''} w-[50vw] max-w-[60vw] md:w-full md:max-w-full md:max-h-[50vh] mt-5`}>
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message flex items-center mb-2 max-w-full ${message.sender === "ai" ? "justify-start" : "justify-end"}`}
                >
                  {message.sender === "ai" ? (
                    <div className="bg-gray-800 text-white p-2 rounded max-w-[80%]">
                      {message.text === "loading" ? (
                        <Spinner />
                      ) : (
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-700 text-white p-2 rounded max-w-[80%]">
                      {message.text}
                    </div>
                  )}
                </div>
              ))}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input + Header */}
          <div className="w-full max-w-md bg-black text-white rounded-lg p-4 shadow-md border border-gray-700 md:max-w-[95vw] md:p-2">
            <header className="text-center mb-3 md:mb-1">
              <h5 className="text-white font-medium">LLM: {name}</h5>
              <h3 className="text-lg font-bold">What can I help with?</h3>
            </header>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-600 rounded outline-none bg-black text-white placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question..."
                onKeyDown={handleKeyDown}
              />
              <button
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
                onClick={handleSearch}
                ref={buttonRef}
              >
                Ask
              </button>
            </div>
          </div>

          {!isDesktop && messages.length === 0 && (
            <div className="h-[25vh]" />
          )}
        </div>
      </div>
    </div>

  );
}

export default function LLMSearch() {
  return (
    <Suspense>
    <div className="min-h-screen bg-black text-white">
      <LLMSearchInside />
    </div>
    </Suspense>
  );
}

// Spinner component styled with Tailwind
const Spinner = () => (
  <div className="w-[30px] h-[30px] border-4 border-white/30 border-t-gray-300 rounded-full animate-spin" />
);
