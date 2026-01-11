
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHRAssistance = async (query: string, context?: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert HR Assistant. 
      Context about the company: 
      - Working hours: 9:00 AM to 6:00 PM.
      - Late policy: Arrival after 9:15 AM is marked Late. 3 late marks = 1 casual leave deduction.
      - Leave policy: 18 Annual leaves, 12 Sick leaves, 10 Casual leaves per year.
      - Overtime: Calculated after 7:00 PM.
      
      The user asks: "${query}"
      
      Additional data provided: ${JSON.stringify(context || {})}
      
      Please provide a professional, helpful, and concise HR-related response.`,
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The HR AI Assistant is currently offline. Please try again later.";
  }
};
