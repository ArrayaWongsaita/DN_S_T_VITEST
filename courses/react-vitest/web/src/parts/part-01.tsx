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
  Output,
  P,
  Sources,
  Summary,
  Topic,
} from '../components';
import { BrokenButtons, CheckCard, ToolStack, VitestPipeline } from '../visuals/part-01';
import { listings, meta, outputs } from './part-01.data';

export default function Part01() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="1-001"
        section="Opening"
        title={<>Vitest คืออะไร</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 1</P>
            <P>จากยังไม่เคยเขียนเทส ถึงอ่าน test ออก</P>
          </>
        }
      />
      <Objectives
        id="1-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>อธิบายได้ว่าทำไมต้องเทสหน้าจอ</>,
          <>บอกหน้าที่ของเครื่องมือแต่ละตัว</>,
          <>อ่าน test สั้น ๆ กับผลรันได้</>,
        ]}
      />
      <Focus
        id="1-003"
        section="Opening"
        title={<>แก้ปุ่มเดียว แต่ปุ่มอื่นพัง</>}
        body={<>เปลี่ยนสีปุ่มส่ง แล้วปุ่มยกเลิกใช้ไม่ได้ โดยที่เราไม่รู้</>}
        visual={<BrokenButtons />}
      />

      <Topic
        id="1-004"
        section="ทำไมต้องเทสหน้าจอ"
        title={<>ทำไมต้องเทสหน้าจอ</>}
        body={<>ให้เครื่องตรวจซ้ำแทนเรา</>}
        visual={<CheckCard mode="full" />}
      />
      <Explain
        id="1-005"
        section="ทำไมต้องเทสหน้าจอ"
        phase="know"
        title={<>เทสคือการตรวจซ้ำ</>}
        body={<>เราเขียนคำตอบที่ถูกไว้ก่อน เครื่องรันขั้นตอนเดิมทุกครั้ง แล้วบอกว่าตรงหรือไม่</>}
        visual={<CheckCard mode="trace" />}
      />
      <Example
        id="1-006"
        section="ทำไมต้องเทสหน้าจอ"
        phase="example"
        title={<>test หนึ่งอันหน้าตาแบบนี้</>}
        body={<>อ่านบนลงล่าง: วาง component, หาข้อความ, ตรวจว่าอยู่บนหน้า</>}
        snippet="hello-test"
      />
      <Error
        id="1-007"
        section="ทำไมต้องเทสหน้าจอ"
        phase="watchout"
        title={<>เขียวแล้วไม่ได้แปลว่าหมดบั๊ก</>}
        cause={<>เทสตรวจแค่หัวข้อ ไม่ได้ตรวจปุ่ม</>}
        fix={<>เพิ่มการตรวจปุ่มและข้อความบนปุ่ม</>}
        visual={<CheckCard mode="blind" />}
      />

      <Topic
        id="1-008"
        section="Vitest คืออะไร"
        title={<>Vitest คืออะไร</>}
        body={<>เครื่องรันเทสที่มากับ Vite</>}
        visual={<VitestPipeline />}
      />
      <Explain
        id="1-009"
        section="Vitest คืออะไร"
        phase="know"
        title={<>Vitest รับไฟล์ test ไปรัน</>}
        body={<>มันหาไฟล์ .test.tsx, รันแต่ละ test, แล้วสรุปว่าผ่านหรือไม่ผ่านกี่ข้อ</>}
        visual={<VitestPipeline mode="trace" />}
      />
      <Explain
        id="1-010"
        section="Vitest คืออะไร"
        phase="parts"
        title={<>Vitest: คนรันและประกาศผล</>}
        body={<>หาไฟล์ test ตาม config, รันใน Node, โหมด watch รันซ้ำเมื่อเซฟ, แล้วพิมพ์ผล</>}
        visual={<VitestPipeline highlight="runner" />}
      />
      <Explain
        id="1-011"
        section="Vitest คืออะไร"
        phase="parts"
        title={<>expect: ประโยคตรวจคำตอบ</>}
        body={
          <>
            <C>expect(ค่าที่ได้).toBe(ค่าที่คาด)</C> — ไม่ตรงเมื่อไร test นั้นไม่ผ่านทันที
          </>
        }
        visual={<VitestPipeline highlight="expect" />}
      />
      <Explain
        id="1-012"
        section="Vitest คืออะไร"
        phase="parts"
        title={<>jsdom: หน้าเว็บจำลองใน Node</>}
        body={<>จำลอง DOM ให้ component มีที่ให้ render โดยไม่ต้องเปิดเบราว์เซอร์จริง</>}
        visual={<VitestPipeline highlight="jsdom" />}
      />
      <Explain
        id="1-013"
        section="Vitest คืออะไร"
        phase="parts"
        title={<>Vite + plugin-react: แปลง TSX</>}
        body={<>แปลง TSX (JSX + TypeScript) เป็น JS ที่ Node รันได้ ด้วย plugin React มาตรฐาน</>}
        visual={<VitestPipeline highlight="transform" />}
      />
      <Output
        id="1-014"
        section="Vitest คืออะไร"
        phase="example"
        title={<>สั่งรันแล้วเห็นอะไร</>}
        body={
          <>
            สั่ง <C>pnpm test lessons/01-first-render --reporter=verbose</C> แล้วอ่านชื่อ test กับสรุป
          </>
        }
        snippet="hello-run"
      />
      <Explain
        id="1-015"
        section="Vitest คืออะไร"
        phase="watchout"
        title={<>jsdom ไม่ใช่เบราว์เซอร์จริง</>}
        body={<>มันไม่มีหน้าจอ ไม่คิด layout ไม่ทาสี — ตรวจได้แค่โครง DOM กับพฤติกรรม</>}
        visual={<VitestPipeline mode="watchout" highlight="jsdom" />}
      />

      <Topic
        id="1-016"
        section="เทสให้เหมือนผู้ใช้"
        title={<>เทสให้เหมือนผู้ใช้</>}
        body={<>RTL · user-event · jest-dom</>}
        visual={<ToolStack />}
      />
      <Explain
        id="1-017"
        section="เทสให้เหมือนผู้ใช้"
        phase="know"
        title={<>มองหน้าเว็บด้วยตาผู้ใช้</>}
        body={<>RTL ให้เรา render component ลง DOM แล้วหา element จากสิ่งที่ผู้ใช้เห็น เช่น ข้อความ หรือ role (ปุ่ม/หัวข้อ)</>}
        visual={<ToolStack mode="trace" />}
      />
      <Explain
        id="1-018"
        section="เทสให้เหมือนผู้ใช้"
        phase="parts"
        title={<>render: วาง component ลง DOM</>}
        body={
          <>
            <C>{'render(<Greeting />)'}</C> สร้าง DOM ใน jsdom ให้ component อยู่บนหน้า
          </>
        }
        visual={<ToolStack highlight="render" />}
      />
      <Explain
        id="1-019"
        section="เทสให้เหมือนผู้ใช้"
        phase="parts"
        title={<>screen: หาของบนหน้า</>}
        body={
          <>
            <C>{'screen.getByRole("button", { name: "ทักทาย" })'}</C> หาปุ่มจากชื่อที่ผู้ใช้เห็น
          </>
        }
        visual={<ToolStack highlight="query" />}
      />
      <Explain
        id="1-020"
        section="เทสให้เหมือนผู้ใช้"
        phase="parts"
        title={<>user-event: มือที่กดและพิมพ์</>}
        body={
          <>
            <C>await user.click(...)</C> จำลองการกดจริง: focus, event หลายตัว และเช็กว่ากดได้
          </>
        }
        visual={<ToolStack highlight="user" />}
      />
      <Explain
        id="1-021"
        section="เทสให้เหมือนผู้ใช้"
        phase="parts"
        title={<>jest-dom: คำตรวจเกี่ยวกับ DOM</>}
        body={
          <>
            <C>toBeInTheDocument()</C> ถามว่า element อยู่บนหน้าไหม อ่านแล้วเข้าใจทันที
          </>
        }
        visual={<ToolStack highlight="jest" />}
      />
      <Example
        id="1-022"
        section="เทสให้เหมือนผู้ใช้"
        phase="example"
        title={<>อ่าน test นี้ทีละบรรทัด</>}
        body={<>render การ์ดทักทาย แล้วหาหัวข้อกับปุ่มด้วย role — ทั้งคู่ต้องอยู่บนหน้า</>}
        snippet="greeting-test"
      />
      <Explain
        id="1-023"
        section="เทสให้เหมือนผู้ใช้"
        phase="watchout"
        title={<>อย่าเทสสิ่งที่ผู้ใช้มองไม่เห็น</>}
        body={<>อย่าเช็ก state หรือชื่อ class ภายใน มันพังตอน refactor และไม่บอกว่า UI ยังใช้ได้ไหม</>}
        visual={<ToolStack mode="wrong" />}
      />

      <Summary
        id="1-024"
        section="Closing"
        title={<>สรุปสิ่งที่ได้จาก Part 1</>}
        items={[
          <>เทส = ตรวจซ้ำสิ่งที่ผู้ใช้เห็น</>,
          <>Vitest = คนรันและรายงานผล</>,
          <>jsdom = DOM จำลอง ไม่มีจอจริง</>,
          <>RTL หาของ, user-event กด, jest-dom ตรวจ</>,
        ]}
      />
      <Focus
        id="1-025"
        section="Closing"
        title={<>ต่อไป: ติดตั้งให้พร้อม</>}
        body={
          <>
            Part 2 ลงมือติดตั้งและเขียน <C>vitest.config.ts</C>, <C>vitest.setup.ts</C> ให้ test รันได้จริง
          </>
        }
      />
      <Sources
        id="1-026"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <>
            <A href="https://vitest.dev/guide/why">Vitest — Why Vitest</A>
          </>,
          <>
            <A href="https://vitest.dev/guide/environment">Vitest — Test Environment</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/react-testing-library/intro/">React Testing Library</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/user-event/intro/">user-event</A>
          </>,
          <>
            <A href="https://github.com/testing-library/jest-dom">jest-dom</A>
          </>,
          <>
            <A href="https://github.com/jsdom/jsdom">jsdom</A> ·{' '}
            <A href="https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react">plugin-react</A>
          </>,
          <>
            <A href="https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST">repo บทเรียน</A>
          </>,
        ]}
      />
    </Deck>
  );
}
