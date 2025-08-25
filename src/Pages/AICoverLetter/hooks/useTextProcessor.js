import { useMemo } from 'react';

const useTextProcessor = (text) => {
  const processedLines = useMemo(() => {
    if (!text) return [];
    
    return text.split('\n').map((line, index) => ({
      id: index,
      content: line,
      isEmpty: line.trim() === '',
      isHeader: line.trim().toLowerCase().includes('dear') || 
                line.trim().toLowerCase().includes('sincerely') ||
                line.trim().toLowerCase().includes('best regards'),
      wordCount: line.trim().split(/\s+/).filter(word => word.length > 0).length
    }));
  }, [text]);

  const stats = useMemo(() => {
    const totalWords = processedLines.reduce((sum, line) => sum + line.wordCount, 0);
    const totalLines = processedLines.length;
    const nonEmptyLines = processedLines.filter(line => !line.isEmpty).length;
    
    return {
      totalWords,
      totalLines,
      nonEmptyLines,
      estimatedReadingTime: Math.ceil(totalWords / 200) // Average reading speed
    };
  }, [processedLines]);

  const formatLine = (line) => {
    if (line.isEmpty) return '';
    
    // Clean up extra spaces and format properly
    return line.content.trim().replace(/\s+/g, ' ');
  };

  return {
    processedLines,
    stats,
    formatLine
  };
};

export default useTextProcessor;
