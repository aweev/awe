// types/next-intl.d.ts
declare module "next-intl/plugin" {
  import type { NextConfig } from "next";

  function createNextIntlPlugin(
    configPath?: string
  ): (config: NextConfig) => NextConfig;
  export default createNextIntlPlugin;
}
