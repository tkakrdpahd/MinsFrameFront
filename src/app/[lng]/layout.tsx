/* eslint-disable */
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ lng: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
    console.log(params);
    return (
        <div className="flex flex-col h-screen">
            <main className="flex flex-grow gap-6">{children}</main>
        </div>
    );
}