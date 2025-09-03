// types/next-pwa.d.ts
declare module "@ducanh2912/next-pwa" {
  export interface WorkboxOptions {
    disableDevLogs?: boolean;
    [key: string]: unknown;
  }

  export interface PluginOptions {
    dest: string;
    register: boolean;
    disable?: boolean;
    cacheOnFrontEndNav?: boolean;
    aggressiveFrontEndNavCaching?: boolean;
    reloadOnOnline?: boolean;
    swcMinify?: boolean;
    workboxOptions?: WorkboxOptions;
  }

  function withPWA(
    options: PluginOptions
  ): (nextConfig: NextConfig) => NextConfig;
  export default withPWA;
}
