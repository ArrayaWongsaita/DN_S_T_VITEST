import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  course: 'react-vitest',
  part: 5,
  slug: 'user-interaction',
  title: 'ผู้ใช้กดและพิมพ์',
  language: 'th',
  slideCount: 34,
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'min-click': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../08-click-counter/Counter";

test("กด +1 แล้วเป็น 1", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(
    screen.getByText("+1"));
  expect(
    screen.getByText("Count: 1"),
  ).toBeInTheDocument();
});`,
  },
  'counter-two': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

test("เริ่มต้น Count: 0", () => {
  render(<Counter />);
  expect(
    screen.getByText("Count: 0"),
  ).toBeInTheDocument();
});

test("กดสองครั้ง ได้ 2", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  const plus =
    screen.getByText("+1");
  await user.click(plus);
  await user.click(plus);
  expect(
    screen.getByText("Count: 2"),
  ).toBeInTheDocument();
});

test("รีเซ็ตกลับไปค่า initial", async () => {
  const user = userEvent.setup();
  render(<Counter initial={5} />);
  await user.click(
    screen.getByText("+1"));
  await user.click(
    screen.getByText("รีเซ็ต"));
  expect(
    screen.getByText("Count: 5"),
  ).toBeInTheDocument();
});`,
  },
  'name-clear': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NameForm } from "./NameForm";

test("พิมพ์ Mali แล้วช่องมีค่า", async () => {
  const user = userEvent.setup();
  render(<NameForm />);
  const input =
    screen.getByLabelText("ชื่อ");
  await user.type(input, "Mali");
  expect(input).toHaveValue("Mali");
});

test("พิมพ์ Mali แล้วเห็นคำทักทาย", async () => {
  const user = userEvent.setup();
  render(<NameForm />);
  await user.type(
    screen.getByLabelText("ชื่อ"),
    "Mali");
  expect(
    screen.getByText("สวัสดี Mali"),
  ).toBeInTheDocument();
});

test("ล้างช่อง", async () => {
  const user = userEvent.setup();
  render(<NameForm />);
  const input =
    screen.getByLabelText("ชื่อ");
  await user.type(input, "Mali");
  await user.clear(input);
  expect(screen.getByText(
    "สวัสดี คนแปลกหน้า",
  )).toBeInTheDocument();
});`,
  },
  'confirm-label': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmButton } from "./ConfirmButton";

test("ก่อนกดยังไม่ถูกเรียก", () => {
  const onConfirm = vi.fn();
  render(
    <ConfirmButton label="ตกลง"
      onConfirm={onConfirm} />);
  expect(onConfirm)
    .not.toHaveBeenCalled();
});

test("กดหนึ่งครั้งเรียกหนึ่งครั้ง", async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(
    <ConfirmButton label="ตกลง"
      onConfirm={onConfirm} />);
  await user.click(
    screen.getByText("ตกลง"));
  expect(onConfirm)
    .toHaveBeenCalledTimes(1);
});

test("ถูกเรียกพร้อม label", async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(
    <ConfirmButton label="ตกลง"
      onConfirm={onConfirm} />);
  await user.click(
    screen.getByText("ตกลง"));
  expect(onConfirm)
    .toHaveBeenCalledWith("ตกลง");
});`,
  },
};

const onePassed = `Tests  1 passed (1)`;

const threePassed = `Tests  3 passed (3)`;

export const outputs: Record<string, Block> = {
  'min-click': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'counter-two': {
    lang: 'text',
    info: 'text',
    text: threePassed,
  },
  'name-clear': {
    lang: 'text',
    info: 'text',
    text: threePassed,
  },
  'confirm-label': {
    lang: 'text',
    info: 'text',
    text: threePassed,
  },
};
