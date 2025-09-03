// types/next.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextConfig } from "next";

declare module "next/config" {
  interface NextConfig {
    env?: {
      [key: string]: string | undefined;
    };
  }
}
