// Gemini API utility for AI tools
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
  error?: {
    message: string;
  };
}

export const callGeminiAPI = async (
  prompt: string,
  apiKey: string
): Promise<{ success: boolean; text?: string; error?: string }> => {
  if (!apiKey) {
    return { 
      success: false, 
      error: 'API key not configured. Please add your Gemini API key in the admin settings.' 
    };
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data: GeminiResponse = await response.json();

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return { success: true, text };
    }

    return { success: false, error: 'No response from AI' };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to connect to AI service' 
    };
  }
};

// Prompts for different AI tools
export const AI_PROMPTS = {
  summarize: (text: string) => 
    `Summarize the following text in a clear, concise manner. Keep the key points and main ideas:\n\n${text}`,
  
  grammar: (text: string) => 
    `Check the following text for grammar, spelling, and punctuation errors. Provide the corrected version and list the changes made:\n\n${text}`,
  
  codeExplain: (code: string) => 
    `Explain the following code in simple terms. Break down what each part does:\n\n${code}`,
  
  translate: (text: string, targetLang: string) => 
    `Translate the following text to ${targetLang}. Only provide the translation, nothing else:\n\n${text}`,
  
  imageCaption: (description: string) => 
    `Based on this image description, generate 5 creative and engaging captions suitable for social media:\n\n${description}`,
  
  contentWriter: (topic: string) => 
    `Write a short, engaging article (about 200 words) about: ${topic}`,
  
  codeGenerator: (description: string, language: string) =>
    `Generate ${language} code for the following requirement. Include comments explaining the code:\n\n${description}`,
};
