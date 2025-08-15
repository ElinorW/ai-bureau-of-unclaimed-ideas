import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReportDisplay = ({ report }: { report: string }) => {
  return (
    <div className="bg-[#fefcf5] border border-gray-300 rounded-md p-6 max-w-3xl mx-auto my-8 shadow-md font-mono">
      <div className="text-red-700 font-bold uppercase tracking-widest text-xs border-2 border-red-700 px-2 py-1 inline-block mb-4">
        Confidential Archive
      </div>
      <div className="prose prose-sm text-gray-800 max-w-none">
        <ReactMarkdown>{report}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReportDisplay;