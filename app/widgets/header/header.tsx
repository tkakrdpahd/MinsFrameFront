/**
 * 
 * @returns Header
 */

import { Link } from "react-router";

export function Header() {
    return (
        <header className="flex items-center justify-between">
            <Link to="/">
                <span>Header</span>
            </Link>
            <nav className="flex items-center justify-center">
                <ul className="flex items-center justify-center gap-4">
                    <li className="flex items-center justify-center">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}