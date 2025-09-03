// types/webpack.d.ts
declare module "webpack" {
  export interface WebpackRule {
    test?: RegExp;
    use?:
      | string
      | string[]
      | Array<{ loader: string; options?: Record<string, unknown> }>;
    [key: string]: unknown;
  }

  export interface WebpackResolve {
    fallback?: {
      [key: string]: false | string;
    };
    [key: string]: unknown;
  }

  export interface WebpackModule {
    rules?: WebpackRule[];
    [key: string]: unknown;
  }

  export interface Configuration {
    plugins?: unknown[];
    module?: WebpackModule;
    resolve?: WebpackResolve;
    [key: string]: unknown;
  }

  export interface WebpackConfigContext {
    buildId: string;
    dev: boolean;
    isServer: boolean;
    defaultLoaders: {
      babel: {
        loader: string;
        options: Record<string, unknown>;
      };
    };
    webpack: typeof webpack;
  }

  function webpack(...args: unknown[]): unknown;
  export { webpack };
}
