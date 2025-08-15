export default async function handler(request, response) {
  const { prompt } = request.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const result = await fetchResponse.json();
    const text = result.candidates[0].content.parts[0].text;
    response.status(200).json({ text });
  } catch (error) {
    console.error("Error in serverless function:", error);
    response.status(500).json({ error: "Failed to call AI model." });
  }
}