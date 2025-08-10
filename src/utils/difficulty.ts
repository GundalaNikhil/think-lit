export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export interface DifficultyConfig {
  label: string;
  color: string;
  gradient: string;
  bgColor: string;
  textColor: string;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  beginner: {
    label: "Beginner",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  intermediate: {
    label: "Intermediate",
    color: "yellow",
    gradient: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  advanced: {
    label: "Advanced",
    color: "red",
    gradient: "from-red-500 to-pink-500",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  expert: {
    label: "Expert",
    color: "purple",
    gradient: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
};

export const getDifficultyConfig = (level: string): DifficultyConfig => {
  const normalizedLevel = level?.toLowerCase() as DifficultyLevel;
  return DIFFICULTY_CONFIGS[normalizedLevel] || DIFFICULTY_CONFIGS.beginner;
};

export const getDifficultyColor = (level: string): string => {
  return getDifficultyConfig(level).gradient;
};

export const getDifficultyLabel = (level: string): string => {
  return getDifficultyConfig(level).label;
};
