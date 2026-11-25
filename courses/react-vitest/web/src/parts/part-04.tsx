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
import { ExtraCheckBoard, FormBoard, ListBoard, PresenceBoard, StateShapes } from '../visuals/part-04';
import { listings, meta, outputs } from './part-04.data';

export default function Part04() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="4-001"
        section="Opening"
        title={<>เงื่อนไข ลิสต์ และฟอร์ม</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 4</P>
            <P>หน้าเปลี่ยนตามข้อมูล — test ต้องตามให้ทัน</P>
          </>
        }
      />
      <Objectives
        id="4-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>ตรวจของที่ต้องไม่มีด้วย <C>queryByRole</C> + <C>.not</C></>,
          <>นับและชี้รายการในลิสต์</>,
          <>ตรวจค่า checkbox และสถานะปุ่ม</>,
          <>รู้ว่า get/query/find ต่างกัน</>,
        ]}
      />
      <Focus
        id="4-003"
        section="Opening"
        title={<>หน้าเดียว มีหลายสภาพ</>}
        body={<>component เปลี่ยนหน้าตาตาม props — เทสแค่สภาพเดียวจะพลาดอีกสภาพ</>}
        visual={<StateShapes />}
      />

      <Topic
        id="4-004"
        section='ตรวจว่า "ไม่มี"'
        title={<>ตรวจว่า "ไม่มี"</>}
        body={<>ของที่ควรหาย ต้องพิสูจน์ว่าไม่เหลือ</>}
        visual={<PresenceBoard />}
      />
      <Explain
        id="4-005"
        section='ตรวจว่า "ไม่มี"'
        phase="know"
        title={<>queryBy: ถามเบา ๆ ว่าไม่มีใช่ไหม</>}
        body={<><C>queryByRole</C> ไม่เจอแล้วคืน <C>null</C> — ไม่ throw; <C>.not</C> พลิกให้ test ผ่านเมื่อของหาย</>}
        visual={<PresenceBoard state="trace" />}
      />
      <Example
        id="4-006"
        section='ตรวจว่า "ไม่มี"'
        phase="know"
        title={<>ตอนมี: กล่อง <C>role="alert"</C></>}
        body={<>บท 05: ไฟล์เดียวมีสอง test; visible=true ได้กล่อง <C>role="alert"</C> — หาเจอแล้วตรวจว่าอยู่บนหน้า</>}
        snippet="alert-true"
        lines={[[5, 12]]}
      />
      <Explain
        id="4-007"
        section='ตรวจว่า "ไม่มี"'
        phase="parts"
        title={<>queryByRole: ไม่เจอคืน null</>}
        body={<><C>queryByRole</C> หน้าตาเหมือน <C>getByRole</C> แต่ไม่เจอคืน <C>null</C>; เจอหลายตัวยัง throw</>}
        visual={<PresenceBoard state="query" />}
      />
      <Explain
        id="4-008"
        section='ตรวจว่า "ไม่มี"'
        phase="parts"
        title={<><C>.not</C>: พลิกคำตอบของ matcher</>}
        body={<><C>{'expect(null).not.toBeInTheDocument()'}</C> ผ่าน; <C>.not</C> พลิก matcher ไม่ใช่พลิก query</>}
        visual={<PresenceBoard state="not" />}
      />
      <Example
        id="4-009"
        section='ตรวจว่า "ไม่มี"'
        phase="example"
        title={<>visible=false ต้องไม่เห็น alert</>}
        body={<>บท 05: ไฟล์เดียวมีสอง test — เห็นตอน true และไม่เห็นตอน false; นี่คือ test ฝั่งไม่เห็น</>}
        snippet="alert-false"
        lines={[[14, 21]]}
      />
      <Error
        id="4-010"
        section='ตรวจว่า "ไม่มี"'
        phase="watchout"
        title={<>getByRole ใช้ตรวจของหายไม่ได้</>}
        cause={<><C>{'getByRole("alert")'}</C> → throw</>}
        fix={<>ใช้ <C>queryByRole</C> + <C>.not</C></>}
        symptom={<C>{'Unable to find an accessible element with the role "alert"'}</C>}
        visual={<PresenceBoard state="miss" />}
      />

      <Topic
        id="4-011"
        section="ตรวจรายการ"
        title={<>ตรวจรายการ</>}
        body={<>นับให้ครบ ชี้ให้ถูกตัว และอย่าลืมตอนว่าง</>}
        visual={<ListBoard />}
      />
      <Explain
        id="4-012"
        section="ตรวจรายการ"
        phase="know"
        title={<>array กลายเป็นลิสต์</>}
        body={<>สามผลไม้ → สาม <C>{'<li>'}</C>; array ว่าง → ไม่มี <C>{'<ul>'}</C> เหลือแต่ข้อความ "ไม่มีรายการ"</>}
        visual={<ListBoard state="trace" />}
      />
      <Explain
        id="4-013"
        section="ตรวจรายการ"
        phase="parts"
        title={<>getAllByRole: ได้ทุกตัวเป็น array</>}
        body={<><C>{'getAllByRole("listitem")'}</C> คืน array; เอา <C>[0]</C> ไปตรวจตัวแรกได้; ไม่เจอเลยจะ throw</>}
        visual={<ListBoard state="query" />}
      />
      <Explain
        id="4-014"
        section="ตรวจรายการ"
        phase="parts"
        title={<>toHaveLength: นับของใน array</>}
        body={<><C>toHaveLength(3)</C> นับจำนวนใน array จาก getAllBy; ไม่ใช่ของ element เดี่ยว</>}
        visual={<ListBoard state="count" />}
      />
      <Explain
        id="4-015"
        section="ตรวจรายการ"
        phase="parts"
        title={<>สภาพว่าง: list หาย ข้อความอยู่</>}
        body={<><C>{'getByText("ไม่มีรายการ")'}</C> ยืนยันข้อความ; <C>{'queryByRole("list")'}</C> + <C>.not</C> ยืนยันว่า <C>{'<ul>'}</C> หายไป</>}
        visual={<ListBoard state="empty" />}
      />
      <Example
        id="4-016"
        section="ตรวจรายการ"
        phase="example"
        title={<>สามผลไม้ ต้องได้สามรายการ</>}
        body={<>บท 06: นับรายการในลิสต์; ไฟล์เดียวกันยังมี test ของ array ว่าง</>}
        snippet="fruit-test"
        lines={[[5, 12]]}
      />
      <Error
        id="4-017"
        section="ตรวจรายการ"
        phase="watchout"
        title={<>getByRole เจอหลายตัวไม่ได้</>}
        cause={<><C>{'getByRole("listitem")'}</C> กับ 3 <C>{'<li>'}</C></>}
        fix={<><C>getAllByRole</C> + <C>toHaveLength(3)</C></>}
        symptom={<C>{'Found multiple elements with the role "listitem"'}</C>}
        visual={<ListBoard state="multiple" />}
      />

      <Topic
        id="4-018"
        section="ตรวจสถานะฟอร์ม"
        title={<>ตรวจสถานะฟอร์ม</>}
        body={<>อ่านค่าที่กรอก ดูติ๊ก และดูว่าปุ่มกดได้ไหม</>}
        visual={<FormBoard />}
      />
      <Explain
        id="4-019"
        section="ตรวจสถานะฟอร์ม"
        phase="know"
        title={<>ฟอร์มมีค่ากับสถานะ</>}
        body={<>ช่องอีเมลมีค่า; checkbox มีติ๊ก/ไม่ติ๊ก; ปุ่มมี disabled/ไม่ disabled — สามอย่างนี้คือสิ่งที่ test ตรวจ</>}
        visual={<FormBoard state="trace" />}
      />
      <Explain
        id="4-020"
        section="ตรวจสถานะฟอร์ม"
        phase="parts"
        title={<>getByLabelText: หาช่องจากชื่อ</>}
        body={<>หา input จากข้อความ label ที่ผูกด้วย <C>htmlFor</C>/<C>id</C> หรือครอบไว้; ได้ input กลับมา</>}
        visual={<FormBoard state="label" />}
      />
      <Explain
        id="4-021"
        section="ตรวจสถานะฟอร์ม"
        phase="parts"
        title={<>toHaveValue: ค่าในช่อง</>}
        body={<>ตรวจค่าที่อยู่ใน input/select/textarea; checkbox ใช้ <C>toBeChecked</C> ไม่ใช่ <C>toHaveValue</C></>}
        visual={<FormBoard state="value" />}
      />
      <Explain
        id="4-022"
        section="ตรวจสถานะฟอร์ม"
        phase="parts"
        title={<>toBeChecked: ติ๊กหรือยัง</>}
        body={<>ใช้กับ checkbox/radio; ตรวจทั้งติ๊ก (<C>toBeChecked</C>) และไม่ติ๊ก (<C>.not.toBeChecked</C>)</>}
        visual={<FormBoard state="checked" />}
      />
      <Explain
        id="4-023"
        section="ตรวจสถานะฟอร์ม"
        phase="parts"
        title={<>toBeDisabled / toBeEnabled</>}
        body={<><C>toBeDisabled</C> ดู <C>disabled</C> ของปุ่ม; <C>toBeEnabled</C> คืออีกด้านที่อ่านง่ายกว่า <C>not.toBeDisabled</C></>}
        visual={<FormBoard state="disabled" />}
      />
      <Example
        id="4-024"
        section="ตรวจสถานะฟอร์ม"
        phase="example"
        title={<>ปุ่มสมัคร: ปิดจนกว่าจะยอมรับ</>}
        body={<>บท 07 เขียน 4 test ครอบอีเมล checkbox และปุ่มสองสภาพ; นี่คือ test ของปุ่มตอนยังไม่ยอมรับ</>}
        snippet="signup-test"
        lines={[[21, 27]]}
      />
      <Error
        id="4-025"
        section="ตรวจสถานะฟอร์ม"
        phase="watchout"
        title={<>เทสด้านเดียวผ่านทั้งที่โค้ดพัง</>}
        cause={<>ตรวจแค่ <C>agreed={'{true}'}</C> — ติ๊กตลอดก็ผ่าน</>}
        fix={<>เพิ่ม <C>agreed={'{false}'}</C> + <C>.not.toBeChecked()</C></>}
        symptom={<C>Received element is checked</C>}
        visual={<FormBoard state="one-sided" />}
      />

      <Topic
        id="4-026"
        section="เสริม: ตรวจให้ลึกขึ้น"
        title={<>เสริม: ตรวจให้ลึกขึ้น</>}
        body={<>ขอบเขต · การมองเห็น · จังหวะ · style</>}
        visual={<ExtraCheckBoard />}
      />
      <Explain
        id="4-027"
        section="เสริม: ตรวจให้ลึกขึ้น"
        phase="know"
        title={<>สี่คำถามที่ต่อจากเดิม</>}
        body={<>1 ขอบเขต · 2 การมองเห็น<br />3 จังหวะ · 4 style</>}
        visual={<ExtraCheckBoard state="map" />}
      />
      <Explain
        id="4-028"
        section="เสริม: ตรวจให้ลึกขึ้น"
        phase="parts"
        title={<>within: หาในขอบเขต</>}
        body={<><C>within</C> จำกัดขอบเขตให้หาเฉพาะใน element นั้น; แก้ปัญหาของชื่อซ้ำกันทั้งหน้า</>}
        visual={<ExtraCheckBoard state="within" />}
      />
      <Explain
        id="4-029"
        section="เสริม: ตรวจให้ลึกขึ้น"
        phase="parts"
        title={<>toBeVisible: อยู่บนหน้า ≠ เห็น</>}
        body={<><C>display:none</C>, <C>visibility:hidden</C>, <C>opacity:0</C>, <C>hidden</C> ทำให้ <C>toBeVisible</C> ไม่ผ่าน แม้ <C>toBeInTheDocument</C> ยังผ่าน</>}
        visual={<ExtraCheckBoard state="visible" />}
      />
      <Explain
        id="4-030"
        section="เสริม: ตรวจให้ลึกขึ้น"
        phase="parts"
        title={<>get / query / find: เลือกตามจังหวะ</>}
        body={<><C>getBy</C> throw เมื่อไม่เจอ; <C>queryBy</C> คืน null; <C>findBy</C> คืน Promise และรอ; ใช้ findBy จริงใน Part 6</>}
        visual={<ExtraCheckBoard state="table" />}
      />
      <Explain
        id="4-031"
        section="เสริม: ตรวจให้ลึกขึ้น"
        phase="parts"
        title={<>toHaveStyle: style ที่ติดอยู่</>}
        body={<>ตรวจ property ที่ระบุครบทุกตัว; รับได้ทั้ง string อย่าง <C>{'"display: none"'}</C> และ object</>}
        visual={<ExtraCheckBoard state="style" />}
      />

      <Summary
        id="4-032"
        section="Closing"
        title={<>จบ Part 4 แล้วคุณทำได้</>}
        items={[
          <>ตรวจของที่ต้องไม่มีด้วย <C>queryByRole</C> + <C>.not</C></>,
          <>นับ/ชี้รายการ และตรวจสภาพว่าง</>,
          <>ตรวจค่า checkbox และสถานะปุ่ม</>,
          <>ใช้ within/toBeVisible/toHaveStyle</>,
        ]}
      />
      <Focus
        id="4-033"
        section="Closing"
        title={<>ต่อไป: ให้ผู้ใช้กดและพิมพ์</>}
        body={<>Part 5 เปลี่ยนจาก props ที่เราส่งเข้าไป เป็นการกระทำของผู้ใช้ — click, type และตรวจว่าฟังก์ชันถูกเรียก</>}
      />
      <Sources
        id="4-034"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <>
            <A href="https://testing-library.com/docs/queries/about">Testing Library — About Queries</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/queries/byrole">ByRole</A> · <A href="https://testing-library.com/docs/queries/bylabeltext">ByLabelText</A>
          </>,
          <>
            <A href="https://testing-library.com/docs/dom-testing-library/api-within">within</A>
          </>,
          <>
            <A href="https://github.com/testing-library/jest-dom">jest-dom — matchers</A>
          </>,
          <>
            <A href="https://vitest.dev/api/expect">Vitest — expect (toHaveLength)</A>
          </>,
          <>
            <A href="https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST">repo lessons 05-07</A>
          </>,
        ]}
      />
    </Deck>
  );
}
