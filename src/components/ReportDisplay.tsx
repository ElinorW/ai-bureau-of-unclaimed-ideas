import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTypewriter } from '../hooks/useTypewriter';
import Stamp from './Stamp';

const ReportDisplay = ({ report }: { report: string }) => {

  const [animate, setAnimate] = useState(true);
  const { output, done, skip } = useTypewriter(report, 22, animate);

  // Re-enable animation when a new report arrives
  useEffect(() => {
    setAnimate(true);
  }, [report]);

  const handleSkip = () => {
    // stop animation and reveal instantly
    setAnimate(false);
    skip();
  };

  const handleDownloadPdf = async () => {
    const response = await fetch('/api/generatePdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportText: report }),
    })

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ai-bureau-report.pdf'
    link.click()
    window.URL.revokeObjectURL(url)
  }
  
  return (
    <div className="relative bg-[#fefcf5] border border-gray-300 rounded-md p-6 max-w-3xl mx-auto my-8 shadow-md font-mono bureau-watermark">
      <Stamp show={done} text="CONFIDENTIAL" />

      <div className="text-red-700 font-bold uppercase tracking-widest text-xs border-2 border-red-700 px-2 py-1 inline-block mb-4">
        Confidential Archive
      </div>

      <div className="flex items-center gap-3 mb-3">
        {!done ? (
          <button
            onClick={handleSkip}
            className="text-xs uppercase px-2 py-1 border border-black bg-black text-white font-bold hover:bg-white hover:text-black transition rounded"
            aria-label="Skip typewriter animation and show full report"
          >
            Skip Animation
          </button>
        ) : (
          <span className="text-[11px] text-gray-600 uppercase">Rendered</span>
        )}
      </div>

      {/* key={done ? 'final' : 'typing'} helps prevent intermediate markdown glitches */}
      <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
        <ReactMarkdown key={done ? "final" : "typing"}>{output}</ReactMarkdown>
      </div>

      <div className="sr-only" aria-live="polite">
        {done ? "Report rendering complete." : "Rendering report..."}
      </div>
      <button
        onClick={handleDownloadPdf}
        className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
      >
        📄 Download Report as PDF
      </button>
    </div>
  );
};

export default ReportDisplay;