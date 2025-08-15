import React, { useState } from 'react';
import axios from 'axios';

const IdeaForm = ({ onSubmit }: { onSubmit: (report: string) => void }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/generateReport', { idea });
    onSubmit(response.data.report);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        rows={4}
        placeholder="Enter your half-baked idea here..."
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Submit to the Bureau
      </button>
    </form>
  );
};

export default IdeaForm;
