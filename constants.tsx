
import { Question, SpiritType, SpiritInfo } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "你第一次張開眼睛時，最先吸引你的是？",
    options: [
      { text: "林間吹來的風與光影", type: SpiritType.AUTONOMY },
      { text: "地面閃爍的符文路徑", type: SpiritType.COMPETENCE },
      { text: "附近其他剛醒來的小精靈", type: SpiritType.RELATEDNESS },
      { text: "手中種子散發的溫暖光芒", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 2,
    text: "你嘗試拍動翅膀飛起來，結果有點搖晃。你會？",
    options: [
      { text: "改變方向再試一次", type: SpiritType.AUTONOMY },
      { text: "調整姿勢努力飛得更穩", type: SpiritType.COMPETENCE },
      { text: "向旁邊的小精靈求助", type: SpiritType.RELATEDNESS },
      { text: "把這當成學習的過程", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 3,
    text: "前方出現巨大的蘑菇牆，你會？",
    options: [
      { text: "繞路探索新區域", type: SpiritType.AUTONOMY },
      { text: "找方法穿過去", type: SpiritType.COMPETENCE },
      { text: "問問別人怎麼走", type: SpiritType.RELATEDNESS },
      { text: "觀察結構找出突破方式", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 4,
    text: "天空開始飄起細雨，你內心的第一反應是？",
    options: [
      { text: "跟著感覺繼續飛", type: SpiritType.AUTONOMY },
      { text: "評估是否該調整行程", type: SpiritType.COMPETENCE },
      { text: "想找人一起避雨", type: SpiritType.RELATEDNESS },
      { text: "覺得這是成長的一部分", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 5,
    text: "你來到一片能量花田，你最想做的是？",
    options: [
      { text: "隨意飛舞感受自由", type: SpiritType.AUTONOMY },
      { text: "吸收最多能量讓自己變強", type: SpiritType.COMPETENCE },
      { text: "分享花蜜給其他精靈", type: SpiritType.RELATEDNESS },
      { text: "記住這裡的感覺", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 6,
    text: "夜晚到來，你準備休息，你最在意？",
    options: [
      { text: "能不能照自己節奏休息", type: SpiritType.AUTONOMY },
      { text: "明天是否能更有效率", type: SpiritType.COMPETENCE },
      { text: "有沒有夥伴一起聊天", type: SpiritType.RELATEDNESS },
      { text: "今天學到了什麼", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 7,
    text: "你不小心讓願望種子掉落了一下，你會？",
    options: [
      { text: "換個方式繼續前進", type: SpiritType.AUTONOMY },
      { text: "告訴自己要更小心", type: SpiritType.COMPETENCE },
      { text: "希望有人安慰你", type: SpiritType.RELATEDNESS },
      { text: "想著「這也是成長的一步」", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 8,
    text: "前方出現兩條路：一條安全、一條未知但閃著光，你會？",
    options: [
      { text: "跟著內心的感覺走", type: SpiritType.AUTONOMY },
      { text: "選成功率高的路", type: SpiritType.COMPETENCE },
      { text: "看大家走哪條", type: SpiritType.RELATEDNESS },
      { text: "觀察再決定", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 9,
    text: "你飛到高處，看見整片森林，你最強烈的感受是？",
    options: [
      { text: "我想找到屬於我的方向", type: SpiritType.AUTONOMY },
      { text: "我想變得更強", type: SpiritType.COMPETENCE },
      { text: "我想和誰分享這一刻", type: SpiritType.RELATEDNESS },
      { text: "我真的正在改變", type: SpiritType.GROWTH }
    ]
  },
  {
    id: 10,
    text: "世界樹詢問你：你最希望成為怎樣的小精靈？",
    options: [
      { text: "自由飛翔的探索者", type: SpiritType.AUTONOMY },
      { text: "能力強大的守護者", type: SpiritType.COMPETENCE },
      { text: "溫暖陪伴的光之精靈", type: SpiritType.RELATEDNESS },
      { text: "不斷成長的學習者", type: SpiritType.GROWTH }
    ]
  }
];

export const SPIRIT_DATA: Record<SpiritType, SpiritInfo> = {
  [SpiritType.AUTONOMY]: {
    name: "風芽精靈",
    story: "我在輕拂的樹葉聲中醒來，空氣裡的微風正呼喚我的名字。我不是一粒被定型的種子，而是隨風起舞的靈魂。森林很大，但我知道這雙新生的翅膀，只會飛往我心底真正想去的方向，在那裡，我能與最真實的自己重逢。",
    strength: "你擁有一顆不願被定義的心，這份自主是你最強大的羅盤。你擅長在紛擾中傾聽自己的節奏，當你聽從直覺行動時，你的靈魂會綻放出一種無可取代的光采。你的勇氣能打破陳規，在無人踏足的荒原中開闢出屬於你的祕徑。",
    caution: "當你飛得太遠，孤單的迷霧有時會悄悄襲來，讓你誤以為獨立就是孤立。請注意，拒絕被安排不代表自私，而是保留純粹的能量。但別因為害怕「被困住」，而拒絕了那些能為你提供溫暖與安穩的港灣。",
    advice: ["每週選一天完全不按計畫行事", "在筆記本寫下三個「我最想做」的純粹決定", "去一個從未去過的森林角落散步"],
    color: "from-sky-400 to-indigo-500",
    traits: ["自主探索", "自由之翼", "獨特節奏"],
    motto: "風從不問方向，因為心在哪裡，路就在哪裡。"
  },
  [SpiritType.COMPETENCE]: {
    name: "鍛芽精靈",
    story: "我從堅硬岩石的縫隙中探出頭，手心跳動著不熄的火焰。我感覺體內蘊含著改造世界的渴望，每一次揮動翅膀，都是在確認自己的力量。我不畏懼高度，因為我深信雙手能鍛造出更堅韌的未來，在每一次磨礪中找到靈魂最真實的重量。",
    strength: "你追求卓越的意志是森林中最穩定的力量。你擅長透過實踐與學習來獲得掌控感，這份勝任感能讓你即便在暴雨中也能站穩腳跟。你對目標的堅持與專業，是同伴眼中最值得信賴的燈塔，你的進步就是整個森林的希望。",
    caution: "追求完美的火焰有時會變成沉重的枷鎖，讓你因一時的停滯而感到劇烈焦慮。迷霧中，別忘了你也是個需要休息的孩子。你的價值不只建立在成就之上，那些努力過的痕跡，本身就是最美的勳章。請練習在努力之餘也擁抱脆弱。",
    advice: ["將大挑戰拆解成三個微型勝利", "練習在挫折後對自己說「我已經盡力且很棒了」", "嘗試一項完全不計成敗的純粹愛好"],
    color: "from-slate-600 to-emerald-900",
    traits: ["能力卓越", "突破自我", "目標導向"],
    motto: "最堅硬的磐石，也曾是一粒勇敢的種子。"
  },
  [SpiritType.RELATEDNESS]: {
    name: "光芽精靈",
    story: "當第一道暖光包圍我時，我聽見了森林深處溫柔的呼吸。我發現自己並不孤單，周圍每一片葉子的震動都與我息息相關。我伸出手，感受到彼此交會時產生的微熱。在愛與被愛的流動中，我終於找到了存在的意義，那是一種最深沉的平靜。",
    strength: "你天生擁有療癒他人的天賦，連結的力量是你靈魂最深的養分。你懂得傾聽風的低語，也能察覺夥伴眉間的陰影。這份共感力讓你成為森林的黏合劑，在守望相助中創造出最溫暖的奇蹟。你的存在本身，就是一份最美的安慰。",
    caution: "太過在意他人的感受，有時會讓你像被雨淋濕的翅膀，沉重得飛不起來。迷霧中，請分清他人的情緒與自己的界線。保護好自己的光，你才能在不消耗自己的情況下，繼續溫暖整片森林。記住，愛自己才是愛他人的起點。",
    advice: ["寫一封信給很久沒聯絡的知心好友", "練習在群體中勇敢說出自己的真實需求", "每天給予身邊的人一個真心且具體的讚美"],
    color: "from-rose-400 to-amber-500",
    traits: ["溫暖陪伴", "情感連結", "共感之光"],
    motto: "當我們交會時，整片森林都亮了起來。"
  },
  [SpiritType.GROWTH]: {
    name: "森芽精靈",
    story: "我在濕潤土壤的芬芳中緩慢睜開眼，感覺全身的纖維都在悄悄向上延伸。我並不完美，甚至有些青澀，但我享受這種持續蛻變的顫動。每一次失敗都像養分，滲進我的根系，讓我明白生命是一場沒有終點的航行，而我正走在更好的路上。",
    strength: "你擁有最珍貴的成長型思維，將變化視為生命的本質。你懂得在失敗中挖掘智慧，在時間的流轉中累積韌性。這份對未來的開放感，讓你無論身處何種季節，都能保有持續萌發的生命力。你的存在，證明了生命有無限的可能。",
    caution: "有時你會因為成長的緩慢而感到沮喪，或羨慕他人瞬間的綻放。迷霧中，請安靜聽聽內心發芽的聲音。每一棵參天大樹都曾是沉默的種子，你的累積從未白費，只是還在等待破土的時機。別讓焦慮偷走了你享受成長的樂趣。",
    advice: ["記錄下一件今天雖然失敗但學到的事", "找一位長輩或智者，聊聊生命中的轉折", "為自己種下一盆植物，觀察它緩慢生長的節奏"],
    color: "from-yellow-400 to-green-600",
    traits: ["持續蛻變", "學習熱情", "韌性成長"],
    motto: "不求瞬間綻放，但求日日生長。"
  }
};
