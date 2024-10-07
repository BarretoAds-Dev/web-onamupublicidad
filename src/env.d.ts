/// <reference path="../.astro/types.d.ts" />
import type { Runtime as CloudflareRuntime } from "@astrojs/cloudflare";

interface Env {
  // Define your environment-specific variables here, e.g.
  // MY_API_KEY: string;
}

declare namespace App {
  interface Locals extends CloudflareRuntime<Env> {}
}