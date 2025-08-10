"use client";
import { CheckCircle } from "lucide-react";
import React from "react";

interface QuizData {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

const Quiz = ({
  quiz,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  onSubmit,
}: {
  quiz: QuizData;
  selectedAnswer: string;
  showResult: boolean;
  onAnswerSelect: (answer: string) => void;
  onSubmit: () => void;
}) => {
  const isCorrect = selectedAnswer === quiz.correct_answer;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CheckCircle size={20} className="text-blue-600" />
        Quick Quiz
      </h3>

      <p className="text-gray-800 mb-4 font-medium">{quiz.question}</p>

      <div className="space-y-2 mb-4">
        {quiz.options?.map((option: string, index: number) => (
          <label
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              selectedAnswer === option
                ? showResult
                  ? option === quiz.correct_answer
                    ? "bg-green-100 border-green-300"
                    : "bg-red-100 border-red-300"
                  : "bg-blue-100 border-blue-300"
                : "bg-white border-gray-200 hover:bg-gray-50"
            } border`}
          >
            <input
              type="radio"
              name={`quiz-${quiz.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => onAnswerSelect(e.target.value)}
              className="text-blue-600"
              disabled={showResult}
            />
            <span className="text-gray-800">{option}</span>
          </label>
        ))}
      </div>

      {!showResult && selectedAnswer && (
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answer
        </button>
      )}

      {showResult && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            isCorrect ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p
            className={`font-medium ${
              isCorrect ? "text-green-800" : "text-red-800"
            }`}
          >
            {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
          </p>
          {quiz.explanation && (
            <p className="text-gray-700 mt-2">{quiz.explanation}</p>
          )}
          {!isCorrect && (
            <p className="text-gray-700 mt-2">
              Correct answer: <strong>{quiz.correct_answer}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
