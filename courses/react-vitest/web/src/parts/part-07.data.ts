import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  course: 'react-vitest',
  part: 7,
  slug: 'real-app-and-context',
  title: 'แอปจริงและ context',
  language: 'th',
  slideCount: 33,
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'min-app': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "../14-todo-app/TodoApp";

test("เพิ่มงาน", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  await user.type(screen.getByLabelText(
    "งานใหม่"), "ซื้อนม");
  await user.click(screen.getByRole(
    "button", { name: "เพิ่ม" }));
  expect(screen.getByRole(
    "checkbox", { name: "ซื้อนม" }))
    .toBeInTheDocument();
});`,
  },
  'app-flow': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "../14-todo-app/TodoApp";

test("ติ๊กงานแล้วเหลือ 0", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  await user.type(screen.getByLabelText(
    "งานใหม่"), "ซื้อนม");
  await user.click(screen.getByRole(
    "button", { name: "เพิ่ม" }));
  await user.click(screen.getByRole(
    "checkbox", { name: "ซื้อนม" }));
  expect(screen.getByText(/เหลือ 0/)).toBeInTheDocument();
});`,
  },
  'min-provider': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { renderWithTheme } from "./test-utils";
test("กดแล้วเป็น dark", async () => {
  const user = userEvent.setup();
  renderWithTheme(<ThemeToggle />);
  await user.click(screen.getByRole(
    "button", { name: "ธีม: light" }));
  expect(screen.getByRole(
    "button", { name: "ธีม: dark" }))
    .toBeInTheDocument();
});`,
  },
  'provider-initial': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { renderWithTheme } from "./test-utils";
test("เริ่มที่ dark", () => {
  renderWithTheme(
    <ThemeToggle />, "dark");
  expect(screen.getByRole(
    "button", { name: "ธีม: dark" }))
    .toBeInTheDocument();
});`,
  },
  'min-rerender': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `test("rerender เปลี่ยน done", () => {
  const ui = (done: boolean) => (
    <TodoItem
      todo={{ id: 1, text: "ซื้อนม", done }}
      onToggle={() => {}} />);
  const { rerender } = render(ui(false));
  rerender(ui(true));
  expect(screen.getByRole(
    "checkbox", { name: "ซื้อนม" }))
    .toBeChecked();
});`,
  },
};

const onePassed = `Tests  1 passed (1)`;

export const outputs: Record<string, Block> = {
  'min-app': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'app-flow': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-provider': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'provider-initial': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-rerender': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
};
