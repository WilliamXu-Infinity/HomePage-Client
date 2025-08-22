import { useEffect, useState, useRef } from "react";
import ApiKeyModal from "./ApiKeyModal";
import JDModal from "./JDModal";
import PIModal from "./PIModal"
import CoverLetterDocument from "./CoverLetterDocument";
import promptJSON from "./promp.json";
import { serializePrompt } from "./util";
import pdfToText from "react-pdftotext";
import OpenAI from "openai";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { PDFDownloadLink } from '@react-pdf/renderer';

const CoverLetterGenerator = () => {
  const [apiKey, setApiKey] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const [resumeText, setResumeText] = useState("");
  const [jdText, setJDText] = useState("")
  const [coverLetter, setCoverLetter] = useState("");
  const [jobInfo, setJobInfo] = useState({
        company: "N/A",
        salary: "N/A",
        skills: [],
      });
  const [personalInfo, setPersonalInfo] = useState(null)

  const [history, setHistory] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showJDModal, setShowJDModal] = useState(false);
  const [showPIModal, setShowPIModal] = useState(false)

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

    const resume = sessionStorage.getItem("RESUME_TEXT")
    if (resume) setResumeText(resume)
    
    const historyData = JSON.parse(sessionStorage.getItem("HISTORY_DATA"))
    if (historyData) setHistory(historyData)
  }, []);

  // Save the api key
  const handleSaveApiKey = (key) => {
    sessionStorage.setItem("OPENAI_API_KEY", key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleJDSave = (jdText) => {
    setJDText(jdText)
  };

  const handlePISave = (piInfo) => {
    sessionStorage.setItem("PERSONAL_INF", JSON.stringify(piInfo))
    setPersonalInfo(piInfo)
  }

  const handleGenerate = async () => {
    if (!apiKey) return alert("API Key is missing!");

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
        jdText,
        ...parsed,
      };

      setCoverLetter(parsed.coverLetter);
      setJobInfo({
        company: parsed.company,
        salary: parsed.salary,
        skills: parsed.skills,
      });
      setHistory([newEntry, ...history]);
      sessionStorage.setItem("HISTORY_DATA", JSON.stringify([newEntry, ...history]))
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
    setJDText(entry.jdText);
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
      sessionStorage.setItem("RESUME_TEXT", text)

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
      <div className="w-72 bg-gray-100 p-3 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Cover Letter Generator</h2>

        <div className="flex flex-col gap-2 mb-4">

          {/* Resume 上传 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleButtonClick}
            >
              Resume (PDF)
            </button>
            <input ref={inputRef} type="file" accept="application/pdf" onChange={handleUploadResume} className="hidden" /> 
            {resumeText ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* Personal Info 输入 */}
          <div className="flex items-center gap-2">
            <button
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowPIModal(true)}
            >
              Personal Info
            </button>
            {personalInfo ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* JD 上传/输入 */}
          <div className="flex items-center gap-2">
            <button
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setShowJDModal(true)}
            >
              {jdText ? "Update JD" : "Enter JD"}
            </button>
            {jdText ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* 生成按钮 */}
          <button
            className={`mt-2 flex-1 px-4 py-2 rounded ${
              !resumeText || !jdText || !personalInfo
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={handleGenerate}
            disabled={!resumeText || !jdText || !personalInfo || loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* 历史记录 */}
        <h3 className="text-md font-semibold mb-2">History</h3>
        <div className="flex-1 overflow-y-auto border rounded bg-gray-50">
          {history.map((entry) => (
            <div
              key={entry.id}
              className={`flex justify-between items-center p-2 rounded cursor-pointer mb-1 ${
                entry.id === selectedHistoryId ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelectHistory(entry)}
            >
              <span>{entry.company || "Unknown Company"}</span>

              <PDFDownloadLink
                document={
                  <CoverLetterDocument
                    coverLetter={entry.coverLetter}
                  />
                }
                fileName={`Cover_Letter_${entry.company}.pdf`}
                className="p-1 text-gray-600 hover:text-gray-900"
              >
                {({ loading }) =>
                  loading ? "Preparing..." : <ArrowDownTrayIcon className="w-5 h-5" />
                }
              </PDFDownloadLink>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧输出 */}
      <div className="flex-1 p-3 bg-white flex flex-col">
        <h2 className="text-lg font-bold mb-4">Results</h2>

        {/* 公司信息 */}
        {jobInfo.company && (
          <div className="mb-4 p-4 border rounded bg-gray-50">
            <p><strong>Company:</strong> {jobInfo.company}</p>
            {jobInfo.salary && <p><strong>Salary:</strong> {jobInfo.salary}</p>}
            {jobInfo.skills?.length > 0 ? 
              (<p><strong>Skills:</strong> {jobInfo.skills.join(", ")}</p>) :
              <p><strong>Skills:</strong> N/A</p> }
          </div>
        )}

        {/* Cover Letter */}
        <textarea
          className="flex-1 w-full border rounded p-4 text-sm font-mono"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
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
        initialValue={jdText}
      />
    </div>
  );
};

export default CoverLetterGenerator;
