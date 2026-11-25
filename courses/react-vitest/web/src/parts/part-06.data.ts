import type { Block, Listing, PartMeta } from '../components/types';

export const meta: PartMeta = {
  course: 'react-vitest',
  part: 6,
  slug: 'async-and-mock-fetch',
  title: 'รอข้อมูลและปลอม fetch',
  language: 'th',
  slideCount: 35,
};

// Code the slides show, with its real output: name -> listing, name -> output.
export const listings: Record<string, Listing> = {
  'min-async': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserCard } from "../11-loading-then-data/UserCard";

test("เห็น Mali", async () => {
  render(<UserCard
    loadUser={async () => ({
      name: "Mali" })} />);
  expect(await screen.findByText(
    "Mali")).toBeInTheDocument();
});`,
  },
  'min-wait': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { UserCard } from "../11-loading-then-data/UserCard";

test("โหลดหายไป", async () => {
  render(<UserCard
    loadUser={async () => ({
      name: "Mali" })} />);
  await waitFor(() =>
    expect(screen.queryByText(
      /โหลด/),
    ).not.toBeInTheDocument());
});`,
  },
  'min-fetch': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostList } from "../12-mock-fetch/PostList";

afterEach(() => {
  vi.restoreAllMocks();
});

test("เห็นโพสต์", async () => {
  const data =
    [{ id: 1, title: "โพสต์แรก" }];
  vi.spyOn(globalThis, "fetch")
    .mockResolvedValue({
      json: async () => data,
    } as Response);
  render(<PostList />);
  expect(await screen.findByText(
    "โพสต์แรก")).toBeInTheDocument();
});`,
  },
  'min-called': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostList } from "../12-mock-fetch/PostList";

afterEach(() => {
  vi.restoreAllMocks();
});

test("เรียก fetch ที่ URL", async () => {
  const spy = vi.spyOn(
    globalThis, "fetch",
  ).mockResolvedValue({
    json: async () => [],
  } as Response);
  render(<PostList />);
  expect(spy).toHaveBeenCalledWith(
    "/api/posts",
  );
});`,
  },
  'min-error': {
    lang: 'typescript',
    status: 'verified',
    reason: '',
    code: `import { test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SafePostList } from "../13-error-empty-states/SafePostList";

afterEach(() => {
  vi.restoreAllMocks();
});

test("fetch พัง", async () => {
  vi.spyOn(globalThis, "fetch")
    .mockRejectedValue(
      new Error("network"));
  render(<SafePostList />);
  expect(await screen.findByRole(
    "alert")).toHaveTextContent(
    "โหลดไม่สำเร็จ");
});`,
  },
};

const onePassed = `Tests  1 passed (1)`;

export const outputs: Record<string, Block> = {
  'min-async': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-wait': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-fetch': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-called': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
  'min-error': {
    lang: 'text',
    info: 'text',
    text: onePassed,
  },
};
