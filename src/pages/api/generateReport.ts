import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.GITHUB_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { idea } = req.body;

    const prompt = `You're an archivist for the AI Bureau of Unclaimed Ideas. Here's a new idea: "${idea}". Write a fictional report about what happened to it in 5, 10, and 20 years.`;

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4.1',
      temperature: 1.0,
      top_p: 1.0,
      messages: [
        { role: 'system', content: 'You are a dry, sarcastic, but insightful government archivist.' },
        { role: 'user', content: prompt },
      ],
    });

    res.status(200).json({ report: completion.choices[0]?.message?.content ?? 'No report generated.' });
  } catch (err) {
    console.error("❌ GitHub model error:", err);
    res.status(500).json({ error: "Failed to generate report." });
  }
}
