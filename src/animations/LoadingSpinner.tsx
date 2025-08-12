// const LoadingSpinner = () => (
//   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
//     <div className="flex flex-col items-center gap-6 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
//         <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
//       </div>
//       <div className="text-center">
//         <p className="text-gray-700 font-['Space_Grotesk'] font-semibold text-xl mb-2">
//           Loading amazing content...
//         </p>
//         <div className="flex gap-1">
//           <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
//           <div
//             className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default LoadingSpinner;

"use client";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-purple-400"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
            Loading Content...
          </h3>
          <p className="text-gray-600 font-['Inter']">
            Preparing your learning experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
