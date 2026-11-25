import {
  A,
  C,
  Cover,
  Deck,
  Error,
  Example,
  Explain,
  Focus,
  Objectives,
  P,
  Sources,
  Summary,
  Topic,
} from '../components';
import { AppUnderTest, ProviderFrame, SameMount, TestDesk } from '../visuals/part-07';
import { listings, meta, outputs } from './part-07.data';

export default function Part07() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="7-001"
        section="Opening"
        title={<>แอปจริงและ context</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 7</P>
            <P>จาก TodoApp ถึง custom render</P>
          </>
        }
      />
      <Objectives
        id="7-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>เทส <C>TodoApp</C> ทั้งแอปจากมุมผู้ใช้</>,
          <>ห่อ provider ด้วย <C>renderWithTheme</C></>,
          <>เปลี่ยน props ด้วย <C>rerender</C></>,
          <>จัด test ด้วย <C>describe</C>, <C>test.each</C>, <C>beforeEach</C></>,
        ]}
      />
      <Focus
        id="7-003"
        section="Opening"
        title={<>ผู้ใช้เห็นหน้าเดียว แต่โค้ดมีหลาย component</>}
        body={<>Part 1-6 เทส component เดียว ตอนนี้ประกอบเป็นแอปจริง — test เดินทั้งหน้า</>}
        visual={<AppUnderTest state="hook" />}
      />

      <Topic
        id="7-004"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        title={<>เทสทั้งแอป ไม่ใช่ทีละชิ้น</>}
        body={<>หนึ่งหน้า · หลาย component · test เดียว</>}
        visual={<AppUnderTest />}
      />
      <Explain
        id="7-005"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="know"
        title={<>แอปหนึ่งหน้าคือ component หลายชั้น</>}
        body={<><C>TodoApp</C> เก็บ <C>todos</C>; <C>TodoInput</C> ส่งขึ้น, <C>TodoList</C> รับลง, <C>TodoItem</C> ส่ง toggle กลับ — test เปิดทั้งหน้าแล้วทำเหมือนผู้ใช้</>}
        visual={<AppUnderTest state="trace" />}
      />
      <Example
        id="7-006"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="know"
        title={<>test เล็กสุด: เพิ่มงานแล้วเห็น</>}
        body={<><C>getByLabelText</C> หาช่อง, พิมพ์แล้วกด <C>เพิ่ม</C>, <C>getByRole</C> หา checkbox ใหม่</>}
        snippet="min-app"
        lines={[[6, 16]]}
        highlight={[[13, 15]]}
      />
      <Explain
        id="7-007"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="parts"
        title={<>TodoApp: เจ้าของ state และตัวนับ</>}
        body={<><C>todos</C> อยู่ใน <C>TodoApp</C>; <C>add</C> ต่อท้าย, <C>toggle</C> พลิก <C>done</C>, <C>remaining</C> นับงานที่ยังไม่เสร็จ</>}
        visual={<AppUnderTest state="state" />}
      />
      <Explain
        id="7-008"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="parts"
        title={<>TodoInput: ฟอร์มที่ส่งข้อความขึ้น</>}
        body={<>label <C>งานใหม่</C> ผูกกับ input; ปุ่ม <C>เพิ่ม</C> เป็น submit; <C>trim()</C> แล้วข้อความว่างไม่ถูกส่ง</>}
        visual={<AppUnderTest state="input" />}
      />
      <Explain
        id="7-009"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="parts"
        title={<>TodoList/TodoItem: รายการที่ส่ง toggle กลับ</>}
        body={<><C>TodoList</C> map เป็น <C>{'<li>'}</C>; checkbox ใช้ <C>todo.done</C> และส่ง <C>todo.id</C> กลับ; label ทำให้ checkbox มีชื่อ</>}
        visual={<AppUnderTest state="list" />}
      />
      <Example
        id="7-010"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="example"
        title={<>ติ๊กงานแล้วตัวนับเปลี่ยน</>}
        body={<>เพิ่ม <C>ซื้อนม</C> → ติ๊ก checkbox → <C>เหลือ 0 รายการ</C>; ทั้งสายทำงานใน test เดียว</>}
        snippet="app-flow"
        lines={[[6, 16]]}
        highlight={[[13, 15]]}
      />
      <Error
        id="7-011"
        section="เทสทั้งแอป ไม่ใช่ทีละชิ้น"
        phase="watchout"
        title={<>checkbox สองตัว ไม่มีชื่อ</>}
        cause={<><C>{'getByRole("checkbox")'}</C> เจอทั้งสองงาน</>}
        fix={<>ใส่ <C>{'{ name: "ซื้อนม" }'}</C></>}
        symptom={<><C>{'Found multiple elements with the role "checkbox"'}</C></>}
        visual={<AppUnderTest state="miss" />}
      />

      <Topic
        id="7-012"
        section="component ที่ต้องมี provider"
        title={<>component ที่ต้องมี provider</>}
        body={<>wrapper ห่อ context ให้ทุก test</>}
        visual={<ProviderFrame />}
      />
      <Explain
        id="7-013"
        section="component ที่ต้องมี provider"
        phase="know"
        title={<>useTheme ต้องมี provider ครอบ</>}
        body={<><C>ThemeToggle</C> อ่าน <C>{'{ theme, toggle }'}</C> จาก <C>ThemeProvider</C>; ไม่มี provider จะได้ default — ปุ่มดูปกติแต่ <C>toggle</C> ไม่ทำอะไร</>}
        visual={<ProviderFrame state="trace" />}
      />
      <Example
        id="7-014"
        section="component ที่ต้องมี provider"
        phase="know"
        title={<>test เล็กสุด: กดแล้วเป็น dark</>}
        body={<><C>renderWithTheme</C> ห่อ provider ให้; click ปุ่ม light แล้วหาปุ่ม dark</>}
        snippet="min-provider"
        lines={[[2, 10]]}
        highlight={[[5, 6]]}
      />
      <Explain
        id="7-015"
        section="component ที่ต้องมี provider"
        phase="parts"
        title={<>ThemeProvider: แหล่งของค่า theme</>}
        body={<><C>createContext</C> ให้ default <C>{'{ theme: "light", toggle: () => {} }'}</C>; <C>ThemeProvider</C> เก็บ state และส่งค่าลงไป</>}
        visual={<ProviderFrame state="provider" />}
      />
      <Explain
        id="7-016"
        section="component ที่ต้องมี provider"
        phase="parts"
        title={<>wrapper: ให้ render ห่อให้</>}
        body={<><C>{'render(ui, { wrapper })'}</C> เอา component มาครอบ ui; เขียนครั้งเดียวใช้ได้ทุก test</>}
        visual={<ProviderFrame state="wrapper" />}
      />
      <Explain
        id="7-017"
        section="component ที่ต้องมี provider"
        phase="parts"
        title={<>renderWithTheme: render ที่ห่อให้เอง</>}
        body={<><C>{'renderWithTheme(ui, initial = "light")'}</C> เรียก <C>render</C> พร้อม <C>wrapper</C>; ส่ง <C>initial</C> เป็น <C>"dark"</C> ได้</>}
        visual={<ProviderFrame state="custom" />}
      />
      <Example
        id="7-018"
        section="component ที่ต้องมี provider"
        phase="example"
        title={<>เริ่มต้นที่ dark</>}
        body={<><C>{'renderWithTheme(<ThemeToggle />, "dark")'}</C> แล้วปุ่มต้องเขียน <C>ธีม: dark</C></>}
        snippet="provider-initial"
        lines={[[2, 8]]}
        highlight={[[3, 4]]}
      />
      <Error
        id="7-019"
        section="component ที่ต้องมี provider"
        phase="watchout"
        title={<>ลืม wrapper</>}
        cause={<><C>{'render(<ThemeToggle />)'}</C> ไม่มี provider</>}
        fix={<><C>{'renderWithTheme(<ThemeToggle />)'}</C></>}
        symptom={<><C>{'Unable to find … name "ธีม: dark"'}</C><br />DOM ยัง <C>ธีม: light</C></>}
        visual={<ProviderFrame state="miss" />}
      />

      <Topic
        id="7-020"
        section="rerender: เปลี่ยน props บนของเดิม"
        title={<>rerender: เปลี่ยน props</>}
        body={<>component เดิม · props ใหม่</>}
        visual={<SameMount />}
      />
      <Explain
        id="7-021"
        section="rerender: เปลี่ยน props บนของเดิม"
        phase="know"
        title={<>rerender ไม่ได้เปิดหน้าใหม่</>}
        body={<><C>{'const { rerender } = render(...)'}</C>; เรียก <C>rerender(...)</C> เพื่อเปลี่ยน props ของต้นไม้เดิม — state ภายในไม่รีเซ็ต</>}
        visual={<SameMount state="trace" />}
      />
      <Example
        id="7-022"
        section="rerender: เปลี่ยน props บนของเดิม"
        phase="example"
        title={<>rerender เปลี่ยน done</>}
        body={<><C>TodoItem</C> รับ <C>done</C> เป็น prop; rerender ด้วย <C>done: true</C> แล้ว checkbox ถูกติ๊ก</>}
        snippet="min-rerender"
        highlight={[[6, 7]]}
      />
      <Error
        id="7-023"
        section="rerender: เปลี่ยน props บนของเดิม"
        phase="watchout"
        title={<>render สองครั้ง = สองต้นไม้</>}
        cause={<><C>render</C> ซ้ำแทน <C>rerender</C></>}
        fix={<>เก็บ <C>{'{ rerender }'}</C> จาก render แรก</>}
        symptom={<><C>{'Found multiple elements with the role "checkbox"'}</C></>}
        visual={<SameMount state="twice" />}
      />

      <Topic
        id="7-024"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        title={<>เสริม: จัดระเบียบ test ให้โตได้</>}
        body={<>เทสอะไร · วางไฟล์ไหน · ทำซ้ำอย่างไร</>}
        visual={<TestDesk />}
      />
      <Explain
        id="7-025"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        phase="know"
        title={<>ห้าท่าที่ทำให้ test โตได้</>}
        body={<>1 ควรเทสอะไร · 2 โครงไฟล์ · 3 <C>test.each</C> · 4 <C>describe</C> · 5 <C>beforeEach</C></>}
        visual={<TestDesk state="map" />}
      />
      <Explain
        id="7-026"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        phase="parts"
        title={<>ควรเทสสิ่งที่ผู้ใช้เห็นและทำ</>}
        body={<>ตรวจข้อความ/ปุ่ม/checkbox ที่ผู้ใช้แตะ; ไม่ตรวจชื่อ state หรือฟังก์ชันภายใน — refactor แล้ว test ไม่ควรพัง</>}
        visual={<TestDesk state="scope" />}
      />
      <Explain
        id="7-027"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        phase="parts"
        title={<>วางไฟล์เทสข้าง component</>}
        body={<>repo นี้ใช้ <C>TodoApp.test.tsx</C> ข้าง <C>TodoApp.tsx</C>; helper ที่ใช้ร่วมอยู่ใน <C>test-utils.tsx</C>; setup อยู่ใน <C>vitest.setup.ts</C></>}
        visual={<TestDesk state="files" />}
      />
      <Explain
        id="7-028"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        phase="parts"
        title={<>test.each: เคสเดียว ข้อมูลหลายชุด</>}
        body={<><C>{'test.each([...])("เพิ่ม %s ได้", ...)'}</C> รัน test ตามจำนวนแถว; <C>%s</C> แทนค่าลงชื่อ test</>}
        visual={<TestDesk state="each" />}
      />
      <Explain
        id="7-029"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        phase="parts"
        title={<>describe: จัดกลุ่มให้ output อ่านง่าย</>}
        body={<><C>{'describe("TodoApp", () => { ... })'}</C> รวม test เป็นกลุ่ม; output ขึ้น <C>TodoApp &gt; ชื่อ test</C></>}
        visual={<TestDesk state="describe" />}
      />
      <Explain
        id="7-030"
        section="เสริม: จัดระเบียบ test ให้โตได้"
        phase="parts"
        title={<>beforeEach: เตรียมของก่อนทุก test</>}
        body={<>ในกลุ่ม สร้าง <C>user</C> ใหม่และ <C>render(&lt;TodoApp /&gt;)</C> ก่อนทุก test; test จึงเริ่มจากหน้าเปล่าเสมอ</>}
        visual={<TestDesk state="before" />}
      />

      <Summary
        id="7-031"
        section="Closing"
        title={<>จบ Part 7 แล้วคุณทำได้</>}
        items={[
          <>เทสทั้งแอปผ่าน <C>TodoApp</C></>,
          <><C>renderWithTheme</C> ห่อ provider</>,
          <><C>rerender</C> เปลี่ยน props บนต้นไม้เดิม</>,
          <><C>describe</C>/<C>test.each</C>/<C>beforeEach</C> จัด test</>,
        ]}
      />
      <Focus
        id="7-032"
        section="Closing"
        title={<>ต่อไป: ฟอร์มและ Next.js</>}
        body={<>Part 8: validation, <C>{'vi.mock("next/navigation")'}</C>, <C>useRouter</C> และ <C>vi.hoisted</C></>}
      />
      <Sources
        id="7-033"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <><A href="https://testing-library.com/docs/react-testing-library/api#render-options">Testing Library — render, rerender, custom render</A></>,
          <><A href="https://testing-library.com/docs/guiding-principles">Testing Library — principles</A></>,
          <><A href="https://vitest.dev/api/test#test-each">Vitest — test.each, hooks</A></>,
          <><A href="https://kentcdodds.com/blog/testing-implementation-details">Kent C. Dodds</A></>,
          <>repo lessons 14-15</>,
        ]}
      />
    </Deck>
  );
}
