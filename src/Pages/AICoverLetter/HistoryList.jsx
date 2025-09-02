// HistoryList.jsx
import React, { useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoverLetterDocument from "./CoverLetterDocument";
import { ArrowDownTrayIcon, BookmarkIcon } from "@heroicons/react/24/solid";

const noop = () => {};

const HistoryItem = ({
  entry,
  isSelected,
  selectHistory,
  coverLetterModified,
  saveNewCoverletter,
  disabled,
}) => {
  const doc = useMemo(
    () => (
      <CoverLetterDocument
        coverLetter={entry.coverLetter}
        companyName={entry.company}
      />
    ),
    [entry.coverLetter, entry.company]
  );

  const isModified = coverLetterModified && isSelected;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (disabled) return;
    saveNewCoverletter?.();
  };

  return (
    <div
      className={`flex justify-between items-center p-2 rounded cursor-pointer mb-1 ${
        isSelected ? "bg-blue-200" : "hover:bg-gray-200"
      } ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={disabled ? noop : () => selectHistory(entry)}
      aria-disabled={disabled}
    >
      <span className="truncate">{entry.company || "Unknown Company"}</span>

      <div className="w-6 h-6 inline-flex items-center justify-center shrink-0">
        {isModified ? (
          <button
            type="button"
            onClick={handleSaveClick}
            className="w-6 h-6 inline-flex items-center justify-center focus:outline-none"
            aria-label="Save updated cover letter"
            title="Save updated cover letter"
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
          >
            <BookmarkIcon className="w-5 h-5 text-gray-600 hover:text-gray-900" />
          </button>
        ) : (
          <PDFDownloadLink
            document={doc}
            fileName={`Cover_Letter_${entry.company}.pdf`}
            className={`w-6 h-6 inline-flex items-center justify-center ${
              disabled ? "pointer-events-none" : ""
            }`}
            // 阻止触发父级点击
            onClick={(e) => {
              e.stopPropagation();
              if (disabled) e.preventDefault();
            }}
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
};

const HistoryList = React.memo(function HistoryList({
  history,
  selectedHistoryId,
  selectHistory,
  coverLetterModified,
  saveNewCoverletter,
  isLoading,
}) {
  return (
    <div
      className={`flex-1 overflow-y-auto border rounded bg-gray-50 transition-opacity ${
        isLoading ? "pointer-events-none opacity-60 select-none" : ""
      }`}
      aria-busy={isLoading || undefined}
    >
      {history.map((entry) => (
        <HistoryItem
          key={entry.id}
          entry={entry}
          isSelected={entry.id === selectedHistoryId}
          selectHistory={selectHistory}
          coverLetterModified={coverLetterModified}
          saveNewCoverletter={saveNewCoverletter}
          disabled={isLoading}
        />
      ))}
    </div>
  );
});

export default HistoryList;
