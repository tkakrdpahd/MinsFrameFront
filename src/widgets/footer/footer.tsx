/**
 * Footer component
 * This is the footer component of the application.
 * It contains the footer content.
 * @returns Footer component
 */
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left Section */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
              <p>This project is licensed under the MIT License.</p>
              <p className="text-xs">
                For more information, please visit{" "}
                <Link 
                  to="https://github.com/tkakrdpahd/MinsFrameFront/tree/remix" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
                >
                  GitHub
                </Link>
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Minseok Doo. All rights reserved.
            </span>
          </div>
          
          {/* Right Section */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
              version: 1.0.0
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
              last updated: 2025-12-20
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}