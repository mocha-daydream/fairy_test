
import { GoogleGenAI } from "@google/genai";
import { SpiritType, SpiritInfo } from "./types";

export async function getSproutOracle(spirit: SpiritInfo, wish: string) {
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
  // 僅返回預設的本地靜態圖片路徑
  return spirit.imageUrl;
}
