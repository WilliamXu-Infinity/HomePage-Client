import { useState, useRef } from "react";
import OpenAI from "openai";

const AIChat = ({ chatObj }) => {
  const { chatHistory, chatBottomRef, chatInput, setChatInput, handleKeyDown, chatLoading, sendMessage} = chatObj
  return (
    <div className="flex flex-col">
      {/* 聊天历史 */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 mb-4">
        {chatHistory.map((m, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-[80%] whitespace-pre-wrap break-words w-fit ${
              m.role === "user"
                ? "bg-blue-500 text-white ml-auto text-right"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {m.content}
          </div>
        ))}
      <div ref={chatBottomRef} />
      </div>

      {/* 输入框 */}
      <div className="fixed bottom-0 left-[18rem] right-0">
        <div className="flex w-full max-w-[800px] gap-2 items-center justify-center mx-auto mb-3">
          <textarea
            className="flex-1 resize-none border rounded p-2 text-sm"
            rows={1}
            placeholder="Ask a question about your resume and JD..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`px-4 py-2 rounded text-white ${
              chatLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={sendMessage}
            disabled={chatLoading}
          >
            {chatLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AIChat;
