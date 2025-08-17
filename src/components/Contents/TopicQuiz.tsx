"use client";
import { Target } from "lucide-react";
import Quiz from "./Quiz";
import ScoreDisplay from "./ScoreDisplay";

interface QuizComponent {
  id: string;
  question?: string;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
}

interface TopicQuizProps {
  getComponentsByType: (type: string) => QuizComponent[];
  selectedAnswers: Record<string, string>;
  showResults: Record<string, boolean>;
  quizScore: {
    correct: number;
    total: number;
    attempted: boolean;
  };
  onAnswerSelect: (quizId: string, answer: string) => void;
  onQuizSubmit: (quizId: string, correctAnswer: string) => void;
  onResetQuiz: () => void;
}

const TopicQuiz: React.FC<TopicQuizProps> = ({
  getComponentsByType,
  selectedAnswers,
  showResults,
  quizScore,
  onAnswerSelect,
  onQuizSubmit,
  onResetQuiz,
}) => {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target size={24} className="text-gray-700" />
          <h2 className="text-2xl font-space-grotesk font-bold text-gray-900">
            Knowledge Challenge
          </h2>
        </div>
        <p className="text-xl text-gray-600 font-['Inter'] max-w-3xl mx-auto">
          Test your understanding with interactive quizzes and track your
          progress!
        </p>
      </div>

      {/* Quiz Score Display */}
      {quizScore.attempted && (
        <ScoreDisplay quizScore={quizScore} onReset={onResetQuiz} />
      )}

      {/* Progress Bar */}
      <div className="mb-12 bg-white/90 rounded-3xl p-8 shadow-xl border border-gray-200 animate-fadeInUp">
        <h4 className="text-2xl font-bold font-['Space_Grotesk'] text-gray-900 mb-4 text-center">
          Quiz Progress
        </h4>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${
                (Object.keys(showResults).length /
                  Math.max(getComponentsByType("shared.quiz").length, 1)) *
                100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-center mt-4 font-['Inter'] text-gray-600">
          {Object.keys(showResults).length} of{" "}
          {getComponentsByType("shared.quiz").length} questions completed
        </p>
      </div>

      {/* Quiz Questions */}
      {getComponentsByType("shared.quiz").map(
        (quiz) =>
          quiz.question &&
          quiz.options &&
          quiz.correct_answer && (
            <Quiz
              key={quiz.id}
              quiz={{
                id: quiz.id,
                question: quiz.question,
                options: quiz.options,
                correct_answer: quiz.correct_answer,
                explanation: quiz.explanation,
              }}
              selectedAnswer={selectedAnswers[quiz.id]}
              showResult={showResults[quiz.id]}
              onAnswerSelect={(answer) => onAnswerSelect(quiz.id, answer)}
              onSubmit={() => onQuizSubmit(quiz.id, quiz.correct_answer!)}
            />
          )
      )}

      {/* Motivational Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-12 border border-yellow-200 animate-fadeInUp">
        <div className="text-6xl mb-6">🎯</div>
        <h4 className="text-3xl font-black font-['Space_Grotesk'] text-gray-900 mb-4">
          Keep Learning!
        </h4>
        <p className="text-xl font-['Inter'] text-gray-700">
          Every question you answer brings you closer to mastery. Keep pushing
          forward!
        </p>
      </div>
    </div>
  );
};

export default TopicQuiz;
