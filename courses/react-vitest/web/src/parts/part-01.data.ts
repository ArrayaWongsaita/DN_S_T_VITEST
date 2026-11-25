import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "react-vitest",
  "part": 1,
  "slug": "what-is-vitest",
  "title": "Vitest คืออะไร",
  "language": "th",
  "slideCount": 26
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'hello-test': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";
test("Hello ต้องแสดงข้อความ Hello, React!", () => {
  render(<Hello />);
  expect(screen.getByText("Hello, React!")).toBeInTheDocument();
});`,
  },
  'greeting-test': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";
test("ทักทาย Mali และมีปุ่มทักทาย", () => {
  render(<Greeting name="Mali" />);
  expect(screen.getByRole("heading", { name: "สวัสดี Mali" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ทักทาย" })).toBeInTheDocument();
});`,
  },
};

export const outputs: Record<string, Block> = {
  'hello-test': {
    lang: 'text',
    info: 'text',
    text: ` ✓ lessons/01-first-render/Hello.test.tsx > Hello ต้องแสดงข้อความ Hello, React! 9ms

 Test Files  1 passed (1)
      Tests  1 passed (1)`,
  },
  'hello-run': {
    lang: 'text',
    info: 'text',
    text: ` ✓ lessons/01-first-render/Hello.test.tsx > Hello ต้องแสดงข้อความ Hello, React! 9ms

 Test Files  1 passed (1)
      Tests  1 passed (1)`,
  },
  'greeting-test': {
    lang: 'text',
    info: 'text',
    text: ` ✓ lessons/02-get-by-role/Greeting.test.tsx > ทักทาย Mali และมีปุ่มทักทาย 29ms

 Test Files  1 passed (1)
      Tests  1 passed (1)`,
  },
};
