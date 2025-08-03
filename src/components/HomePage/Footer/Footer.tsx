import { Award, BookOpen, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ThinkLIT
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Your comprehensive platform for mastering technology through
              articles, quizzes, interview prep, and visual learning.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                <BookOpen size={20} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                <Users size={20} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                <Award size={20} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Learning</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  DSA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  System Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Machine Learning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Web Development
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 ThinkLIT. All rights reserved. Learn, Practice, Excel.
          </p>
        </div>
      </div>
    </footer>
  );
};
