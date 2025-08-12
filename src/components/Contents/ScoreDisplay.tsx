"use client";
import { RotateCcw, Trophy, Star, Target } from "lucide-react";

interface QuizScore {
  correct: number;
  total: number;
}

interface ScoreDisplayProps {
  quizScore: QuizScore;
  onReset: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ quizScore, onReset }) => {
  const percentage = Math.round((quizScore.correct / quizScore.total) * 100);
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  const isPassing = percentage >= 60;

  const getScoreMessage = () => {
    if (isExcellent) return "🎉 Outstanding Performance!";
    if (isGood) return "🌟 Great Job!";
    if (isPassing) return "✅ Good Work!";
    return "💪 Keep Learning!";
  };

  const getScoreColor = () => {
    if (isExcellent) return "from-green-400 to-emerald-500";
    if (isGood) return "from-blue-400 to-cyan-500";
    if (isPassing) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  return (
    <div className="mb-12 p-8 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 rounded-3xl border-2 border-orange-300 text-center shadow-2xl animate-fadeInUp hover:scale-[1.02] transition-transform duration-500">
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="relative">
          <Trophy className="text-orange-600 animate-bounce" size={48} />
          {isExcellent && (
            <Star
              className="absolute -top-2 -right-2 text-yellow-500 animate-pulse"
              size={24}
            />
          )}
        </div>
        <div>
          <p className="text-5xl font-black font-['Space_Grotesk'] text-gray-900 mb-2">
            {quizScore.correct}/{quizScore.total}
          </p>
          <p className="text-2xl font-['Inter'] font-semibold text-gray-600 mb-2">
            {percentage}% Score
          </p>
          <p
            className={`text-lg font-['Inter'] font-bold ${
              isExcellent
                ? "text-green-700"
                : isGood
                ? "text-blue-700"
                : isPassing
                ? "text-orange-700"
                : "text-red-700"
            }`}
          >
            {getScoreMessage()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 mx-auto max-w-md">
        <div
          className={`bg-gradient-to-r ${getScoreColor()} h-4 rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center gap-2 justify-center mb-2">
            <Target size={20} className="text-green-600" />
            <span className="font-['Space_Grotesk'] font-bold text-green-700">
              Correct
            </span>
          </div>
          <p className="text-2xl font-black text-green-700">
            {quizScore.correct}
          </p>
        </div>
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center gap-2 justify-center mb-2">
            <Target size={20} className="text-red-600" />
            <span className="font-['Space_Grotesk'] font-bold text-red-700">
              Incorrect
            </span>
          </div>
          <p className="text-2xl font-black text-red-700">
            {quizScore.total - quizScore.correct}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-['Space_Grotesk'] font-black text-lg transform hover:scale-110 shadow-xl flex items-center gap-3"
        >
          <RotateCcw size={20} />
          Try Again 🔄
        </button>

        {isExcellent && (
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-['Space_Grotesk'] font-black text-lg transform hover:scale-110 shadow-xl">
            🎯 Next Challenge
          </button>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;
