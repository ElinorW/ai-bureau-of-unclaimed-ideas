import React, { useState } from 'react';
import IdeaForm from '../components/IdeaForm';
import ReportDisplay from '../components/ReportDisplay';

export default function Home() {
  const [report, setReport] = useState('');

  return (
    <main className="min-h-screen bg-[#f7f2e7] text-black font-mono p-6">
      <div className="max-w-3xl mx-auto border-2 border-black p-8 bg-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-widest">AI Bureau of Unclaimed Ideas</h1>
            <p className="text-sm text-gray-700">Confidential — Internal Use Only</p>
          </div>
          <img src="/bureau-seal.png" alt="Bureau Seal" className="w-16 h-16" />
        </div>

        <hr className="border-black border-dashed my-4" />

        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase mb-2">Submit an Idea</h2>
          <IdeaForm onSubmit={setReport} />
        </section>

        {report && (
          <section className="border-2 border-black p-4 bg-[#fdfcf7]">
            <h2 className="text-lg font-bold uppercase mb-2">Generated Report</h2>
            <ReportDisplay report={report} />
          </section>
        )}
      </div>
    </main>
  );
}
