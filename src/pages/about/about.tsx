/**
 * About page
 * 
 * This is the about page of the application.
 * It contains the header, main content, and footer.
 */

import { Link } from "react-router";

import { Header } from "~/widgets/header/header";
import { Footer } from "~/widgets/footer/footer";

import { Pointer } from "~/features/pointer/pointer";

function Links() {
    return (
        <div className="flex flex-col items-center gap-4">
            <span className="text-lg font-bold">Links</span>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <Link to="https://github.com/tkakrdpahd" target="_blank" className="hover:underline">GitHub</Link>
                <Link to="https://mdoo_pri.artstation.com" target="_blank" className="hover:underline">Artstation</Link>
                <Link to="https://mdoo12.itch.io" target="_blank" className="hover:underline">itch.io</Link>
                <Link to="https://scholar.google.com/citations?user=rfBJT_cAAAAJ&hl=en" target="_blank" className="hover:underline">Google Scholar</Link>
            </div>
        </div>
    );
}

export function AboutPage() {

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />

            <div className="fixed inset-0 z-20 pointer-events-none">
                <Pointer />
            </div>

            <main className="flex flex-col flex-1 pt-16 pb-4 gap-4 relative z-10">
                <div className="flex flex-col items-center gap-4">
                    <Links />
                </div>
            </main>
            
            <Footer />
        </div>
    );
}