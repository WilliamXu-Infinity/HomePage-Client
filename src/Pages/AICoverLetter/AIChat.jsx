import { useState, useRef } from "react";
import OpenAI from "openai";

const AIChat = ({ apiKey, resumeText, jdText }) => {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are an AI career assistant that answers based on user's resume and job description." }
  ]);
  const [chatHistory, setChatHistory] = useState([]); // 用于展示的聊天内容
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const client = apiKey
    ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
    : null;

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!client) {
      alert("Missing API key");
      return;
    }

    // UI 聊天记录里只加用户输入的问题
    const newChatHistory = [...chatHistory, { role: "user", content: input }];
    setChatHistory(newChatHistory);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // 实际发给 API 的消息：在用户问题之前，插入一条隐藏的系统说明，包含 resume 和 JD
    const hiddenContext = {
      role: "system",
      content: `Here is the user's context. Resume:\n${resumeText}\n\nJob Description:\n${jdText}`
    };

    const newMessages = [
      ...messages,
      hiddenContext,
      { role: "user", content: input }
    ];

    setInput("");
    setLoading(true);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: newMessages,
        temperature: 0.7,
      });

      const reply = completion.choices[0].message.content;

      // 更新显示的聊天记录
      setChatHistory([...newChatHistory, { role: "assistant", content: reply }]);
      // 更新 messages 用于保持对话上下文（不包含隐藏上下文）
      setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: reply }]);

      // 滚动到底部
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch AI response. Check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
      <div ref={bottomRef} />
      </div>

      {/* 输入框 */}
      <div className="fixed bottom-0 left-[18rem] right-0">
        <div className="flex w-full max-w-[800px] gap-2 items-center justify-center mx-auto mb-3">
          <textarea
            className="flex-1 resize-none border rounded p-2 text-sm"
            rows={1}
            placeholder="Ask a question about your resume and JD..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AIChat;
