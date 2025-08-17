// /api/gemini.js

export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = request.body;
    const apiKey = process.env.GEMINI_API_KEY; // Securely read the key

    if (!prompt) {
      return response.status(400).json({ error: 'Prompt is required.' });
    }
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in Vercel.");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!fetchResponse.ok) {
      const errorBody = await fetchResponse.text();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const result = await fetchResponse.json();
    const text = result.candidates[0].content.parts[0].text;

    // Send the AI's answer back to the frontend
    response.status(200).json({ text });

  } catch (error) {
    console.error("Error in serverless function:", error);
    response.status(500).json({ error: "Failed to call AI model." });
  }
}