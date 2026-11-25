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
import { ClickTrace, ExtraUserKit, SpyLedger, TypeField } from '../visuals/part-05';
import { listings, meta, outputs } from './part-05.data';

export default function Part05() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="5-001"
        section="Opening"
        title={<>ผู้ใช้กดและพิมพ์</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 5</P>
            <P>จากหน้าจอที่นิ่ง ถึงการกระทำของผู้ใช้</P>
          </>
        }
      />
      <Objectives
        id="5-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>จำลองการคลิกและพิมพ์ด้วย <C>user-event</C></>,
          <>รอให้หน้าจอเปลี่ยนด้วย <C>await</C></>,
          <>ตรวจฟังก์ชันที่ถูกเรียกด้วย <C>vi.fn</C></>,
          <>รู้จัก keyboard, hover, select, upload</>,
        ]}
      />
      <Focus
        id="5-003"
        section="Opening"
        title={<>จากนี้ test ลงมือเอง</>}
        body={<>Part 1-4 ตรวจหน้าตา ตอนนี้ให้ผู้ใช้จำลองกดปุ่มและพิมพ์เอง</>}
        visual={<ClickTrace state="hook" />}
      />

      <Topic
        id="5-004"
        section="คลิกเหมือนผู้ใช้"
        title={<>คลิกเหมือนผู้ใช้</>}
        body={<>setup หนึ่งครั้ง · click หนึ่งครั้ง · await ทุกครั้ง</>}
        visual={<ClickTrace />}
      />
      <Explain
        id="5-005"
        section="คลิกเหมือนผู้ใช้"
        phase="know"
        title={<>คลิกหนึ่งครั้ง คือหลายเหตุการณ์</>}
        body={<>user-event ไม่ได้ยิง click ทีเดียว — มันกดจริงหลายจังหวะ แล้วรอให้ React วาดใหม่</>}
        visual={<ClickTrace state="trace" />}
      />
      <Example
        id="5-006"
        section="คลิกเหมือนผู้ใช้"
        phase="know"
        title={<>test เล็กสุด: กดครั้งเดียว</>}
        body={<>setup → render → click → ตรวจ Count: 1; test เป็น async เพราะมี await</>}
        snippet="min-click"
        lines={[[6, 14]]}
      />
      <Explain
        id="5-007"
        section="คลิกเหมือนผู้ใช้"
        phase="parts"
        title={<>userEvent.setup(): สร้างผู้ใช้หนึ่งคน</>}
        body={<>เรียกก่อน render; ผู้ใช้คนนี้จำสถานะการกดและการพิมพ์ไว้ใช้ต่อทั้ง test</>}
        visual={<ClickTrace state="setup" />}
      />
      <Explain
        id="5-008"
        section="คลิกเหมือนผู้ใช้"
        phase="parts"
        title={<>click: กดที่ element</>}
        body={<>ส่ง element จาก query; user-event ตรวจว่ากดได้จริง แล้วยิง event ครบชุด</>}
        visual={<ClickTrace state="click" />}
      />
      <Explain
        id="5-009"
        section="คลิกเหมือนผู้ใช้"
        phase="parts"
        title={<>await: รอให้จบก่อนตรวจ</>}
        body={<>ทุกคำสั่งคืน Promise; test ต้อง async แล้ว await ก่อนตรวจ</>}
        visual={<ClickTrace state="await" />}
      />
      <Example
        id="5-010"
        section="คลิกเหมือนผู้ใช้"
        phase="example"
        title={<>กด +1 สองครั้ง ต้องได้ 2</>}
        body={<>บท 08: ไฟล์มี 3 test; await ทั้งสองครั้งแล้วตรวจ Count: 2</>}
        snippet="counter-two"
        lines={[[13, 23]]}
      />
      <Error
        id="5-011"
        section="คลิกเหมือนผู้ใช้"
        phase="watchout"
        title={<>ลืม await: ตรวจก่อนหน้าเปลี่ยน</>}
        cause={<><C>{'user.click'}</C> ไม่มี await</>}
        fix={<><C>{'await user.click'}</C> + test async</>}
        symptom={<C>{'Unable to find an element with the text: Count: 1'}</C>}
        visual={<ClickTrace state="miss" />}
      />

      <Topic
        id="5-012"
        section="พิมพ์และล้างช่อง"
        title={<>พิมพ์และล้างช่อง</>}
        body={<>type ทีละตัว · clear ล้างทั้งช่อง</>}
        visual={<TypeField />}
      />
      <Explain
        id="5-013"
        section="พิมพ์และล้างช่อง"
        phase="know"
        title={<>พิมพ์ทีละตัวอักษร</>}
        body={<>type พิมพ์ M-a-l-i ทีละตัว; ทุกตัว React รับ onChange แล้ววาด input กับคำทักทายใหม่</>}
        visual={<TypeField state="trace" />}
      />
      <Explain
        id="5-014"
        section="พิมพ์และล้างช่อง"
        phase="parts"
        title={<>type: พิมพ์ข้อความลงช่อง</>}
        body={<>type(ช่อง, "Mali") คลิกโฟกัสก่อน แล้วพิมพ์ตามลำดับ; ใช้ <C>{'{Enter}'}</C> สำหรับปุ่มพิเศษ</>}
        visual={<TypeField state="type" />}
      />
      <Explain
        id="5-015"
        section="พิมพ์และล้างช่อง"
        phase="parts"
        title={<>clear: ล้างทั้งช่อง</>}
        body={<>clear(ช่อง) เลือกข้อความทั้งหมดแล้วลบ; ช่องว่างทำให้กลับไปทักทายคนแปลกหน้า</>}
        visual={<TypeField state="clear" />}
      />
      <Example
        id="5-016"
        section="พิมพ์และล้างช่อง"
        phase="example"
        title={<>พิมพ์แล้วล้าง กลับเป็นคนแปลกหน้า</>}
        body={<>บท 09: ไฟล์มี 3 test; type "Mali" แล้ว clear — กลับไปทักทายคนแปลกหน้า</>}
        snippet="name-clear"
        lines={[[26, 36]]}
      />
      <Error
        id="5-017"
        section="พิมพ์และล้างช่อง"
        phase="watchout"
        title={<>type ต่อท้าย ไม่ใช่แทนที่</>}
        cause={<>พิมพ์ Mali แล้ว Som ต่อ โดยไม่ clear</>}
        fix={<><C>{'await user.clear(input)'}</C> ก่อนพิมพ์ชุดใหม่</>}
        symptom={<>Expected Som<br />Received MaliSom</>}
        visual={<TypeField state="append" />}
      />

      <Topic
        id="5-018"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        title={<>ตรวจฟังก์ชันที่ถูกเรียก</>}
        body={<>ผู้ใช้กด → component เรียก callback → เราตรวจบันทึก</>}
        visual={<SpyLedger />}
      />
      <Explain
        id="5-019"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        phase="know"
        title={<>component เรียกฟังก์ชันที่เราส่งให้</>}
        body={<>บางครั้งหน้าไม่เปลี่ยน แต่ component เรียก onConfirm(label); เราเสียบฟังก์ชันปลอมเป็นสมุดบันทึก</>}
        visual={<SpyLedger state="trace" />}
      />
      <Explain
        id="5-020"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        phase="parts"
        title={<>vi.fn(): ฟังก์ชันปลอมที่จำทุกการเรียก</>}
        body={<>เรียกได้เหมือนฟังก์ชันจริง แต่เก็บ args และจำนวนครั้งไว้ให้ตรวจ</>}
        visual={<SpyLedger state="vi" />}
      />
      <Explain
        id="5-021"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        phase="parts"
        title={<>not.toHaveBeenCalled: ยังไม่ถูกเรียก</>}
        body={<>ใช้ตรวจก่อนกด — ฟังก์ชันต้องยังไม่มีประวัติ</>}
        visual={<SpyLedger state="notcalled" />}
      />
      <Explain
        id="5-022"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        phase="parts"
        title={<>toHaveBeenCalledWith: เรียกด้วยค่าอะไร</>}
        body={<>ผ่านเมื่อถูกเรียกอย่างน้อยหนึ่งครั้งด้วย args เหล่านั้น; ไม่ได้บอกว่าเรียกครั้งเดียว</>}
        visual={<SpyLedger state="with" />}
      />
      <Example
        id="5-023"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        phase="example"
        title={<>กดปุ่มแล้ว callback ได้ label</>}
        body={<>บท 10: ไฟล์มี 3 test; ส่ง vi.fn() เป็น onConfirm แล้วตรวจว่าได้ "ตกลง"</>}
        snippet="confirm-label"
        lines={[[27, 37]]}
      />
      <Error
        id="5-024"
        section="ตรวจฟังก์ชันที่ถูกเรียก"
        phase="watchout"
        title={<>ฟังก์ชันจริงไม่มีสมุดบันทึก</>}
        cause={<>เอา <C>onConfirm</C> ฟังก์ชันจริงไปตรวจ</>}
        fix={<>ใช้ <C>vi.fn()</C> แทน</>}
        symptom={<C>{'TypeError: ... not a spy or a call to a spy!'}</C>}
        visual={<SpyLedger state="realfn" />}
      />

      <Topic
        id="5-025"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        title={<>เสริม: ท่าอื่นที่ใช้บ่อย</>}
        body={<>keyboard/Tab · hover · select · upload · นับครั้ง</>}
        visual={<ExtraUserKit />}
      />
      <Explain
        id="5-026"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        phase="know"
        title={<>ห้าท่าที่ต่อจาก click/type</>}
        body={<>1 keyboard/Tab · 2 hover · 3 selectOptions · 4 upload · 5 times/clear</>}
        visual={<ExtraUserKit state="map" />}
      />
      <Explain
        id="5-027"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        phase="parts"
        title={<>keyboard กับ tab: กดคีย์และย้ายโฟกัส</>}
        body={<><C>{'user.keyboard("{Enter}")'}</C> กดปุ่มพิเศษ; <C>user.tab()</C> ย้ายโฟกัส แล้วตรวจด้วย <C>toHaveFocus</C></>}
        visual={<ExtraUserKit state="keyboard" />}
      />
      <Explain
        id="5-028"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        phase="parts"
        title={<>hover: ชี้แล้วมีอะไรโผล่</>}
        body={<><C>user.hover(el)</C> แล้ว <C>unhover(el)</C>; ใช้ตรวจเมนูหรือทูลทิปที่โผล่ตอนชี้</>}
        visual={<ExtraUserKit state="hover" />}
      />
      <Explain
        id="5-029"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        phase="parts"
        title={<>selectOptions: เลือกจาก dropdown</>}
        body={<><C>{'user.selectOptions(select, "banana")'}</C>; ส่ง value, ข้อความ หรือ element ของ option ก็ได้</>}
        visual={<ExtraUserKit state="select" />}
      />
      <Explain
        id="5-030"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        phase="parts"
        title={<>upload: แนบไฟล์</>}
        body={<>สร้าง <C>File</C> ชื่อ <C>hello.png</C> แล้ว <C>user.upload(input, file)</C>; ตรวจ <C>input.files</C></>}
        visual={<ExtraUserKit state="upload" />}
      />
      <Explain
        id="5-031"
        section="เสริม: ท่าอื่นที่ใช้บ่อย"
        phase="parts"
        title={<>นับครั้งและล้างประวัติ</>}
        body={<><C>toHaveBeenCalledTimes(2)</C> นับ; <C>mockClear()</C> ล้างประวัติ; <C>mockReset()</C> ล้างและคืน implementation เดิม</>}
        visual={<ExtraUserKit state="times" />}
      />

      <Summary
        id="5-032"
        section="Closing"
        title={<>จบ Part 5 แล้วคุณทำได้</>}
        items={[
          <>คลิก/พิมพ์/ล้างด้วย setup + await</>,
          <>ตรวจ callback ด้วย vi.fn + not/calledWith</>,
          <>ใช้ keyboard/Tab/hover/select/upload</>,
          <>นับครั้งและล้าง mock</>,
        ]}
      />
      <Focus
        id="5-033"
        section="Closing"
        title={<>ต่อไป: หน้าที่รอข้อมูล</>}
        body={<>Part 6: หน้าโหลดช้าและ fetch — findBy, waitFor และ mock fetch</>}
      />
      <Sources
        id="5-034"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <><A href="https://testing-library.com/docs/user-event/intro">user-event — Intro</A></>,
          <><A href="https://testing-library.com/docs/user-event/setup">Setup</A></>,
          <><A href="https://testing-library.com/docs/user-event/convenience">Convenience</A></>,
          <><A href="https://testing-library.com/docs/user-event/utility">Utility</A></>,
          <><A href="https://testing-library.com/docs/user-event/keyboard">Keyboard</A></>,
          <><A href="https://vitest.dev/api/expect#tohavebeencalledwith">Vitest — expect</A></>,
          <><A href="https://vitest.dev/api/vi#vi-fn">Vitest — vi.fn</A></>,
          <><A href="https://vitest.dev/api/mock#mockclear">Vitest — mock</A></>,
          <><A href="https://github.com/testing-library/jest-dom#tohavefocus">jest-dom — toHaveFocus</A></>,
          <><A href="https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST/tree/solutions/lessons">repo lessons 08-10</A></>,
        ]}
      />
    </Deck>
  );
}
