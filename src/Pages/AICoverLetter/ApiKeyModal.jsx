import { useState } from "react";

// 弹窗组件
const ApiKeyModal = ({ isOpen, onSave }) => {
  const [inputKey, setInputKey] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter OpenAI API Key</h2>
        <input
          type="password"
          className="w-full border rounded p-2 mb-4"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="sk-..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            if (inputKey.trim()) {
              onSave(inputKey.trim());
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal