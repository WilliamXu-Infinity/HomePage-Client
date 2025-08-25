import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import usePDFStyles from "./hooks/usePDFStyles";
import useTextProcessor from "./hooks/useTextProcessor";
import usePDFDocument from "./hooks/usePDFDocument";

const CoverLetterDocument = ({ 
  coverLetter, 
  companyName = "Company",
  documentOptions = {} 
}) => {
  const styles = usePDFStyles();
  const { processedLines, formatLine, stats } = useTextProcessor(coverLetter);
  const { documentProps, pageProps, isValid } = usePDFDocument(coverLetter, {
    title: `Cover Letter - ${companyName}`,
    ...documentOptions
  });

  // Return empty document if content is invalid
  if (!isValid) {
    return (
      <Document {...documentProps}>
        <Page style={styles.page} {...pageProps}>
          <View style={styles.section}>
            <Text style={styles.paragraph}>
              No content available for the cover letter.
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  const renderLine = (line, index) => {
    if (line.isEmpty) {
      return <Text key={`empty-${index}`} style={styles.emptyLine} />;
    }

    const formattedContent = formatLine(line);
    const lineStyle = line.isHeader ? styles.header : styles.paragraph;

    return (
      <Text key={`line-${index}`} style={lineStyle}>
        {formattedContent}
      </Text>
    );
  };

  return (
    <Document {...documentProps}>
      <Page style={styles.page} {...pageProps}>
        <View style={styles.section}>
          {processedLines.map((line, index) => renderLine(line, index))}
        </View>
        
        {/* Optional footer with document stats */}
        {stats.totalWords > 0 && (
          <View style={styles.footer}>
            <Text>
              Words: {stats.totalWords} | Estimated reading time: {stats.estimatedReadingTime} min
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CoverLetterDocument;
