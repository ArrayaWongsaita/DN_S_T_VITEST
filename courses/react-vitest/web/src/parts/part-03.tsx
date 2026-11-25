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
  Steps,
  Summary,
  Topic,
} from '../components';
import { DetailCheck, FindTrace, QueryLadder, RoleBoard } from '../visuals/part-03';
import { listings, meta, outputs } from './part-03.data';

export default function Part03() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="3-001"
        section="Opening"
        title={<>render และ query</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 3</P>
            <P>จากหน้าเปล่า ถึง test ที่ชี้ถูก element</P>
          </>
        }
      />
      <Objectives
        id="3-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>หา element ด้วยข้อความ</>,
          <>หาด้วย role + name</>,
          <>ตรวจข้อความ/attribute/class</>,
          <>รู้ว่า query ไหนควรลองก่อน</>,
        ]}
      />
      <Focus
        id="3-003"
        section="Opening"
        title={<>หาไม่เจอ ทั้งที่ข้อความอยู่ตรงหน้า</>}
        body={<><C>getByText("hello")</C> กับ <C>Hello, React!</C> — ต่างกันแค่ตัวพิมพ์ ก็ไม่เจอ</>}
        visual={<FindTrace state="miss" />}
      />

      <Topic
        id="3-004"
        section="test แรก: หาข้อความบนหน้า"
        title={<>test แรก: หาข้อความบนหน้า</>}
        body={<>render ให้อยู่บนหน้า แล้วให้ screen หา</>}
        visual={<FindTrace />}
      />
      <Explain
        id="3-005"
        section="test แรก: หาข้อความบนหน้า"
        phase="know"
        title={<>เทสเริ่มจากวาง แล้วหา</>}
        body={<><C>render</C> วาง component ลงหน้า; <C>screen.getByText</C> หยิบ element ที่มีข้อความนั้น; <C>toBeInTheDocument</C> ถามว่ามันยังอยู่บนหน้าไหม</>}
        visual={<FindTrace state="trace" />}
      />
      <Explain
        id="3-006"
        section="test แรก: หาข้อความบนหน้า"
        phase="parts"
        title={<>getByText: หาจากข้อความที่เห็น</>}
        body={<>รับ string ที่ต้องตรงทั้งข้อความ หรือ regex เมื่ออยากยืดหยุ่น; เจอแล้วคืน element, ไม่เจอ throw ทันที</>}
        visual={<FindTrace state="query" />}
      />
      <Explain
        id="3-007"
        section="test แรก: หาข้อความบนหน้า"
        phase="parts"
        title={<>toBeInTheDocument: อยู่บนหน้าไหม</>}
        body={<>matcher ของ jest-dom: ผ่านเมื่อ element ต่ออยู่กับ document; element ที่ถูกถอดออกไปแล้วไม่ผ่าน</>}
        visual={<FindTrace state="check" />}
      />
      <Example
        id="3-008"
        section="test แรก: หาข้อความบนหน้า"
        phase="example"
        title={<>test แรกที่รันได้</>}
        body={<>บท 01: <C>/hello/i</C> หาเจอแม้ตัวพิมพ์ต่าง แล้ว <C>toBeInTheDocument</C> ยืนยันว่าอยู่บนหน้า</>}
        snippet="hello-test"
        lines={[[4, 9]]}
      />
      <Error
        id="3-009"
        section="test แรก: หาข้อความบนหน้า"
        phase="watchout"
        title={<>ลืม render: หน้าว่าง</>}
        cause={<>ไม่ได้ <C>{'render(<Hello />)'}</C></>}
        fix={<><C>render</C> ก่อน แล้วค่อย <C>screen.getByText</C></>}
        symptom={<C>{'Unable to find an element with the text: Hello, React!'}</C>}
        visual={<FindTrace state="empty" />}
      />

      <Topic
        id="3-010"
        section="getByRole: หาแบบที่ผู้ใช้เห็น"
        title={<>getByRole: หาแบบที่ผู้ใช้เห็น</>}
        body={<>role บอกว่าคืออะไร · name บอกว่าชื่ออะไร</>}
        visual={<RoleBoard />}
      />
      <Explain
        id="3-011"
        section="getByRole: หาแบบที่ผู้ใช้เห็น"
        phase="know"
        title={<>role คือหน้าที่ของ element</>}
        body={<>h1-h6 มี role เป็น <C>heading</C>, ปุ่มเป็น <C>button</C>, ลิงก์เป็น <C>link</C>; <C>getByRole</C> ถามหาตามหน้าที่ ไม่ใช่ชื่อ tag</>}
        visual={<RoleBoard state="role" />}
      />
      <Explain
        id="3-012"
        section="getByRole: หาแบบที่ผู้ใช้เห็น"
        phase="parts"
        title={<>name: ชื่อที่ผู้ใช้เรียก</>}
        body={<>name มาจากข้อความบน element หรือ label/aria-label; ค่าจาก props ที่อยู่ในข้อความก็อยู่ใน name ด้วย</>}
        visual={<RoleBoard state="name" />}
      />
      <Explain
        id="3-013"
        section="getByRole: หาแบบที่ผู้ใช้เห็น"
        phase="parts"
        title={<>getByRole(role, {'{'} name {'}'})</>}
        body={<>ระบุ role แล้วกรองด้วย name; ถ้าไม่ใส่ name และมีหลายตัว <C>getByRole</C> จะ throw เพราะไม่รู้จะเลือกอันไหน</>}
        visual={<RoleBoard state="query" />}
      />
      <Example
        id="3-014"
        section="getByRole: หาแบบที่ผู้ใช้เห็น"
        phase="example"
        title={<>หา heading จากชื่อ</>}
        body={<>บท 02: เปลี่ยน props เป็น Som แล้ว heading ต้องเปลี่ยนตาม — หาด้วย role + name</>}
        snippet="greeting-test"
        lines={[[5, 11]]}
      />
      <Error
        id="3-015"
        section="getByRole: หาแบบที่ผู้ใช้เห็น"
        phase="watchout"
        title={<>h2 ไม่ใช่ role</>}
        cause={<><C>{'getByRole("h2")'}</C> — h2 คือ <C>heading</C></>}
        fix={<C>{'getByRole("heading", { name: ... })'}</C>}
        symptom={<C>{'Unable to find an accessible element with the role "h2"'}</C>}
        visual={<RoleBoard state="bad" />}
      />

      <Topic
        id="3-016"
        section="ตรวจข้างใน element"
        title={<>ตรวจข้างใน element</>}
        body={<>หาให้เจอ แล้วถามให้ตรงจุด</>}
        visual={<DetailCheck />}
      />
      <Explain
        id="3-017"
        section="ตรวจข้างใน element"
        phase="know"
        title={<>หา element ก่อน แล้วค่อยตรวจ</>}
        body={<>query ตอบว่า "อันไหน"; matcher ตอบว่า "ข้างในเป็นอย่างไร"; แยกสองขั้นนี้ทำให้ test อ่านออก</>}
        visual={<DetailCheck state="trace" />}
      />
      <Explain
        id="3-018"
        section="ตรวจข้างใน element"
        phase="parts"
        title={<>toHaveTextContent: มีข้อความนี้</>}
        body={<>ตรวจแบบ "มี" ไม่ต้องตรงทั้งก้อน; ใช้ regex เมื่ออยากไม่สนตัวพิมพ์ และตรวจข้อความทั้ง element</>}
        visual={<DetailCheck state="text" />}
      />
      <Explain
        id="3-019"
        section="ตรวจข้างใน element"
        phase="parts"
        title={<>toHaveAttribute: attribute ถูกค่า</>}
        body={<><C>{'toHaveAttribute("href", "/doc")'}</C> ตรวจทั้งชื่อและค่า; ใส่ชื่ออย่างเดียว = ตรวจแค่ว่ามี attribute นี้</>}
        visual={<DetailCheck state="attr" />}
      />
      <Explain
        id="3-020"
        section="ตรวจข้างใน element"
        phase="parts"
        title={<>toHaveClass: มี class นี้</>}
        body={<>ตรวจทีละ class ไม่ต้องตรงทั้ง <C>className</C>; ใส่หลาย class ได้ และใช้ <C>.not</C> เมื่อต้องแน่ใจว่าไม่มี</>}
        visual={<DetailCheck state="class" />}
      />
      <Example
        id="3-021"
        section="ตรวจข้างใน element"
        phase="example"
        title={<>ป้ายหนึ่งอัน ตรวจสามอย่าง</>}
        body={<>บท 04: หาป้ายด้วยข้อความ แล้วตรวจข้อความ, href และ class บน element เดียวกัน</>}
        snippet="badge-test"
        lines={[[5, 14]]}
      />
      <Error
        id="3-022"
        section="ตรวจข้างใน element"
        phase="watchout"
        title={<>getByText ต้องตรงทั้งข้อความ</>}
        cause={<><C>{'getByText("250")'}</C> ไม่เจอ <C>{'<p>250 THB</p>'}</C> เพราะต้องตรงทั้งข้อความ</>}
        fix={<><C>{'getByText(/250/)'}</C> หรือ <C>{'toHaveTextContent("250")'}</C></>}
        visual={<DetailCheck state="price" />}
      />

      <Topic
        id="3-023"
        section="เสริม: หาให้ตรงกับของ"
        title={<>เสริม: หาให้ตรงกับของ</>}
        body={<>ลำดับที่ควรลอง · debug · test id · alt/placeholder</>}
        visual={<QueryLadder />}
      />
      <Explain
        id="3-024"
        section="เสริม: หาให้ตรงกับของ"
        phase="know"
        title={<>เริ่มจากสิ่งที่ผู้ใช้เห็น</>}
        body={<>ลำดับหลัก: role → label (ป้ายชื่อช่องกรอก) → placeholder → text → alt → test id; ยิ่งใกล้ผู้ใช้ test ยิ่งทนต่อการ refactor</>}
        visual={<QueryLadder state="top" />}
      />
      <Explain
        id="3-025"
        section="เสริม: หาให้ตรงกับของ"
        phase="parts"
        title={<>getByTestId: ทางสุดท้าย</>}
        body={<>หา <C>{'[data-testid="..."]'}</C> ที่ใส่ไว้ในโค้ด; ผู้ใช้มองไม่เห็นป้ายนี้ จึงใช้เมื่อ role/ข้อความใช้ไม่ได้จริง ๆ</>}
        visual={<QueryLadder state="testid" />}
      />
      <Explain
        id="3-026"
        section="เสริม: หาให้ตรงกับของ"
        phase="parts"
        title={<>alt กับ placeholder</>}
        body={<>รูปใช้ alt → <C>getByAltText</C>; ช่องที่ยังไม่มี label ใช้ placeholder → <C>getByPlaceholderText</C> — แต่ placeholder ไม่ใช่ label ที่ดี</>}
        visual={<QueryLadder state="special" />}
      />
      <Steps
        id="3-027"
        section="เสริม: หาให้ตรงกับของ"
        phase="parts"
        title={<>ดูว่าบนหน้ามีอะไร</>}
        items={[
          <><C>screen.debug()</C> พิมพ์ DOM ทั้งหน้า</>,
          <><C>logRoles(container)</C> พิมพ์ role ทั้งหมดพร้อม element</>,
          <>get/find ที่พังพิมพ์ DOM ให้เอง</>,
        ]}
        visual={<QueryLadder state="debug" />}
      />

      <Summary
        id="3-028"
        section="Closing"
        title={<>จบ Part 3 แล้วคุณทำได้</>}
        items={[
          <>render แล้วหา element ด้วยข้อความ</>,
          <>หาด้วย role + name</>,
          <>ตรวจข้อความ/attribute/class</>,
          <>รู้ลำดับ query ที่ควรลอง</>,
        ]}
      />
      <Focus
        id="3-029"
        section="Closing"
        title={<>ต่อไป: เงื่อนไขและลิสต์</>}
        body={<>Part 4 ใช้ <C>queryBy</C> เมื่อของต้องไม่อยู่, <C>getAllByRole</C> กับลิสต์ และ <C>getByLabelText</C> กับฟอร์ม</>}
      />
      <Sources
        id="3-030"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <>
            <A href="https://testing-library.com/docs/queries/about">Testing Library — About Queries / priority</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/queries/bytext">ByText</A> · <A href="https://testing-library.com/docs/queries/byrole">ByRole</A> · <A href="https://testing-library.com/docs/queries/bytestid">ByTestId</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/queries/byalttext">ByAltText</A> · <A href="https://testing-library.com/docs/dom-testing-library/api-debugging">Debugging</A>
          </>,
          <>
            <A href="https://github.com/testing-library/jest-dom">jest-dom — matchers</A>
          </>,
          <>
            <A href="https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST">repo บทเรียน</A>
          </>,
        ]}
      />
    </Deck>
  );
}
