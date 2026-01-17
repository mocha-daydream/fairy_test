
import { GoogleGenAI, Type } from "@google/genai";
import { SpiritType, SpiritInfo } from "./types";

export async function getSproutOracle(spirit: SpiritInfo, wish: string) {
  // 每次呼叫時才建立實例，確保獲取最新金鑰
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    你是一位森林中的「世界樹長老」。
    目前有一位剛誕生的「${spirit.name}」新芽小精靈尋求你的新年指引。
    
    【精靈特質分析】
    - 靈魂故事：${spirit.story}
    - 核心力量：${spirit.strength}
    - 潛在挑戰：${spirit.caution}
    - 建議行動：${spirit.advice.join('、')}
    
    【精靈的新年願望】
    「${wish}」
    
    請以長老的口吻，給予他一段優美、充滿森林意象且具有深度心理啟發的新年神諭。
    
    回答規範：
    1. 【引言】：以溫暖、神秘的語氣開頭，稱呼他為「親愛的${spirit.name}」。
    2. 【共鳴】：分析他的特質（如：${spirit.traits.join('、')}）與願望之間的深刻連結。
    3. 【啟示】：結合森林生長的隱喻（如：季節更迭、根系蔓延、光合作用），給予他具體的心理或生活建議。
    4. 【祝福】：送他一句簡短且富有詩意的「世界樹箴言」。
    
    請用繁體中文回答，語氣要優雅且充滿智慧。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
        topK: 40,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Oracle Error:", error);
    return "森林長老正在深層靈修中...但他托風傳來一句話：你的本質就是最仁慈的種子，請帶著勇氣，在屬於你的土壤裡紮根生長。";
  }
}

export async function generateSpiritPortrait(spirit: SpiritInfo, type: SpiritType): Promise<string | null> {
  // 升級影像模型至 gemini-3-pro-image-preview
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const baseArtStyle = `
    Whimsical storybook illustration, digital watercolor style. 
    Character: Cute 2-head-high Chibi sprout spirit with a round soft face and simple black dot eyes. 
    Technique: Delicate pencil sketch outlines, soft watercolor washes with gentle color bleeding, visible cold-press paper grain. 
    Background: Minimalist off-white watercolor paper with subtle artistic paint splashes. 
    Atmosphere: Healing, warm ethereal lighting, golden glowing particles. 
    STRICTLY NO TEXT, NO LETTERS, NO WORDS, NO SIGNATURES.
  `;

  let characterSpecific = "";
  switch(type) {
    case SpiritType.AUTONOMY:
      characterSpecific = `A Wind Sprout Spirit. Colors: Pale blue and cloud white. Head leaves: Shaped like bird wings. Hair: Fluffy cloud-like hair. Accessories: Light wind bells.`;
      break;
    case SpiritType.COMPETENCE:
      characterSpecific = `A Forge Sprout Spirit. Colors: Warm red and orange. Head leaves: Flickering flames. Hair: Messy fire hair. Accessories: A small wooden torch.`;
      break;
    case SpiritType.RELATEDNESS:
      characterSpecific = `A Light Sprout Spirit. Colors: Warm yellow and golden. Head leaves: Sun shaped. Hair: Smooth glossy hair. Accessories: A delicate small lantern.`;
      break;
    case SpiritType.GROWTH:
      characterSpecific = `A Forest Sprout Spirit. Colors: Deep green. Head leaves: Large lush tree leaves. Hair: Vine-like hair. Accessories: A small wooden flute.`;
      break;
  }

  const finalPrompt = `${characterSpecific} ${baseArtStyle} Centered composition.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: finalPrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    // 如果出現特定錯誤，可能需要重新選取 Key
    if (error.message && error.message.includes("Requested entity was not found")) {
        // 交由 UI 層級處理
        throw error;
    }
    return null;
  }
}
