import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "./routes/about.tsx"),
    route("api/locales/:lng/:ns", "./routes/locales.ts"),
] satisfies RouteConfig;
