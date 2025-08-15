import React, { useState } from 'react';
import IdeaForm from '../components/IdeaForm';
import ReportDisplay from '../components/ReportDisplay';

export default function Home() {
  const [report, setReport] = useState('');

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">AI Bureau of Unclaimed Ideas</h1>
      <IdeaForm onSubmit={setReport} />
      <ReportDisplay report={report} />
    </main>
  );
}
