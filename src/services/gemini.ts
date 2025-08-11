import {
  GoogleGenAI,

} from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyAmiyhzQd2DWrKXULHd9O4doLLjDAzwEAg"});

export default async function chatWithGemini(imageUrl: string): Promise<string | undefined> {
  console.log("Fungsi berjalan!")
  try{


  const responseImage = await fetch(imageUrl);
  const imageArrayBuffer = await responseImage.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      { text: "Bisakah kamu table data text dari gambar ini diubah menjadi  format csv?" }
    ],
  });
  return response.text}
  catch (error) {
    throw error}
}
