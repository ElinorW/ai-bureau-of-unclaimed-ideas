import React, { useState } from 'react';
import axios from 'axios';

const IdeaForm = ({ onSubmit }: { onSubmit: (report: string) => void }) => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/generateReport', { idea });
      onSubmit(response.data.report);
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-semibold mb-1">Your Half-Baked Idea</label>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="w-full p-2 border border-black rounded bg-[#fffdf5] mb-4"
        rows={4}
        placeholder="e.g. An app that only works when you're sad..."
      />
      <button
        type="submit"
        className="uppercase px-4 py-2 border border-black bg-black text-white font-bold hover:bg-white hover:text-black transition"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit to the Bureau'}
      </button>
    </form>
  );
};

export default IdeaForm;
