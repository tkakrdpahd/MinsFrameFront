/**
 * Navigation component
 * This is the navigation component of the application.
 * It contains the navigation content.
 * 
 * @returns Navigation component
 */

import { Link } from "react-router";

export function Navigation() {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
}