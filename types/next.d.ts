// types/next.d.ts
import type { NextConfig } from "next";

declare module "next/config" {
  interface NextConfig {
    env?: {
      [key: string]: string | undefined;
    };
  }
}
