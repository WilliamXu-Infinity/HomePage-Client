import { useRef, useState, useEffect } from "react";
import ApiKeyModal, { useApiKey } from "../../Components/AIApiKeyModal";
import JDModal from "./JDModal";
import PIModal from "./PIModal";
import { useCoverLetterAI } from "./hooks/useCoverLetterAI";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import HistoryList from "./HistoryList"
import AIChat from "./AIChat"

const CoverLetterGenerator = () => {
  const { apiKey, showApiKeyModal, handleSaveApiKey } = useApiKey();
  const {
    resumeText,
    jdText,
    coverLetter,
    jobInfo,
    personalInfo,
    history,
    selectedHistoryId,
    loading,
    saveJD,
    savePersonalInfo,
    handleUploadResume,
    generateCoverLetter,
    selectHistory,
    setCoverLetterSync,
    chatObj
  } = useCoverLetterAI(apiKey);

  useEffect(() => {
    console.log('\x1b[31m%s\x1b[0m', 'WX - check - 11')
  }, [history])

  const [showJDModal, setShowJDModal] = useState(false);
  const [showPIModal, setShowPIModal] = useState(false);

  const inputRef = useRef(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <ApiKeyModal isOpen={showApiKeyModal} onSave={handleSaveApiKey} />

      {/* 左侧控制面板 */}
      <div className="w-72 bg-gray-100 p-3 flex flex-col overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Cover Letter Generator</h2>

        <div className="flex flex-col gap-2 mb-4">
          {/* Resume 上传 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => inputRef.current?.click()}
            >
              Resume (PDF)
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files[0] && handleUploadResume(e.target.files[0])}
              className="hidden"
            />
            {resumeText ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* Personal Info */}
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

          {/* JD */}
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

          {/* Generate */}
          <button
            className={`mt-2 flex-1 px-4 py-2 rounded ${
              !resumeText || !jdText || !personalInfo
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={generateCoverLetter}
            disabled={!resumeText || !jdText || !personalInfo || loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* 历史 */}
        <h3 className="text-md font-semibold mb-2">History</h3>
        <HistoryList
          history={history}
          selectedHistoryId={selectedHistoryId}
          selectHistory={selectHistory}
        />
      </div>

      {/* 右侧输出 */}
      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 p-3 bg-white flex flex-col overflow-y-auto pb-24 h-[100%]">
          <h2 className="text-lg font-bold mb-4">Results</h2>

          {jobInfo.company && (
            <div className="mb-4 px-4 py-2 border rounded bg-gray-50">
              <p>
                <strong>Company:</strong> {jobInfo.company}
              </p>
              {jobInfo.salary && (
                <p>
                  <strong>Salary:</strong> {jobInfo.salary}
                </p>
              )}
              {jobInfo.skills?.length > 0 ? (
                <p>
                  <strong>Skills:</strong> {jobInfo.skills.join(", ")}
                </p>
              ) : (
                <p>
                  <strong>Skills:</strong> N/A
                </p>
              )}
            </div>
          )}

          <textarea
            className="w-full shrink-0 resize-none border rounded p-4 text-sm font-mono flex-1 min-h-[70vh]"
            value={coverLetter}
            onChange={(e) => setCoverLetterSync(e.target.value)}
          />

          <AIChat chatObj={chatObj} />
        </div>
      </div>

      {/* Modals */}
      <PIModal
        isOpen={showPIModal}
        onClose={() => setShowPIModal(false)}
        onSave={savePersonalInfo}
        initialValue={personalInfo}
      />
      <JDModal
        isOpen={showJDModal}
        onClose={() => setShowJDModal(false)}
        onSave={saveJD}
        initialValue={jdText}
      />
    </div>
  );
};

export default CoverLetterGenerator;
