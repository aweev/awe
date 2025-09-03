// types/bundle-analyzer.d.ts
declare module "webpack-bundle-analyzer" {
  export class BundleAnalyzerPlugin {
    constructor(options?: {
      analyzerMode?: string;
      analyzerPort?: number;
      openAnalyzer?: boolean;
      [key: string]: unknown;
    });
  }
}
