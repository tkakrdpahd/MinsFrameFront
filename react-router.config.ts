import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  appDirectory: "src/app/routes",
  future: {
    v8_middleware: true,
  },
} satisfies Config;
