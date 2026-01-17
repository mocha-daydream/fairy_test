
import React, { useState, useEffect } from 'react';
import { AppStage, SpiritType, QuizResult } from './types';
import { QUESTIONS, SPIRIT_DATA } from './constants';
import { getSproutOracle, generateSpiritPortrait } from './geminiService';
import { 
  Trees, 
  Sparkles, 
  ChevronRight, 
  Leaf, 
  RefreshCcw, 
  Send,
  Loader2,
  Wind,
  Sun,
  Droplets,
  BookOpen,
  Users,
  Trophy,
  Compass,
  Zap,
  CloudFog,
  Star,
  Quote,
  Heart,
  ImageIcon
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
  const [isLoadingPortrait, setIsLoadingPortrait] = useState(false);

  const resetApp = () => {
    setStage(AppStage.LANDING);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setWish('');
    setOracle('');
    setPortraitUrl(null);
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
    
    const tieBreakOrder = [
      SpiritType.AUTONOMY, 
      SpiritType.COMPETENCE, 
      SpiritType.RELATEDNESS, 
      SpiritType.GROWTH
    ];

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
    
    setIsLoadingPortrait(true);
    const portrait = await generateSpiritPortrait(SPIRIT_DATA[dominant], dominant);
    setPortraitUrl(portrait);
    setIsLoadingPortrait(false);
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
      {/* Misty Background & Particles */}
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
        <div className="absolute top-10 left-10 opacity-10"><Trees size={120} /></div>
        <div className="absolute bottom-20 right-10 opacity-10"><Trees size={150} /></div>
      </div>

      <div className="w-full max-w-2xl z-10 pb-10">
        {stage === AppStage.LANDING && (
          <div className="text-center space-y-10">
            <div className="flex justify-center mb-4">
              <div className="p-12 bg-white rounded-full shadow-2xl shadow-green-100 animate-float relative overflow-visible">
                <Leaf size={80} className="text-green-600 fill-green-500 transition-transform duration-700 hover:rotate-12" />
                <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={32} />
                <div className="absolute -inset-4 border border-green-200 rounded-full animate-ping opacity-20 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black text-green-900 mb-2 opacity-0 animate-fade-in-up">
                新年覺醒之旅
              </h1>
              
              <div className="space-y-3 text-lg md:text-xl text-green-800/80 font-medium leading-relaxed">
                <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  新年的晨光灑落，世界樹低聲吟唱，願望種子輕輕落下……
                </p>
                <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  你，一隻新芽小精靈，從柔軟的樹根中醒來。
                </p>
                <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                  翅膀輕輕顫動，手中握著微溫的願望種子。
                </p>
                <p className="font-black text-green-900 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
                  這個新年，你的成長之旅，即將展開。
                </p>
              </div>
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '2.2s' }}>
              <button 
                onClick={() => setStage(AppStage.QUIZ)}
                className="group relative px-16 py-6 bg-green-700 hover:bg-green-800 text-white rounded-full text-2xl font-bold transition-all shadow-2xl hover:scale-105 active:scale-95 ring-4 ring-green-100"
              >
                <span className="relative z-10 flex items-center gap-3">
                  喚醒新芽 <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
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
              <div className="w-48 h-2 bg-green-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 transition-all duration-700 ease-out" 
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }} 
                />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-green-950 leading-tight">
              {QUESTIONS[currentQuestion].text}
            </h2>

            <div className="grid gap-4">
              {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.type as SpiritType)}
                  className="w-full text-left p-7 rounded-[1.5rem] bg-white border border-green-50 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <span className="text-xl text-green-800 group-hover:text-green-950 transition-colors">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === AppStage.RESULT && result && (
          <div className="space-y-8 animate-in zoom-in-95 duration-1000">
            <div className={`p-10 md:p-16 rounded-[3rem] shadow-2xl bg-gradient-to-br ${SPIRIT_DATA[result.dominantType].color} text-white relative overflow-hidden`}>
              <div className="absolute top-[-20%] right-[-10%] opacity-10 rotate-12 scale-150 pointer-events-none">
                {getSpiritIcon(result.dominantType)}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-2">
                  <h3 className="text-sm font-black tracking-[0.5em] uppercase opacity-70">世界樹的呼喚</h3>
                  <h2 className="text-6xl md:text-7xl font-black drop-shadow-lg">
                    {SPIRIT_DATA[result.dominantType].name}
                  </h2>
                </div>
                <div className="p-6 bg-white/20 rounded-[2.5rem] backdrop-blur-xl border border-white/30 shadow-inner flex items-center justify-center">
                  {getSpiritIcon(result.dominantType)}
                </div>
              </div>

              <div className="mb-8 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm group">
                  {isLoadingPortrait ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="animate-spin text-white opacity-60" size={48} />
                      <p className="text-sm font-bold tracking-widest uppercase opacity-80 animate-pulse">【新芽努力中😄】</p>
                    </div>
                  ) : portraitUrl ? (
                    <img src={portraitUrl} alt="Spirit Portrait" className="w-full h-full object-cover animate-in fade-in zoom-in-110 duration-1000" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-white/40">
                      <ImageIcon size={48} />
                      <span className="text-xs uppercase tracking-tighter">顯化失敗</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 opacity-20" size={64} />
                  <p className="text-2xl md:text-3xl leading-relaxed opacity-95 text-center px-4 relative z-10 font-medium">
                    {SPIRIT_DATA[result.dominantType].story}
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {SPIRIT_DATA[result.dominantType].traits.map((trait, i) => (
                    <span key={i} className="px-6 py-2 bg-white/20 rounded-full text-sm font-bold backdrop-blur-md border border-white/20">
                      #{trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="sprout-card p-8 rounded-[2rem] shadow-xl border-l-8 border-green-500 space-y-4">
                <div className="flex items-center gap-3 text-green-700 font-bold mb-2">
                  <Zap size={24} className="fill-green-100" /> <span className="text-lg">靈魂核心力量</span>
                </div>
                <p className="text-green-900/80 leading-relaxed text-lg font-medium">
                  {SPIRIT_DATA[result.dominantType].strength}
                </p>
              </div>
              <div className="sprout-card p-8 rounded-[2rem] shadow-xl border-l-8 border-amber-500 space-y-4">
                <div className="flex items-center gap-3 text-amber-700 font-bold mb-2">
                  <CloudFog size={24} /> <span className="text-lg">迷霧之境提醒</span>
                </div>
                <p className="text-green-900/80 leading-relaxed text-lg font-medium">
                  {SPIRIT_DATA[result.dominantType].caution}
                </p>
              </div>
            </div>

            <div className="sprout-card p-10 rounded-[2rem] shadow-xl space-y-8">
              <div className="flex items-center gap-4 text-green-900 font-bold text-2xl">
                <Heart className="text-rose-500 fill-rose-500" /> 
                溫暖行動建議
              </div>
              <ul className="grid gap-4">
                {SPIRIT_DATA[result.dominantType].advice.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 p-5 bg-green-50/50 rounded-2xl border border-green-100 group hover:bg-green-100/50 transition-colors">
                    <span className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-green-900 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sprout-card p-10 rounded-[2rem] shadow-xl space-y-8 bg-white/80">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-green-950 flex items-center gap-3">
                  <Send size={24} className="text-green-600" />
                  種下你的願望
                </h4>
                <p className="text-green-800/60 font-medium">在種子中注入你的新年渴望，世界樹將為你指引明路。</p>
              </div>
              
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="例如：我希望今年能更有勇氣去嘗試那些一直不敢做的事..."
                className="w-full h-40 p-6 rounded-3xl border-2 border-green-50 focus:border-green-400 focus:outline-none bg-white text-green-950 transition-all resize-none text-lg shadow-inner placeholder:text-green-200"
              />
              
              <div className="flex gap-4">
                <button
                  onClick={resetApp}
                  className="px-8 py-5 rounded-3xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-all flex items-center gap-2"
                >
                  <RefreshCcw size={24} /> 重測
                </button>
                <button
                  onClick={generateOracle}
                  disabled={!wish.trim()}
                  className="flex-1 py-5 bg-green-700 hover:bg-green-800 disabled:bg-green-200 text-white rounded-3xl text-xl font-black transition-all shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95"
                >
                  獲取新年神諭 <Sparkles size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === AppStage.ORACLE && (
          <div className="sprout-card p-10 md:p-16 rounded-[3rem] shadow-2xl space-y-12 animate-in slide-in-from-top-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-4 border-b border-green-50 pb-10">
              <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center text-green-700 shadow-inner relative">
                {isLoadingOracle ? <Loader2 className="animate-spin" size={48} /> : <Sparkles size={48} />}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              </div>
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-4xl font-black text-green-950">世界樹的啟示</h2>
                <p className="text-sm text-green-600 font-black uppercase tracking-[0.4em] opacity-50">Sacred Sprout Oracle</p>
              </div>
            </div>

            <div className="relative min-h-[400px]">
              {isLoadingOracle ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-green-800/40 space-y-8">
                  <div className="flex gap-6">
                    <Sun className="animate-bounce text-yellow-400" size={32} />
                    <Droplets className="animate-bounce delay-150 text-blue-400" size={32} />
                    <Wind className="animate-bounce delay-300 text-green-400" size={32} />
                  </div>
                  <p className="font-bold animate-pulse tracking-[0.2em] text-lg">正在將森林的低語轉化為文字...</p>
                </div>
              ) : (
                <div className="prose prose-green max-w-none text-green-950 leading-relaxed whitespace-pre-line text-xl font-medium text-center md:text-left">
                  {oracle}
                </div>
              )}
            </div>

            {!isLoadingOracle && (
              <div className="pt-10 flex flex-col sm:flex-row gap-5">
                <button
                  onClick={resetApp}
                  className="flex-1 py-5 bg-green-900 hover:bg-black text-white rounded-[2rem] font-black text-lg shadow-xl transition-all"
                >
                  重返覺醒之始
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-12 py-5 bg-white border-2 border-green-900 text-green-900 hover:bg-green-50 rounded-[2rem] font-black text-lg transition-all"
                >
                  永久收藏神諭
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 mb-8 text-green-900/20 text-[12px] font-black tracking-[0.5em] uppercase">
        © 2025 Sprout Spirits • New Year Awakening
      </footer>
    </div>
  );
};

export default App;
