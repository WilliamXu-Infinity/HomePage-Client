// HistoryList.jsx
import React, { useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoverLetterDocument from "./CoverLetterDocument";
import { ArrowDownTrayIcon, BookmarkIcon } from "@heroicons/react/24/solid";

const HistoryItem = ({ entry, isSelected, onSelect, coverLetterModified, saveNewCoverletter }) => {
  const doc = useMemo(
    () => <CoverLetterDocument coverLetter={entry.coverLetter} companyName={entry.company} />,
    [entry.coverLetter, entry.company]
  );

  const isModified = coverLetterModified && isSelected

  const handleSaveClick = (e) => {
    e.stopPropagation();
    saveNewCoverletter()
  }

  return (
    <div
      className={`flex justify-between items-center p-2 rounded cursor-pointer mb-1 ${
        isSelected ? "bg-blue-200" : "hover:bg-gray-200"
      }`}
      onClick={() => onSelect(entry)}
    >
      <span>{entry.company || "Unknown Company"}</span>
      <div className="w-6 h-6 inline-flex items-center justify-center shrink-0">
        {isModified ? (
          <button
            type="button"
            onClick={(e) => handleSaveClick(e)}
            className="w-6 h-6 inline-flex items-center justify-center focus:outline-none"
            aria-label="Save updated cover letter"
            title="Save updated cover letter"
          >
            <BookmarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-900" />
          </button>
        ) : (
          <PDFDownloadLink
            document={doc}
            fileName={`Cover_Letter_${entry.company}.pdf`}
            className="w-6 h-6 inline-flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {({ loading }) =>
              loading ? (
                <span className="block w-5 h-5" />
              ) : (
                <ArrowDownTrayIcon className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              )
            }
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
}


const HistoryList = React.memo(function HistoryList({ history, selectedHistoryId, selectHistory, coverLetterModified, saveNewCoverletter }) {
  return (
    <div className="flex-1 overflow-y-auto border rounded bg-gray-50">
      {history.map((entry) => (
      <HistoryItem
        key={entry.id}
        entry={entry}
        isSelected={entry.id === selectedHistoryId}
        onSelect={selectHistory}
        coverLetterModified={coverLetterModified}
        saveNewCoverletter={saveNewCoverletter}
      />
    ))}
    </div>
  );
});

export default HistoryList;
