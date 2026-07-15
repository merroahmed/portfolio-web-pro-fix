import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// التأكد إذا كان البناء يتم على خوادم Vercel
const isVercel = !!process.env.VERCEL;

export default defineConfig({
  // إجبار Nitro على إخراج الفولدر المتوافق مع Vercel عند الرفع هناك
  nitro: isVercel
    ? {
        preset: "vercel",
      }
    : true,
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});