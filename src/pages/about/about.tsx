/**
 * About page
 * 
 * This is the about page of the application.
 * It contains the header, main content, and footer.
 */

import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Header } from "~/widgets/header/header";
import { Footer } from "~/widgets/footer/footer";

import { Pointer } from "~/features/pointer/pointer";

export function AboutPage() {
  const { t, i18n } = useTranslation("translation");
  const resolvedLanguage = i18n.resolvedLanguage;

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <Pointer />
            </div>

            <main className="flex flex-col flex-1 items-center justify-center pt-16 pb-4 gap-4 relative z-10">
                <div className="flex flex-col items-center gap-4 min-h-0">
                    <p>{t("title")}</p>
                    <p>{t("description")}</p>

                    {resolvedLanguage == "en"
                      ? <Link to="/?lng=es" className="hover:underline">Español</Link>
                      : <Link to="/?lng=en" className="hover:underline">English</Link>
                    }
                </div>
            </main>
            
            <Footer />
        </div>
    );
}