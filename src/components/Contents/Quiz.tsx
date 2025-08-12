"use client";
import { CheckCircle, RotateCcw } from "lucide-react";

interface QuizData {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

interface QuizProps {
  quiz: QuizData;
  selectedAnswer: string;
  showResult: boolean;
  onAnswerSelect: (answer: string) => void;
  onSubmit: () => void;
}

const Quiz: React.FC<QuizProps> = ({
  quiz,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  onSubmit,
}) => {
  const isCorrect = selectedAnswer === quiz.correct_answer;

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 border-2 border-emerald-200 rounded-3xl p-10 shadow-2xl mb-12 hover:shadow-3xl transition-all duration-500 animate-fadeInUp hover:scale-[1.01]">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-lg">
          <CheckCircle size={28} />
          <h3 className="text-2xl font-black font-['Space_Grotesk']">
            Quick Quiz Challenge
          </h3>
        </div>
      </div>

      <p className="text-gray-800 mb-8 font-semibold text-xl text-center font-['Inter'] bg-white/50 p-6 rounded-2xl border border-white/60">
        {quiz.question}
      </p>

      <div className="grid gap-4 mb-8">
        {quiz.options?.map((option, index) => (
          <label
            key={index}
            className={`flex items-center gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] group ${
              selectedAnswer === option
                ? showResult
                  ? option === quiz.correct_answer
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-2xl scale-[1.02]"
                    : "bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-2xl scale-[1.02]"
                  : "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-2xl scale-[1.02]"
                : "bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:shadow-xl"
            }`}
          >
            <input
              type="radio"
              name={`quiz-${quiz.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => onAnswerSelect(e.target.value)}
              className="scale-150 text-cyan-600"
              disabled={showResult}
            />
            <span className="font-['Inter'] font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
              {option}
            </span>
          </label>
        ))}
      </div>

      {!showResult && selectedAnswer && (
        <div className="text-center">
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white px-12 py-4 rounded-2xl hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 transition-all duration-500 font-['Space_Grotesk'] font-black text-xl transform hover:scale-110 shadow-2xl hover:shadow-3xl animate-pulse"
          >
            Submit Answer 🚀
          </button>
        </div>
      )}

      {showResult && (
        <div
          className={`mt-8 p-8 rounded-2xl shadow-2xl animate-fadeInUp ${
            isCorrect
              ? "bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300"
              : "bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300"
          }`}
        >
          <div className="text-center mb-6">
            <p
              className={`font-black text-3xl mb-4 font-['Space_Grotesk'] ${
                isCorrect ? "text-green-800" : "text-red-800"
              }`}
            >
              {isCorrect ? "🎉 Absolutely Correct!" : "😅 Not quite there!"}
            </p>
          </div>

          {quiz.explanation && (
            <p className="text-gray-700 mb-4 font-['Inter'] text-lg text-center bg-white/60 p-4 rounded-xl">
              💡 {quiz.explanation}
            </p>
          )}

          {!isCorrect && (
            <div className="text-center mb-6">
              <p className="text-gray-700 font-['Inter'] text-lg mb-4">
                Correct answer:{" "}
                <strong className="text-green-700 text-xl">
                  {quiz.correct_answer}
                </strong>
              </p>
            </div>
          )}

          <div className="text-center">
            <p className="text-gray-600 font-['Inter'] text-sm mb-4">
              {isCorrect
                ? "Great job! You've mastered this concept!"
                : "Don't worry, learning is a journey. Keep practicing!"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
