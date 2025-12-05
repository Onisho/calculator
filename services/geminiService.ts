import { GoogleGenAI, Type } from "@google/genai";
import { AISolution } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const solveMathProblem = async (problem: string): Promise<AISolution> => {
  try {
    const ai = getClient();
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Solve this math problem or answer this question about mathematics. 
      Provide the final answer clearly and a brief step-by-step reasoning.
      Problem: ${problem}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "The concise final answer (e.g., '42' or 'x = 5')",
            },
            reasoning: {
              type: Type.STRING,
              description: "A short explanation of how the answer was derived.",
            },
          },
          required: ["answer", "reasoning"],
        },
        systemInstruction: "You are a helpful and precise math assistant. Always be accurate. If the input is not a math problem, politely explain that you can only help with math.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AISolution;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      answer: "Error",
      reasoning: "Failed to connect to the AI service. Please check your API key and connection."
    };
  }
};
