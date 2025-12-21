/**
 * Header component
 * This is the header component of the application.
 * It contains the header content.
 * 
 * @returns Header component
 */

import { Link } from "react-router";
import { Navigation } from "./ui";

export function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-6">
        <span className="text-sm">
          <Link to="/">Header</Link>
        </span>
        <Navigation />
      </div>
    </header>
  );
}