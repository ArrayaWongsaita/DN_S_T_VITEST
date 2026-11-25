import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  "course": "react-vitest",
  "part": 4,
  "slug": "conditional-and-lists",
  "title": "เงื่อนไข ลิสต์ และฟอร์ม",
  "language": "th",
  "slideCount": 34
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'alert-true': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

test("เห็น alert เมื่อ visible", () => {
  render(<Alert
    message="บันทึกแล้ว" visible />);
  const alert =
    screen.getByRole("alert");
  expect(alert)
    .toBeInTheDocument();
});

test("ไม่เห็น alert", () => {
  render(<Alert
    message="บันทึกแล้ว"
    visible={false} />);
  expect(
    screen.queryByRole("alert"),
  ).not.toBeInTheDocument();
});`,
  },
  'alert-false': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

test("เห็น alert เมื่อ visible", () => {
  render(<Alert
    message="บันทึกแล้ว" visible />);
  const alert =
    screen.getByRole("alert");
  expect(alert)
    .toBeInTheDocument();
});

test("ไม่เห็น alert", () => {
  render(<Alert
    message="บันทึกแล้ว"
    visible={false} />);
  expect(
    screen.queryByRole("alert"),
  ).not.toBeInTheDocument();
});`,
  },
  'fruit-test': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { FruitList } from "./FruitList";

test("มี 3 ผลไม้", () => {
  render(<FruitList items={[
    "ส้ม", "กล้วย", "มะม่วง",
  ]} />);
  expect(screen.getAllByRole(
    "listitem",
  )).toHaveLength(3);
});

test("array ว่างต้องแสดงข้อความ ไม่มีรายการ", () => {
  render(<FruitList items={[]} />);
  expect(
    screen.getByText("ไม่มีรายการ"),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("list"),
  ).not.toBeInTheDocument();
});`,
  },
  'signup-test': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignupFields } from "./SignupFields";

test("ช่องอีเมลต้องแสดงค่าที่ส่งเข้าไป", () => {
  render(<SignupFields
    email="mali@example.com"
    agreed={false} />);
  expect(
    screen.getByLabelText("อีเมล"),
  ).toHaveValue("mali@example.com");
});

test("checkbox ต้องสะท้อนค่า agreed", () => {
  render(<SignupFields email="" agreed />);
  expect(screen.getByRole(
    "checkbox", { name: "ยอมรับเงื่อนไข" },
  )).toBeChecked();
});

test("ปุ่มปิดเมื่อยังไม่ยอมรับ", () => {
  render(<SignupFields
    email="" agreed={false} />);
  expect(screen.getByRole(
    "button", { name: "สมัคร" },
  )).toBeDisabled();
});

test("ปุ่มเปิดเมื่อยอมรับแล้ว", () => {
  render(<SignupFields email="" agreed />);
  expect(screen.getByRole(
    "button", { name: "สมัคร" },
  )).toBeEnabled();
});`,
  },
};

const twoPassed = ` Test Files  1 passed (1)
      Tests  2 passed (2)`;

const fourPassed = ` Test Files  1 passed (1)
      Tests  4 passed (4)`;

export const outputs: Record<string, Block> = {
  'alert-true': {
    lang: 'text',
    info: 'text',
    text: twoPassed,
  },
  'alert-false': {
    lang: 'text',
    info: 'text',
    text: twoPassed,
  },
  'fruit-test': {
    lang: 'text',
    info: 'text',
    text: twoPassed,
  },
  'signup-test': {
    lang: 'text',
    info: 'text',
    text: fourPassed,
  },
};
