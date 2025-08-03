import { Eye, FileText, HelpCircle, Target } from "lucide-react";

export const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Learn",
    href: "/learn",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Why Us",
    href: "/why-us",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Signup",
    href: "/signup",
  },
];

export const features = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Comprehensive Articles",
    description:
      "In-depth articles covering every topic with clear explanations and examples",
  },
  {
    icon: <HelpCircle className="w-8 h-8" />,
    title: "Interactive Quizzes",
    description:
      "Test your knowledge with carefully crafted quiz questions after each article",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Tricky Interview Questions",
    description:
      "Practice with the most commonly asked and tricky interview questions",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Visual Animations",
    description:
      "Understand complex concepts through interactive visual representations",
  },
];
