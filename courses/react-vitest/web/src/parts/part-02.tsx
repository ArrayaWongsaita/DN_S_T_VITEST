import {
  A,
  B,
  C,
  Compare,
  Cover,
  Deck,
  Error,
  Example,
  Explain,
  Focus,
  Li,
  Objectives,
  P,
  Sources,
  Steps,
  Summary,
  Topic,
  Ul,
} from '../components';
import { ConfigBoard, ExtraKit, MissingEnv, SetupRun, SetupTimeline } from '../visuals/part-02';
import { listings, meta, outputs } from './part-02.data';

export default function Part02() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="2-001"
        section="Opening"
        title={<>ติดตั้งและตั้งค่า</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 2</P>
            <P>จาก clone ถึง pnpm test ขึ้น 2 passed</P>
          </>
        }
      />
      <Objectives
        id="2-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>ติดตั้งและเช็กว่าเทสรันได้</>,
          <>อ่าน <C>vitest.config.ts</C> ทีละส่วน</>,
          <>ตั้ง setup + types ให้ matcher ใช้ได้</>,
        ]}
      />
      <Focus
        id="2-003"
        section="Opening"
        title={<>ลืมบรรทัดเดียว เทสแดงทั้งไฟล์</>}
        body={<>config ไม่ได้บอกให้รันใน jsdom → <C>document is not defined</C></>}
        visual={<MissingEnv />}
      />

      <Topic
        id="2-004"
        section="ติดตั้งและสั่งรัน"
        title={<>ติดตั้งและสั่งรัน</>}
        body={<>จาก clone ถึง 2 passed</>}
        visual={<SetupRun />}
      />
      <Explain
        id="2-005"
        section="ติดตั้งและสั่งรัน"
        phase="know"
        title={<>ติดตั้งก่อน แล้วใช้ได้เลย</>}
        body={<><C>pnpm install</C> อ่าน <C>package.json</C> แล้วโหลดของลง <C>node_modules</C>; ต้องมี Node 20+ กับ pnpm</>}
        visual={<SetupRun highlight="install" />}
      />
      <Example
        id="2-006"
        section="ติดตั้งและสั่งรัน"
        phase="example"
        title={<>เช็กว่าติดตั้งครบ</>}
        body={<><C>pnpm test</C> เรียก script <C>test</C> = <C>vitest run</C>; <C>pnpm test:watch</C> = <C>vitest</C> เฝ้าไฟล์</>}
        snippet="install-check"
      />
      <Error
        id="2-007"
        section="ติดตั้งและสั่งรัน"
        phase="watchout"
        title={<>ยังไม่เขียน ไม่ได้แปลว่าพัง</>}
        cause={<><C>pnpm test</C> รันทุกบท; <C>test.todo</C> ถูกข้าม</>}
        fix={<>เช็กด้วย <C>pnpm test setup-check</C> — 2 passed = พร้อม</>}
        symptom={<>17 skipped · 52 todo</>}
        visual={<SetupRun highlight="all" />}
      />

      <Topic
        id="2-008"
        section="vitest.config.ts"
        title={<>vitest.config.ts</>}
        body={<>บอก Vitest ว่าจะรันอะไร ที่ไหน</>}
        visual={<ConfigBoard />}
      />
      <Explain
        id="2-009"
        section="vitest.config.ts"
        phase="know"
        title={<>config คือใบสั่งงานของ Vitest</>}
        body={<>มันตอบว่าไฟล์ไหนคือเทส รันในสภาพแวดล้อมอะไร และเตรียมอะไรก่อน</>}
        visual={<ConfigBoard highlight="include" />}
      />
      <Explain
        id="2-010"
        section="vitest.config.ts"
        phase="parts"
        title={<>plugins: ให้ Vite แปลง TSX</>}
        body={<>ให้ Vite ใช้ plugin React แปลง TSX; วางไว้นอก <C>test</C></>}
        visual={<ConfigBoard highlight="plugins" />}
      />
      <Explain
        id="2-011"
        section="vitest.config.ts"
        phase="parts"
        title={<>environment: ที่อยู่ของ test</>}
        body={<><C>jsdom</C> มี <C>document</C> ให้ render; ค่าปริยาย <C>node</C> ไม่มี <C>document</C></>}
        visual={<ConfigBoard highlight="environment" />}
      />
      <Explain
        id="2-012"
        section="vitest.config.ts"
        phase="parts"
        title={<>include: ไฟล์ไหนคือเทส</>}
        body={<><C>lessons/**</C> หมายถึงทุกไฟล์ใต้ lessons; repo เลือกไฟล์เทสใน lessons กับ setup-check เท่านั้น</>}
        visual={<ConfigBoard highlight="include" />}
      />
      <Explain
        id="2-013"
        section="vitest.config.ts"
        phase="parts"
        title={<>globals: ใช้ test/expect แบบไหน</>}
        body={<><C>false</C> = ต้อง import เอง; <C>true</C> = ใช้ได้เลย — repo เลือก <C>false</C></>}
        visual={<ConfigBoard highlight="globals" />}
      />
      <Explain
        id="2-014"
        section="vitest.config.ts"
        phase="parts"
        title={<>setupFiles: ไฟล์ที่รันก่อน</>}
        body={<>ชี้ไปที่ <C>vitest.setup.ts</C> ซึ่งรันก่อนทุกไฟล์เทส — หัวข้อถัดไปคือไฟล์นั้น</>}
        visual={<ConfigBoard highlight="setupFiles" />}
      />
      <Example
        id="2-015"
        section="vitest.config.ts"
        phase="example"
        title={<>ส่วน test มีแค่ไม่กี่บรรทัด</>}
        body={<>นี่คือส่วน <C>test</C> ทั้งหมด; <C>plugins</C> อยู่นอกบล็อกนี้ — รันแล้วได้ 2 passed</>}
        snippet="config-block"
      />
      <Error
        id="2-016"
        section="vitest.config.ts"
        phase="watchout"
        title={<>เทสใหม่ไม่ถูกเจอ</>}
        cause={<>ไฟล์อยู่นอก <C>include</C> เช่น <C>src/Cart.test.tsx</C></>}
        fix={<>เพิ่ม <C>src/**</C> ใน include หรือย้ายไฟล์เข้าโฟลเดอร์ที่ include ไว้</>}
        symptom={<><C>No test files found</C></>}
        visual={<ConfigBoard highlight="include" outside />}
      />

      <Topic
        id="2-017"
        section="vitest.setup.ts กับ types"
        title={<>vitest.setup.ts กับ types</>}
        body={<>ให้ matcher ใช้ได้ทั้งตอนรันและตอนเขียน</>}
        visual={<SetupTimeline />}
      />
      <Explain
        id="2-018"
        section="vitest.setup.ts กับ types"
        phase="know"
        title={<>setup รันก่อนเทสแรกของทุกไฟล์</>}
        body={<>มันเพิ่ม matcher ให้ <C>expect</C> แล้วติดตั้ง <C>cleanup</C> ให้ทำงานหลังทุก test</>}
        visual={<SetupTimeline highlight="setup" />}
      />
      <Explain
        id="2-019"
        section="vitest.setup.ts กับ types"
        phase="parts"
        title={<>jest-dom: เพิ่ม matcher ของ DOM</>}
        body={<>import <C>@testing-library/jest-dom/vitest</C> ทำให้ <C>toBeInTheDocument</C> ใช้ได้</>}
        visual={<SetupTimeline highlight="jest" />}
      />
      <Explain
        id="2-020"
        section="vitest.setup.ts กับ types"
        phase="parts"
        title={<>cleanup: ล้าง DOM หลังทุก test</>}
        body={<><C>afterEach(() =&gt; cleanup())</C> ล้างสิ่งที่ render ทิ้ง; ต้อง import <C>afterEach</C> เองเพราะ <C>globals: false</C></>}
        visual={<SetupTimeline highlight="cleanup" />}
      />
      <Explain
        id="2-021"
        section="vitest.setup.ts กับ types"
        phase="parts"
        title={<>types: ให้ editor รู้จัก matcher</>}
        body={<><C>tsconfig</C> <C>types</C> บอก TypeScript ว่า matcher ของ jest-dom มีอยู่ — repo ใส่ <C>@testing-library/jest-dom/vitest</C></>}
        visual={<SetupTimeline highlight="types" />}
      />
      <Example
        id="2-022"
        section="vitest.setup.ts กับ types"
        phase="example"
        title={<>setup ทั้งไฟล์สั้นนิดเดียว</>}
        body={<>test ที่ 2 ผ่านเพราะ <C>cleanup</C> ล้าง DOM ของ test แรกไปแล้ว</>}
        snippet="setup-file"
      />
      <Error
        id="2-023"
        section="vitest.setup.ts กับ types"
        phase="watchout"
        title={<>ลืม cleanup: DOM ค้างข้าม test</>}
        cause={<><C>globals: false</C> → RTL ไม่ติดตั้ง cleanup ให้</>}
        fix={<><C>afterEach(() =&gt; cleanup())</C></>}
        symptom={<>เจอ <C>{'<p>'}</C> สองอันใน test ที่ 2</>}
        visual={<SetupTimeline highlight="cleanup" bad />}
      />

      <Topic
        id="2-024"
        section="เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้"
        title={<>เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้</>}
        body={<>globals · coverage · UI · VS Code · alias · CSS · Next.js</>}
        visual={<ExtraKit />}
      />
      <Explain
        id="2-025"
        section="เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้"
        phase="know"
        title={<>เสริมคือของที่เปิดเมื่อจำเป็น</>}
        body={<>ไม่ต้องใส่ทั้งหมด; เริ่มจาก config ของ repo แล้วเพิ่มเมื่อเจอปัญหานั้น</>}
        visual={<ExtraKit highlight="dim" />}
      />
      <Compare
        id="2-026"
        section="เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้"
        phase="parts"
        title={<>globals: true หรือ false</>}
        left={
          <>
            <P><B>true</B></P>
            <Ul>
              <Li>ไม่ต้อง import</Li>
              <Li>cleanup อัตโนมัติ</Li>
            </Ul>
          </>
        }
        right={
          <>
            <P><B>false</B> (repo)</P>
            <Ul>
              <Li>import เอง</Li>
              <Li>cleanup เอง</Li>
            </Ul>
          </>
        }
        takeaway={<>repo เลือก false; เลือกแบบเดียวทั้งโปรเจกต์</>}
      />
      <Steps
        id="2-027"
        section="เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้"
        phase="parts"
        title={<>ติดตั้งก่อน แล้วดูผล</>}
        items={[
          <><C>coverage</C>: ดูว่าโค้ดส่วนไหนถูกเทส — <C>vitest run --coverage</C></>,
          <><C>UI</C>: <C>vitest --ui</C></>,
          <><C>VS Code</C>: extension Vitest</>,
        ]}
        visual={<ExtraKit highlight="tools" />}
      />
      <Steps
        id="2-028"
        section="เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้"
        phase="parts"
        title={<>ปรับ path และ CSS</>}
        items={[
          <>alias <C>@/</C>: ตั้ง <C>resolve.alias</C> และ <C>paths</C> ให้ตรงกัน</>,
          <>CSS: เปิด <C>test.css</C> เมื่อต้องตรวจ style</>,
        ]}
        visual={<ExtraKit highlight="alias-css" />}
      />
      <Explain
        id="2-029"
        section="เสริม: ตั้งค่าเพิ่มเมื่อต้องใช้"
        phase="parts"
        title={<>Next.js: เพิ่มอีกนิดเดียว</>}
        body={<>ใช้ <C>plugins: [tsconfigPaths(), react()]</C> กับ <C>environment: "jsdom"</C>; async Server Component เทสตรง ๆ ไม่ได้</>}
        visual={<ExtraKit highlight="next" />}
      />

      <Summary
        id="2-030"
        section="Closing"
        title={<>จบ Part 2 แล้วคุณทำได้</>}
        items={[
          <>ติดตั้งและเช็กด้วย <C>setup-check</C></>,
          <>อ่าน config ได้ทีละส่วน</>,
          <>ตั้ง setup + types ให้ matcher ทำงาน</>,
          <>รู้ว่าเมื่อไรใช้ของเสริม</>,
        ]}
      />
      <Focus
        id="2-031"
        section="Closing"
        title={<>ต่อไป: เขียน test แรก</>}
        body={<>Part 3 เริ่มจาก <C>render</C> แล้วหาสิ่งที่ผู้ใช้เห็นด้วย <C>getByText</C> / <C>getByRole</C></>}
      />
      <Sources
        id="2-032"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <>
            <A href="https://vitest.dev/config/">Vitest: Config file</A> · <A href="https://vitest.dev/config/include">include</A>
          </>,
          <>
            <A href="https://vitest.dev/config/environment">environment</A> · <A href="https://vitest.dev/config/setupfiles">setupFiles</A> · <A href="https://vitest.dev/config/globals">globals</A>
          </>,
          <>
            <A href="https://vitest.dev/guide/coverage">Coverage</A> · <A href="https://vitest.dev/guide/ui">UI</A> · <A href="https://vitest.dev/guide/ide">IDE</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/react-testing-library/setup/">RTL — Setup</A>
          </>,
          <>
            <A href="https://github.com/testing-library/jest-dom">jest-dom</A>
          </>,
          <>
            <A href="https://nextjs.org/docs/app/guides/testing/vitest">Next.js — Vitest</A>
          </>,
          <>
            <A href="https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST">repo บทเรียน</A>
          </>,
        ]}
      />
    </Deck>
  );
}
