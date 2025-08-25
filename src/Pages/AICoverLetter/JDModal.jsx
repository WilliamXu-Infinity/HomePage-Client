import { useState, useEffect } from "react";

const JDModal = ({ isOpen, onClose, onSave, initialValue }) => {
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setJdText(initialValue || "");
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(jdText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[800px] max-h-[calc(100vh-48px)] shadow-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">Enter Job Description</h2>
        <textarea
          className="w-full border rounded p-2 mb-2 h-[400px]"
          rows={5}
          placeholder="Paste job description here..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JDModal;
