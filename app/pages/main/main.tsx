/**
 * 
 * @returns Welcome page
 */
import { Header } from "../../widgets/header/header";
import { Footer } from "../../widgets/footer/footer";

export function MainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <span>Welcome to the Mins Frame Frontend</span>
      </main>
      <Footer />
    </div>
  );
}