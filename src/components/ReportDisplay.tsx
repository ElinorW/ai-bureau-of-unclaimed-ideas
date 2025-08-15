import React from 'react';

const ReportDisplay = ({ report }: { report: string }) => {
  if (!report) return null;
  return (
    <div className="border-t pt-4 mt-4">
      <h2 className="text-2xl font-semibold mb-2">Future Report</h2>
      <pre className="whitespace-pre-wrap">{report}</pre>
    </div>
  );
};

export default ReportDisplay;
