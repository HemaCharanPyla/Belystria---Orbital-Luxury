
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for Belystria, the world's first luxury orbital space hotel.
Your tone is sophisticated, welcoming, and knowledgeable.
Belystria is located in Low Earth Orbit (400km).
It features artificial gravity via a rotating torus design.
Amenities include the Astra Dome Observatory, Zero-G Ballroom, and Nebula Fine Dining.
You also have a "View Visualizer" tool where guests can generate AI images of their dream suite views.
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
    return "I am currently undergoing maintenance. Please try again later.";
  }
};

export const generateSuiteView = async (prompt: string): Promise<string | null> => {
  try {
    const fullPrompt = `A high-quality, photorealistic view from a luxury space hotel window. The window frame of Project Belystria (white and gold accents) is visible. Looking out at: ${prompt}. Cinematic lighting, 8k resolution, space photography style.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
