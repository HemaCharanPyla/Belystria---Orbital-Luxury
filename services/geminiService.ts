
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the API client using the required naming convention and environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    const model = 'gemini-3-flash-preview';
    
    // Construct the full contents array including history and current message to enable multi-turn memory
    const contents = [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I apologize, I'm having trouble connecting to the station network.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Handle specific API key errors gracefully
    if (error instanceof Error && (error.message.includes("403") || error.message.includes("key"))) {
      return "Station communication link encrypted. Please ensure the orbital access key (API Key) is valid.";
    }
    return "I am currently undergoing maintenance. Please try again later.";
  }
};
