import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "react-vitest",
  "part": 3,
  "slug": "render-and-query",
  "title": "render และ query",
  "language": "th",
  "slideCount": 30
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
test("hello ด้วย regex", () => {
  render(<Hello />);
  expect(
    screen.getByText(/hello/i),
  ).toBeInTheDocument();
});`,
  },
  'greeting-test': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";

test("heading เปลี่ยนตาม Som", () => {
  render(<Greeting name="Som" />);
  const h = screen.getByRole(
    "heading", { name: "สวัสดี Som" },
  );
  expect(h).toBeInTheDocument();
});`,
  },
  'badge-test': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

test("ป้ายใหม่มี class info", () => {
  render(<Badge
    label="ใหม่" href="/doc" />);
  const b = screen.getByText("ใหม่");
  expect(b).toHaveTextContent("ใหม่");
  expect(b)
    .toHaveAttribute("href", "/doc");
  expect(b)
    .toHaveClass("badge-info");
});`,
  },
};

const onePassed = ` Test Files  1 passed (1)
      Tests  1 passed (1)`;

export const outputs: Record<string, Block> = {
  'hello-test': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'greeting-test': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'badge-test': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
};
