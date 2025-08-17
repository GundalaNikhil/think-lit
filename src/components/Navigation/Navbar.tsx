"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  BookOpen,
  Code,
  Database,
  Layers,
  Brain,
  Monitor,
  Server,
  Users,
  Search,
} from "lucide-react";

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  searchQuery = "",
  onSearchChange,
  showSearch = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Topics", href: "/topics", icon: BookOpen },
    { name: "DSA", href: "/dsa", icon: Code },
    { name: "System Design", href: "/system-design", icon: Layers },
    { name: "Frontend", href: "/frontend", icon: Monitor },
    { name: "Backend", href: "/backend", icon: Server },
    { name: "Database", href: "/database", icon: Database },
    { name: "Interview Prep", href: "/interview", icon: Users },
  ];

  return (
    <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Brain size={24} className="text-orange-400" />
            <span className="text-xl font-space-grotesk font-bold text-white">
              ThinkLit
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 rounded border border-gray-600/50 bg-gray-700/30 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-200 font-inter focus:outline-none text-sm"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700/50 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 py-4">
            {/* Mobile Search */}
            {showSearch && (
              <div className="px-3 pb-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded border border-gray-600/50 bg-gray-700/30 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-200 font-inter focus:outline-none text-sm"
                  />
                </div>
              </div>
            )}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
