/**
 * Footer component
 * This is the footer component of the application.
 * It contains the footer content.
 * @returns Footer component
 */

export function Footer() {
  return (
    <footer className="flex justify-between items-end">
        <span className="text-sm text-gray-500">© All rights reserved by Minseok Doo {new Date().getFullYear()}</span>
        <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">version: 1.0.0</span>
            <span className="text-sm text-gray-500">last updated: 2025-12-20</span>
        </div>
    </footer>
  );
}