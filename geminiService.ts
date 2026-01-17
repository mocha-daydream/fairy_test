
import { GoogleGenAI, Type } from "@google/genai";
import { SpiritType, SpiritInfo } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSproutOracle(spirit: SpiritInfo, wish: string) {
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
  // 核心藝術風格：對齊附圖的人物角色設計與水彩筆觸
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
      // 風芽精靈：淡藍/雲朵白、鳥翅葉子、風鈴、雲朵髮
      characterSpecific = `
        A Wind Sprout Spirit. Colors: Pale blue and cloud white. 
        Head leaves: Shaped like bird wings with translucent tips. 
        Hair: Fluffy cloud-like hair with a light wind-blown effect. 
        Accessories: Light wind bells hanging from the waist, semi-transparent feather-like wings. 
        Personality: Free-spirited, flying with a happy smiley face.
      `;
      break;
    case SpiritType.COMPETENCE:
      // 鍛芽精靈：暖紅/橘色/火焰紋、火焰葉子、火炬、亂髮
      characterSpecific = `
        A Forge Sprout Spirit. Colors: Warm red and orange with subtle flame patterns. 
        Head leaves: Shaped like flickering flames with glowing edges. 
        Hair: Messy and dynamic hair, looking like it's made of fire. 
        Accessories: Holding a small rustic wooden torch with a glowing flame, clothes with flame motifs. 
        Personality: Brave, adventurous, and curious.
      `;
      break;
    case SpiritType.RELATEDNESS:
      // 光芽精靈：暖黃/金色/光暈、太陽葉子、燈籠、光滑髮
      characterSpecific = `
        A Light Sprout Spirit. Colors: Warm yellow and golden with a soft luminous halo. 
        Head leaves: Shaped like the sun with radiant edges. 
        Hair: Smooth and glossy hair with a soft glowing effect. 
        Accessories: Holding a delicate small lantern, clothes with star patterns. 
        Personality: Warm, helpful, with a bright smiling face.
      `;
      break;
    case SpiritType.GROWTH:
      // 森芽精靈：綠色/木紋、大樹葉/花果、木笛、藤蔓髮
      characterSpecific = `
        A Forest Sprout Spirit. Colors: Deep green with natural wood grain textures. 
        Head leaves: Large lush tree leaves with tiny colorful flowers and small fruits. 
        Hair: Vine-like hair cascading down with small leaf decorations. 
        Accessories: A small wooden flute hanging from the waist, clothes with forest patterns. 
        Personality: Steady, protective, calm, and observing quietly.
      `;
      break;
  }

  const finalPrompt = `${characterSpecific} ${baseArtStyle} Centered composition, high resolution artistic rendering.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: finalPrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
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
}
