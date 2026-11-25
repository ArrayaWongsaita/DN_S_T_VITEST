import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  course: 'react-vitest',
  part: 8,
  slug: 'forms-and-next',
  title: 'ฟอร์มและ Next.js',
  language: 'th',
  slideCount: 30,
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'min-form': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../16-form-validation/LoginForm";

test("กรอกถูกแล้วส่งได้", async () => {
  const user = userEvent.setup();
  const send = vi.fn();
  render(<LoginForm onSubmit={send} />);
  await user.type(screen.getByLabelText("อีเมล"), "a@b.co");
  await user.type(screen.getByLabelText("รหัสผ่าน"), "12345678");
  await user.click(screen.getByRole("button", { name: "เข้าสู่ระบบ" }));
  expect(send).toHaveBeenCalledWith({ email: "a@b.co", password: "12345678" });
});`,
  },
  'form-error': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../16-form-validation/LoginForm";

test("อีเมลผิด เห็น alert", async () => {
  const user = userEvent.setup();
  const send = vi.fn();
  render(<LoginForm onSubmit={send} />);
  await user.type(screen.getByLabelText("อีเมล"), "abc");
  await user.type(screen.getByLabelText("รหัสผ่าน"), "12345678");
  await user.click(screen.getByRole("button", { name: "เข้าสู่ระบบ" }));
  expect(screen.getByRole("alert")).toHaveTextContent("กรุณากรอกอีเมลให้ถูกต้อง");
  expect(send).not.toHaveBeenCalled();
});`,
  },
  'min-nav': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackButton } from "../17-next-navigation/BackButton";

const { back } = vi.hoisted(() => ({ back: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));
test("กดย้อนกลับ เรียก back", async () => {
  const user = userEvent.setup();
  render(<BackButton />);
  await user.click(screen.getByRole("button", { name: "ย้อนกลับ" }));
  expect(back).toHaveBeenCalledTimes(1);
});`,
  },
  'save-go': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SaveAndGo } from "../17-next-navigation/SaveAndGo";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));
test("กดบันทึก พาไป /done", async () => {
  const user = userEvent.setup();
  render(<SaveAndGo />);
  await user.click(screen.getByRole("button", { name: "บันทึก" }));
  expect(push).toHaveBeenCalledWith("/done");
});`,
  },
};

const onePassed = `Tests  1 passed (1)`;

export const outputs: Record<string, Block> = {
  'min-form': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'form-error': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-nav': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'save-go': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
};
