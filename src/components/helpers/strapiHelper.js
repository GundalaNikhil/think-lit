export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDifficultyColor = (level) => {
  switch (level?.toLowerCase()) {
    case "beginner":
      return {
        gradient: "from-emerald-400 via-green-500 to-teal-600",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
      };
    case "intermediate":
      return {
        gradient: "from-blue-400 via-purple-500 to-indigo-600",
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
      };
    case "advanced":
      return {
        gradient: "from-pink-400 via-red-500 to-orange-600",
        bg: "bg-pink-50",
        text: "text-pink-700",
        border: "border-pink-200",
      };
    default:
      return {
        gradient: "from-violet-400 via-purple-500 to-indigo-600",
        bg: "bg-violet-50",
        text: "text-violet-700",
        border: "border-violet-200",
      };
  }
};
