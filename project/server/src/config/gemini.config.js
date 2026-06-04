// src/config/gemini.config.js

import { GoogleGenAI } from '@google/genai'

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️ GEMINI_API_KEY is missing in .env')
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const MODEL_NAME = 'gemini-2.5-flash'

export const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    })

    if (!response || !response.text) {
      throw new Error('Empty response received from Gemini')
    }

    return response.text
  } catch (error) {
    console.error('Gemini API Error:', error.message)

    throw new Error(
      `Gemini API failed: ${error.message}`
    )
  }
}

export { ai, MODEL_NAME }