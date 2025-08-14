import { useEffect, useState } from 'react'
import ApiKeyModal from './ApiKeyModal'
import JDModal from './JDModal'

const CoverLetterGenerator = () => {
  const [apiKey, setApiKey] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [resumeText, setResumeText] = useState(""); // 改成文本
  const [jobDescription, setJobDescription] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showJDModal, setShowJDModal] = useState(false);
  const [jdTextForModal, setJDTextForModal] = useState("");

  const handleJDSave = (jdText) => {
    // 创建一个 Blob 模拟文件，保持历史一致
    const blob = new Blob([jdText], { type: "text/plain" });
    const file = new File([blob], "JobDescription.txt", { type: "text/plain" });
    setJobDescription(file);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem("OPENAI_API_KEY");
    if (!storedKey) {
      setShowModal(true);
    } else {
      setApiKey(storedKey);
    }
  }, []);

  useEffect(() => {
    if (showJDModal && jobDescription) {
      jobDescription.text().then(text => setJDTextForModal(text));
    } else if (showJDModal) {
      setJDTextForModal("");
    }
  }, [showJDModal, jobDescription]);

  const handleSaveApiKey = (key) => {
    localStorage.setItem("OPENAI_API_KEY", key);
    setApiKey(key);
    setShowModal(false);
  };

  const handleGenerate = async () => {
    if (!apiKey) return alert("API Key is missing!");
    const jdText = jobDescription ? await jobDescription.text() : "";

    const prompt = `Write a professional cover letter based on this resume and job description:\nResume:\n${resumeText}\nJob Description:\n${jdText}`;

    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const newCoverLetter = data?.choices?.[0]?.message?.content || "";

      const newEntry = {
        id: Date.now(),
        resumeText, // 改成文本
        jobDescription,
        content: newCoverLetter,
      };

      setCoverLetter(newCoverLetter);
      setHistory([newEntry, ...history]);
      setSelectedHistoryId(newEntry.id);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter. Check API key or network.");
    }
    setLoading(false);
  };

  const handleSelectHistory = (entry) => {
    setSelectedHistoryId(entry.id);
    setCoverLetter(entry.content);
    setResumeText(entry.resumeText); // 改成文本
    setJobDescription(entry.jobDescription);
  };

  return (
    <div className="flex h-screen">
      <ApiKeyModal isOpen={showModal} onSave={handleSaveApiKey} />

      <div className="w-64 bg-gray-100 p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Cover Letter Generator</h2>

        <div className="flex flex-col gap-2 mb-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium">Paste Resume</span>
            <textarea
              className="border rounded p-2 text-sm font-mono h-24"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume here..."
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium">Job Description</span>
            <button
              className="mt-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowJDModal(true)}
            >
              Enter JD / URL
            </button>
            <span className="text-xs mt-1">{jobDescription?.name || ""}</span>
          </label>

          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>

        <h3 className="text-md font-semibold mt-4 mb-2">History</h3>
        <div className="flex-1 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry.id}
              className={`p-2 rounded cursor-pointer mb-1 ${
                entry.id === selectedHistoryId ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelectHistory(entry)}
            >
              Resume - {entry.jobDescription?.name || "JD"}
            </div>
          ))}
        </div>
      </div>

      <JDModal
        isOpen={showJDModal}
        onClose={() => setShowJDModal(false)}
        onSave={handleJDSave}
        initialValue={jdTextForModal}
      />

      <div className="flex-1 p-6 bg-white overflow-auto">
        <h2 className="text-lg font-bold mb-4">Cover Letter</h2>
        <textarea
          className="w-full h-full border rounded p-4 text-sm font-mono"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
