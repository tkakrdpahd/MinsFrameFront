/**
 * 
 * @returns About page
 */
import { Header } from "../../widgets/header/header";
import { Footer } from "../../widgets/footer/footer";

export function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <h1>About</h1>
            </main>
            <Footer />
        </div>
    );
}