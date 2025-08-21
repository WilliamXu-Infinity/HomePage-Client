import { useEffect, useState } from "react";
import ApiKeyModal from "./ApiKeyModal";
import JDModal from "./JDModal";
import promptJSON from "./promp.json";
import { serializePrompt } from "./util";
import pdfToText from "react-pdftotext";

const CoverLetterGenerator = () => {
  const [apiKey, setApiKey] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [jobInfo, setJobInfo] = useState({});

  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showJDModal, setShowJDModal] = useState(false);
  const [jdTextForModal, setJDTextForModal] = useState("");

  // 初始化 API Key
  useEffect(() => {
    const storedKey = localStorage.getItem("OPENAI_API_KEY");
    if (!storedKey) {
      setShowApiKeyModal(true);
    } else {
      setApiKey(storedKey);
    }
  }, []);

  // 打开 JD Modal 时加载文本
  useEffect(() => {
    if (showJDModal && jobDescriptionFile) {
      jobDescriptionFile.text().then((text) => setJDTextForModal(text));
    } else if (showJDModal) {
      setJDTextForModal("");
    }
  }, [showJDModal, jobDescriptionFile]);

  const handleSaveApiKey = (key) => {
    localStorage.setItem("OPENAI_API_KEY", key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleJDSave = (jdText) => {
    const blob = new Blob([jdText], { type: "text/plain" });
    const file = new File([blob], "JobDescription.txt", { type: "text/plain" });
    setJobDescriptionFile(file);
  };

  const handleGenerate = async () => {
    if (!apiKey) return alert("API Key is missing!");

    const jdText = jobDescriptionFile ? await jobDescriptionFile.text() : "";
    const serializedInput = serializePrompt(promptJSON, jdText, resumeText);

    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 推荐最新小模型，支持 JSON schema
          messages: [{ role: "user", content: serializedInput }],
          temperature: 0.7,
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "job_info",
              schema: {
                type: "object",
                properties: {
                  company: { type: "string" },
                  salary: { type: "string" },
                  skills: { type: "array", items: { type: "string" } },
                  coverLetter: { type: "string" },
                },
                required: ["company", "skills", "coverLetter"],
              },
            },
          },
        }),
      });

      const data = await response.json();

      console.log('\x1b[31m%s\x1b[0m', `WX - data: ${JSON.stringify(data)}`)

      // ✅ 注意：用 `message.parsed` 来拿 JSON schema 的结果
      const content = data?.choices?.[0]?.message?.content || "{}";
      let parsed;

      try {
        parsed = JSON.parse(content);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        parsed = {};
      }

      console.log('\x1b[31m%s\x1b[0m', `WX - parsed: ${JSON.stringify(parsed)}`)

      const newEntry = {
        id: Date.now(),
        resumeText,
        jobDescriptionFile,
        ...parsed,
      };

      setCoverLetter(parsed.coverLetter);
      setJobInfo({ company: parsed.company, salary: parsed.salary, skills: parsed.skills });
      setHistory([newEntry, ...history]);
      setSelectedHistoryId(newEntry.id);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter. Check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (entry) => {
    setSelectedHistoryId(entry.id);
    setCoverLetter(entry.coverLetter);
    setResumeText(entry.resumeText);
    setJobDescriptionFile(entry.jobDescriptionFile);
    setJobInfo({ company: entry.company, salary: entry.salary, skills: entry.skills });
  };

  const extractText = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    pdfToText(file)
      .then((text) => setResumeText(text))
      .catch(() => console.error("Failed to extract text from pdf"));
  };

  return (
    <div className="flex h-screen">
      <ApiKeyModal isOpen={showApiKeyModal} onSave={handleSaveApiKey} />

      {/* 左侧控制面板 */}
      <div className="w-72 bg-gray-100 p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Cover Letter Generator</h2>

        <div className="flex flex-col gap-2 mb-4">
          {/* 简历上传 */}
          <label className="flex flex-col">
            <span className="text-sm font-medium">Upload Resume (PDF)</span>
            <input type="file" accept="application/pdf" onChange={extractText} />
          </label>

          {/* JD 上传/输入 */}
          <label className="flex flex-col">
            <span className="text-sm font-medium">Job Description</span>
            <button
              className="mt-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowJDModal(true)}
            >
              Enter JD / URL
            </button>
            <span className="text-xs mt-1">{jobDescriptionFile?.name || ""}</span>
          </label>

          {/* 生成按钮 */}
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* 历史记录 */}
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
              {entry.company || "Unknown Company"}
            </div>
          ))}
        </div>
      </div>

      {/* JD Modal */}
      <JDModal
        isOpen={showJDModal}
        onClose={() => setShowJDModal(false)}
        onSave={handleJDSave}
        initialValue={jdTextForModal}
      />

      {/* 右侧输出 */}
      <div className="flex-1 p-6 bg-white overflow-auto">
        <h2 className="text-lg font-bold mb-4">Generated Results</h2>

        {/* 公司信息 */}
        {jobInfo.company && (
          <div className="mb-4 p-4 border rounded bg-gray-50">
            <p><strong>Company:</strong> {jobInfo.company}</p>
            {jobInfo.salary && <p><strong>Salary:</strong> {jobInfo.salary}</p>}
            {jobInfo.skills?.length > 0 && (
              <p><strong>Skills:</strong> {jobInfo.skills.join(", ")}</p>
            )}
          </div>
        )}

        {/* Cover Letter */}
        <textarea
          className="w-full h-[70vh] border rounded p-4 text-sm font-mono"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
