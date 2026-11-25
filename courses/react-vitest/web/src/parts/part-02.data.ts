import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "react-vitest",
  "part": 2,
  "slug": "setup",
  "title": "ติดตั้งและตั้งค่า",
  "language": "th",
  "slideCount": 32
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'install-check': {
    lang: 'bash',
    status: 'verified',
    reason: '',
    code: `pnpm install
pnpm test setup-check`,
  },
  'config-block': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `test: {
  environment: "jsdom",
  globals: false,
  setupFiles: ["./vitest.setup.ts"],
  include: [
    "lessons/**/*.test.{ts,tsx}",
    "setup-check/**/*.test.{ts,tsx}",
  ],
},`,
  },
  'setup-file': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import {
  cleanup,
} from "@testing-library/react";
afterEach(() => {
  cleanup();
});`,
  },
};

const setupSummary = ` Test Files  1 passed (1)
      Tests  2 passed (2)`;

const setupCheck = ` ✓ setup-check/setup.test.tsx > เช็กการติดตั้ง > เห็น hello บนหน้า 9ms
 ✓ setup-check/setup.test.tsx > เช็กการติดตั้ง > test ถัดไป DOM ต้องถูกล้างแล้ว 1ms

 Test Files  1 passed (1)
      Tests  2 passed (2)`;

export const outputs: Record<string, Block> = {
  'install-check': {
    lang: 'text',
    info: 'text',
    text: setupSummary,
  },
  'setup-check': {
    lang: 'text',
    info: 'text',
    text: setupSummary,
  },
  'config-block': {
    lang: 'text',
    info: 'text',
    text: setupSummary,
  },
  'setup-check-verbose': {
    lang: 'text',
    info: 'text',
    text: setupCheck,
  },
  'setup-file': {
    lang: 'text',
    info: 'text',
    text: setupSummary,
  },
};
