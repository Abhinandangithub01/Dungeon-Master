
import { GoogleGenAI, Chat } from "@google/genai";
import { IMAGE_GENERATION_PROMPT_TEMPLATE, DM_SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

export const geminiService = {
  startChat: (): void => {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: DM_SYSTEM_INSTRUCTION,
      },
    });
  },

  sendMessageStream: async (message: string) => {
    if (!chat) {
      throw new Error("Chat not initialized. Call startChat first.");
    }
    return chat.sendMessageStream({ message });
  },

  generateImage: async (description: string): Promise<string> => {
    try {
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: IMAGE_GENERATION_PROMPT_TEMPLATE(description),
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error) {
      console.error("Image generation failed:", error);
      // Return a placeholder or handle the error as needed
      return "https://picsum.photos/1024/576";
    }
  },
};
