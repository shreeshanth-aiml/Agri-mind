const cache = new Map<string, any>();

export async function callGemini(params: {
  prompt: string;
  systemInstruction?: string;
  imageBase64?: string;
  responseSchema?: any;
  isJSON?: boolean;
}) {
  const cacheKey = JSON.stringify(params);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to call Gemini API');
  }

  const data = await res.json();
  let result;

  if (params.responseSchema || params.isJSON) {
    try {
      let cleanText = (data.text || '').trim();
      cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
      result = JSON.parse(cleanText);
    } catch (e) {
      console.error('Failed to parse structured JSON from Gemini:', data.text);
      throw new Error('Invalid JSON returned by AI');
    }
  } else {
    result = data.text;
  }

  cache.set(cacheKey, result);
  return result;
}
