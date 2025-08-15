import React from 'react';

const ReportDisplay = ({ report }: { report: string }) => {
  return (
    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-900">{report}</pre>
  );
};

export default ReportDisplay;
