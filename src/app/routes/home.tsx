/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Route } from "./+types/home";
import { Welcome } from "~/pages/welcome/welcome";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
