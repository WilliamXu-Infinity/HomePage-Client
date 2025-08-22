import { useState } from "react";
import { useHistory } from "react-router-dom";

// 弹窗组件
const ApiKeyModal = ({ isOpen, onSave }) => {
  const [inputKey, setInputKey] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const history = useHistory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[500px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter OpenAI API Key</h2>
        <p className="mb-4 text-sm text-gray-700">
          Your API key and data will be stored temporarily in the session for the purpose of using this application. You are solely responsible for managing and deleting your API key after use. This website does not store your API key permanently and is not responsible for any misuse, exposure, or loss of your API key.
        </p>

        <input
          type="password"
          className="w-full border rounded p-2 mb-2"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="sk-..."
        />

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I understand and confirm
        </label>

        <button
          className={`w-full px-4 py-2 rounded text-white ${confirmed && inputKey.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          onClick={() => {
            if (confirmed && inputKey.trim()) {
              onSave(inputKey.trim());
            }
          }}
          disabled={!confirmed || !inputKey.trim()}
        >
          Save API Key
        </button>

        <button
          className={`w-full px-4 py-2 rounded text-white mt-2 bg-orange-500`}
          onClick={() => history.push("/")}
        >
          Back to Home page
        </button>

        {inputKey && (
          <p className="mt-2 text-sm text-gray-600 break-words">
            Entered key: {inputKey.length > 8 ? inputKey.slice(0, 4) + '****' + inputKey.slice(-4) : inputKey}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApiKeyModal;
