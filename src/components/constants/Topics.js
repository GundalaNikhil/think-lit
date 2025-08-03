import { Brain, Code, Database, Globe, Layers, Sparkles } from "lucide-react";

export const topics = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description:
      "Master the fundamentals of computer science with comprehensive DSA content",
    icon: <Code className="w-8 h-8" />,
    articleCount: 45,
    color: "from-blue-500 to-blue-600",
    features: [
      "Articles",
      "Quiz Questions",
      "Interview Questions",
      "Visual Animations",
    ],
  },
  {
    id: "hld",
    title: "High Level Design",
    description:
      "Learn system architecture and design patterns for scalable applications",
    icon: <Layers className="w-8 h-8" />,
    articleCount: 32,
    color: "from-purple-500 to-purple-600",
    features: [
      "Design Patterns",
      "System Architecture",
      "Case Studies",
      "Interactive Diagrams",
    ],
  },
  {
    id: "lld",
    title: "Low Level Design",
    description:
      "Deep dive into object-oriented design and implementation details",
    icon: <Database className="w-8 h-8" />,
    articleCount: 28,
    color: "from-green-500 to-green-600",
    features: [
      "OOP Concepts",
      "Design Principles",
      "Code Examples",
      "UML Diagrams",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    description: "Explore AI and ML concepts with practical implementations",
    icon: <Brain className="w-8 h-8" />,
    articleCount: 38,
    color: "from-orange-500 to-orange-600",
    features: [
      "Algorithms",
      "Mathematical Concepts",
      "Practical Examples",
      "Visualizations",
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Modern web technologies and development best practices",
    icon: <Globe className="w-8 h-8" />,
    articleCount: 52,
    color: "from-cyan-500 to-cyan-600",
    features: [
      "Frontend & Backend",
      "Frameworks",
      "Best Practices",
      "Live Examples",
    ],
  },
  {
    id: "more",
    title: "More Topics Coming Soon",
    description: "We're constantly adding new topics and content",
    icon: <Sparkles className="w-8 h-8" />,
    articleCount: "∞",
    color: "from-pink-500 to-pink-600",
    features: ["Database Design", "DevOps", "Cloud Computing", "Security"],
  },
];
