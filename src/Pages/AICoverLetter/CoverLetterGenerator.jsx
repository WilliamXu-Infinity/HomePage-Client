import { useEffect, useState, useRef } from "react";
import ApiKeyModal from "./ApiKeyModal";
import JDModal from "./JDModal";
import PIModal from "./PIModal"
import promptJSON from "./promp.json";
import { serializePrompt } from "./util";
import pdfToText from "react-pdftotext";
import OpenAI from "openai";

const CoverLetterGenerator = () => {
  const [apiKey, setApiKey] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [jobInfo, setJobInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState(null)

  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showJDModal, setShowJDModal] = useState(false);
  const [showPIModal, setShowPIModal] = useState(false)
  const [jdTextForModal, setJDTextForModal] = useState("");

  const client = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

  // 初始化 API Key and Personal Info
  useEffect(() => {
    const storedKey = sessionStorage.getItem("OPENAI_API_KEY");
    if (!storedKey) {
      setShowApiKeyModal(true);
    } else {
      setApiKey(storedKey);
    }

    const personalInfo =  JSON.parse(sessionStorage.getItem("PERSONAL_INF"))
    if (personalInfo) setPersonalInfo(personalInfo)
  }, []);

  // 打开 JD Modal 时加载文本
  useEffect(() => {
    if (showJDModal && jobDescriptionFile) {
      jobDescriptionFile.text().then((text) => setJDTextForModal(text));
    } else if (showJDModal) {
      setJDTextForModal("");
    }
  }, [showJDModal, jobDescriptionFile]);

  // Save the api key
  const handleSaveApiKey = (key) => {
    sessionStorage.setItem("OPENAI_API_KEY", key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleJDSave = (jdText) => {
    const blob = new Blob([jdText], { type: "text/plain" });
    const file = new File([blob], "JobDescription.txt", { type: "text/plain" });
    setJobDescriptionFile(file);
  };

  const handlePISave = (piInfo) => {
    sessionStorage.setItem("PERSONAL_INF", JSON.stringify(piInfo))
    setPersonalInfo(piInfo)
  }

  const handleGenerate = async () => {
    if (!apiKey) return alert("API Key is missing!");

    const jdText = jobDescriptionFile ? await jobDescriptionFile.text() : "";
    const serializedInput = serializePrompt(promptJSON, jdText, resumeText, personalInfo);

    setLoading(true);
    try {
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini", // 推荐最新小模型
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
      });

      // ✅ SDK 返回的依然是 JSON string
      const content = completion.choices[0].message.content || "{}";
      let parsed;

      try {
        parsed = JSON.parse(content);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        parsed = {};
      }

      const newEntry = {
        id: Date.now(),
        resumeText,
        jobDescriptionFile,
        ...parsed,
      };

      setCoverLetter(parsed.coverLetter);
      setJobInfo({
        company: parsed.company,
        salary: parsed.salary,
        skills: parsed.skills,
      });
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

  const getPersonalInfoFromResume = async (resumeText) => {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are an AI that extracts structured personal information from resumes. Return the result strictly as JSON."
        },
        {
          role: "user",
          content: `Extract name, email, phone, github, linkedin, and personal website from this resume:\n\n${resumeText}`
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "personal_info",
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              github: { type: "string" },
              linkedin: { type: "string" },
              website: { type: "string" }
            },
            required: ["name", "email"]
          }
        }
      }
    });

    const raw = response.choices[0].message;
    const content = raw?.parsed || raw?.content;
    return typeof content === "string" ? JSON.parse(content) : content;
  };

  const handleUploadResume = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await pdfToText(file);
      setResumeText(text);

      if (!personalInfo) {
        const personalInfo = await getPersonalInfoFromResume(text);
        setPersonalInfo(personalInfo);
      }
    } catch (err) {
      console.error("Failed to extract text from pdf", err);
    }
  };

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
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
            <button
              type="button"
              className="mt-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleButtonClick}
            >
              {resumeText === "" ? "Upload" : "Update"} Resume (PDF)
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={handleUploadResume}
              className="hidden"
            />
          </label>

          {/* Personal Info 输入 */}
          <label className="flex flex-col">
            <button
              className="mt-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowPIModal(true)}
            >
              Update Personal Info
            </button>
          </label>

          {/* JD 上传/输入 */}
          <label className="flex flex-col">
            <button
              className="mt-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowJDModal(true)}
            >
              {jobDescriptionFile?.name ? "Update JD" : "Enter JD"}
            </button>
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

      {/* PI Modal */}
      <PIModal
        isOpen={showPIModal}
        onClose={() => setShowPIModal(false)}
        onSave={handlePISave}
        initialValue={personalInfo}
      />

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
