import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the API client
// Note: In a production environment, ensure process.env.API_KEY is properly set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for Belystria, the world's first luxury orbital space hotel.
Your tone is sophisticated, welcoming, and knowledgeable.
Belystria is located in Low Earth Orbit (400km).
It features artificial gravity via a rotating torus design.
Amenities include the Astra Dome Observatory, Zero-G Ballroom, and Nebula Fine Dining.
Answer questions about the hotel, the experience, the science, and booking.
Keep answers concise (under 100 words) unless asked for details.
If asked about pricing, mention it starts at $2.5M per guest for a 3-day stay.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "I'm currently in offline mode (API Key missing). I can tell you that Belystria offers the ultimate luxury experience in Low Earth Orbit.";
    }

    const model = 'gemini-2.5-flash';
    
    // We use a chat session to maintain context if needed, or single generation.
    // For this implementation, we will use generateContent with system instruction.
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I apologize, I'm having trouble connecting to the station network.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently undergoing maintenance. Please try again later.";
  }
};