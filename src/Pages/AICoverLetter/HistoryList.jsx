// HistoryList.jsx
import React, { useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoverLetterDocument from "./CoverLetterDocument";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const HistoryItem = ({ entry, isSelected, onSelect }) => {
  const doc = useMemo(
    () => <CoverLetterDocument coverLetter={entry.coverLetter} companyName={entry.company} />,
    [entry.coverLetter, entry.company]
  );

  return (
    <div
      className={`flex justify-between items-center p-2 rounded cursor-pointer mb-1 ${
        isSelected ? "bg-blue-200" : "hover:bg-gray-200"
      }`}
      onClick={() => onSelect(entry)}
    >
      <span>{entry.company || "Unknown Company"}</span>
      <PDFDownloadLink
        document={doc}
        fileName={`Cover_Letter_${entry.company}.pdf`}
        className="p-1 text-gray-600 hover:text-gray-900"
      >
        {({ loading }) =>
          loading ? "Preparing..." : <ArrowDownTrayIcon className="w-5 h-5" />
        }
      </PDFDownloadLink>
    </div>
  );
}


const HistoryList = React.memo(function HistoryList({ history, selectedHistoryId, selectHistory }) {
  console.log('\x1b[31m%s\x1b[0m', 'WX - check - history')
  return (
    <div className="flex-1 overflow-y-auto border rounded bg-gray-50">
      {history.map((entry) => (
      <HistoryItem
        key={entry.id}
        entry={entry}
        isSelected={entry.id === selectedHistoryId}
        onSelect={selectHistory}
      />
    ))}
    </div>
  );
});

export default HistoryList;
