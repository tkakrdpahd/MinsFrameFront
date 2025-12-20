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
    <header className="flex justify-between items-center px-4 py-6">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2">
        <span className="text-sm">
          <Link to="/">Header</Link>
        </span>
        <Navigation />
      </div>
    </header>
  );
}