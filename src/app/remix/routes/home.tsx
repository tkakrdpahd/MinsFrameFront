/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Route } from "./+types/home";
import { MainPage } from "~/pages/main/main";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <MainPage />;
}
