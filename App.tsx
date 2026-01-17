
import React, { useState, useEffect } from 'react';
import { AppStage, SpiritType, QuizResult } from './types';
import { QUESTIONS, SPIRIT_DATA } from './constants';
import { getSproutOracle, generateSpiritPortrait, generateAIImage } from './geminiService';
import { 
  Sparkles, 
  ChevronRight, 
  Leaf, 
  RefreshCcw, 
  Send,
  Loader2,
  BookOpen,
  Users,
  Trophy,
  Compass,
  Quote,
  ImageIcon,
  Wand2
} from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LANDING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<SpiritType[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [wish, setWish] = useState('');
  const [oracle, setOracle] = useState('');
  const [isLoadingOracle, setIsLoadingOracle] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const resetApp = () => {
    setStage(AppStage.LANDING);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setWish('');
    setOracle('');
    setPortraitUrl(null);
    setImageError(false);
    setIsGeneratingImage(false);
  };

  const handleAnswer = (type: SpiritType) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: SpiritType[]) => {
    const counts: Record<SpiritType, number> = {
      [SpiritType.AUTONOMY]: 0,
      [SpiritType.COMPETENCE]: 0,
      [SpiritType.RELATEDNESS]: 0,
      [SpiritType.GROWTH]: 0,
    };

    finalAnswers.forEach(ans => counts[ans]++);
    
    const tieBreakOrder = [SpiritType.AUTONOMY, SpiritType.COMPETENCE, SpiritType.RELATEDNESS, SpiritType.GROWTH];
    let dominant: SpiritType = SpiritType.AUTONOMY;
    let maxCount = -1;
    tieBreakOrder.forEach(type => {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        dominant = type;
      }
    });

    const quizResult = { dominantType: dominant, scores: counts };
    setResult(quizResult);
    setStage(AppStage.RESULT);
    
    const portrait = await generateSpiritPortrait(SPIRIT_DATA[dominant], dominant);
    setPortraitUrl(portrait);
  };

  const handleAwakenTrueForm = async () => {
    if (!result) return;
    setIsGeneratingImage(true);
    const aiImage = await generateAIImage(SPIRIT_DATA[result.dominantType], wish || "美好的未來");
    if (aiImage) {
      setPortraitUrl(aiImage);
      setImageError(false);
    }
    setIsGeneratingImage(false);
  };

  const generateOracle = async () => {
    if (!result || !wish.trim()) return;
    setIsLoadingOracle(true);
    setStage(AppStage.ORACLE);
    const spiritInfo = SPIRIT_DATA[result.dominantType];
    const response = await getSproutOracle(spiritInfo, wish);
    setOracle(response || '');
    setIsLoadingOracle(false);
  };

  const getSpiritIcon = (type: SpiritType) => {
    switch (type) {
      case SpiritType.AUTONOMY: return <Compass size={40} />;
      case SpiritType.COMPETENCE: return <Trophy size={40} />;
      case SpiritType.RELATEDNESS: return <Users size={40} />;
      case SpiritType.GROWTH: return <BookOpen size={40} />;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-[#f0f7f4] text-[#2d4030]">
      <div className="absolute inset-0 mist-overlay z-0" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-shimmer"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 2 + 3) + 's'
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl z-10 pb-10">
        {stage === AppStage.LANDING && (
          <div className="text-center space-y-10">
            <div className="flex justify-center mb-4">
              <div className="p-12 bg-white rounded-full shadow-2xl animate-float relative">
                <Leaf size={80} className="text-green-600 fill-green-500" />
                <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={32} />
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-black text-green-900 mb-2 opacity-0 animate-fade-in-up">新年覺醒之旅</h1>
              <div className="space-y-4 text-lg md:text-xl text-green-800/80 font-medium leading-relaxed">
                <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  新年的晨光灑落，世界樹低聲吟唱，願望種子輕輕落下……<br />
                  你，一隻新芽小精靈，從柔軟的樹根中醒來。<br />
                  翅膀輕輕顫動，手中握著微溫的願望種子。<br />
                  這個新年，你的成長之旅，即將展開。
                </p>
              </div>
            </div>
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <button 
                onClick={() => setStage(AppStage.QUIZ)}
                className="group relative px-16 py-6 bg-green-700 hover:bg-green-800 text-white rounded-full text-2xl font-bold transition-all shadow-2xl"
              >
                喚醒新芽 <ChevronRight size={28} className="group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {stage === AppStage.QUIZ && (
          <div className="sprout-card p-10 md:p-14 rounded-[2.5rem] shadow-2xl space-y-10 animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-green-700 tracking-[0.3em] uppercase bg-green-100/50 px-4 py-1.5 rounded-full">
                醒覺度 {currentQuestion + 1} / {QUESTIONS.length}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-950 leading-tight">{QUESTIONS[currentQuestion].text}</h2>
            <div className="grid gap-4">
              {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.type as SpiritType)}
                  className="w-full text-left p-7 rounded-[1.5rem] bg-white border border-green-50 hover:border-green-400 hover:bg-green-50 transition-all shadow-sm"
                >
                  <span className="text-xl text-green-800">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === AppStage.RESULT && result && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div className={`p-10 md:p-16 rounded-[3rem] shadow-2xl bg-gradient-to-br ${SPIRIT_DATA[result.dominantType].color} text-white relative`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-2">
                  <h3 className="text-sm font-black tracking-[0.5em] uppercase opacity-70">世界樹的呼喚</h3>
                  <h2 className="text-6xl md:text-7xl font-black">{SPIRIT_DATA[result.dominantType].name}</h2>
                </div>
                <div className="p-6 bg-white/20 rounded-[2.5rem] backdrop-blur-xl border border-white/30">
                  {getSpiritIcon(result.dominantType)}
                </div>
              </div>

              <div className="mb-8 flex flex-col items-center gap-6">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-4 border-white/40 shadow-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  {isGeneratingImage && (
                    <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center">
                      <Loader2 className="animate-spin mb-4" size={48} />
                      <p className="font-bold">正在召喚精靈真身...</p>
                    </div>
                  )}
                  {portraitUrl && !imageError ? (
                    <img 
                      key={portraitUrl}
                      src={portraitUrl} 
                      alt="Spirit Portrait" 
                      className="w-full h-full object-cover animate-in fade-in duration-1000"
                      onError={(e) => {
                        console.warn("Retrying image load with clean path...");
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('./')) {
                          target.src = portraitUrl.replace('./', '');
                        } else {
                          setImageError(true);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/60 p-8 text-center gap-4">
                      <ImageIcon size={48} className="opacity-40" />
                      <p className="text-sm font-medium">森林迷霧太濃，無法看清精靈模樣...</p>
                    </div>
                  )}
                </div>
                {imageError && !isGeneratingImage && (
                  <button 
                    onClick={handleAwakenTrueForm}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/40 rounded-full text-white font-bold transition-all animate-pulse"
                  >
                    <Wand2 size={20} /> 召喚精靈真身 (AI 生成)
                  </button>
                )}
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 opacity-20" size={64} />
                  <p className="text-2xl md:text-3xl text-center px-4 font-medium leading-relaxed italic-normal">{SPIRIT_DATA[result.dominantType].story}</p>
                </div>
              </div>
            </div>

            <div className="sprout-card p-10 rounded-[2rem] shadow-xl space-y-8 bg-white/80">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-green-950 flex items-center gap-3">
                  <Send size={24} className="text-green-600" /> 種下你的願望
                </h4>
              </div>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="例如：我希望今年能更有勇氣去嘗試那些一直不敢做的事..."
                className="w-full h-40 p-6 rounded-3xl border-2 border-green-50 focus:border-green-400 focus:outline-none bg-white text-green-950 resize-none text-lg"
              />
              <div className="flex gap-4">
                <button onClick={resetApp} className="px-8 py-5 rounded-3xl bg-slate-100 text-slate-500 font-bold flex items-center gap-2">
                  <RefreshCcw size={24} /> 重測
                </button>
                <button
                  onClick={generateOracle}
                  disabled={!wish.trim()}
                  className="flex-1 py-5 bg-green-700 hover:bg-green-800 disabled:bg-green-200 text-white rounded-3xl text-xl font-black transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  獲取新年神諭 <Sparkles size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === AppStage.ORACLE && (
          <div className="sprout-card p-10 md:p-16 rounded-[3rem] shadow-2xl space-y-12 animate-in slide-in-from-top-10">
            <h2 className="text-4xl font-black text-green-950 text-center">世界樹的啟示</h2>
            <div className="relative min-h-[300px]">
              {isLoadingOracle ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-green-800/40 space-y-8">
                  <Loader2 className="animate-spin" size={48} />
                  <p className="font-bold animate-pulse">正在轉化森林的低語...</p>
                </div>
              ) : (
                <div className="prose prose-green max-w-none text-green-950 whitespace-pre-line text-xl font-medium leading-loose">
                  {oracle}
                </div>
              )}
            </div>
            {!isLoadingOracle && (
              <div className="pt-10 flex gap-5">
                <button onClick={resetApp} className="flex-1 py-5 bg-green-900 text-white rounded-[2rem] font-black">重返覺醒</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
