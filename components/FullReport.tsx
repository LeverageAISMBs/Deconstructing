import React from 'react';
import { marked } from 'marked';

interface FullReportProps {
  report: {
    title: string;
    content: string;
  };
}

const FullReport: React.FC<FullReportProps> = ({ report }) => {
  // Use a library like 'marked' to parse Markdown if the content contains it.
  // This will render ### as h3 tags.
  const htmlContent = marked.parse(report.content);

  return (
    <section id="full-report-section" className="full-report-section">
      <h2>{report.title}</h2>
      <div 
        className="full-report-content" 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
};

export default FullReport;