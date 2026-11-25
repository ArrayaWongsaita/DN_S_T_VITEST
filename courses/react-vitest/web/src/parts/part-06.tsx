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
import { AsyncExtras, AsyncTrace, FetchSwitch, StateBranches } from '../visuals/part-06';
import { listings, meta, outputs } from './part-06.data';

export default function Part06() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="6-001"
        section="Opening"
        title={<>รอข้อมูลและปลอม fetch</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 6</P>
            <P>จากหน้าโหลด ถึง fetch ปลอม</P>
          </>
        }
      />
      <Objectives
        id="6-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>รอของที่ยังไม่มาด้วย <C>findBy</C>/<C>waitFor</C></>,
          <>ปลอม <C>fetch</C> ด้วย <C>spyOn</C></>,
          <>เทสสถานะพังและว่าง</>,
          <>รู้จัก fake timers, <C>stubGlobal</C>, MSW</>,
        ]}
      />
      <Focus
        id="6-003"
        section="Opening"
        title={<>ข้อมูลไม่ได้มาทันที</>}
        body={<>Part 1-5 ตรวจของที่อยู่แล้ว ตอนนี้หน้าโหลดของ — test ต้องรอให้ของมาถึงก่อนตรวจ</>}
        visual={<AsyncTrace state="hook" />}
      />

      <Topic
        id="6-004"
        section="รอของที่ยังไม่มา"
        title={<>รอของที่ยังไม่มา</>}
        body={<>findBy รอหา · waitFor รอตรวจ</>}
        visual={<AsyncTrace />}
      />
      <Explain
        id="6-005"
        section="รอของที่ยังไม่มา"
        phase="know"
        title={<>ข้อมูลมาหลัง render</>}
        body={<><C>useEffect</C> เรียก <C>loadUser()</C> แล้วรอ Promise; ระหว่างรอหน้าแสดง <C>กำลังโหลด...</C> เมื่อได้ชื่อจึงเปลี่ยนเป็น <C>Mali</C></>}
        visual={<AsyncTrace state="trace" />}
      />
      <Example
        id="6-006"
        section="รอของที่ยังไม่มา"
        phase="know"
        title={<>test เล็กสุด: รอ Mali</>}
        body={<><C>render</C> แล้ว <C>{'await findByText("Mali")'}</C><br />ระหว่างรอหน้าแสดง <C>กำลังโหลด...</C></>}
        snippet="min-async"
        lines={[[5, 11]]}
        highlight={[[9, 10]]}
      />
      <Explain
        id="6-007"
        section="รอของที่ยังไม่มา"
        phase="parts"
        title={<>findByText: รอจนของมา</>}
        body={<><C>await screen.findByText("Mali")</C> ลองหาใหม่ทุก 50ms จนเจอ หรือครบ 1 วินาทีแล้ว throw</>}
        visual={<AsyncTrace state="findBy" />}
      />
      <Explain
        id="6-008"
        section="รอของที่ยังไม่มา"
        phase="parts"
        title={<>waitFor: รอให้ทั้งก้อนผ่าน</>}
        body={<><C>await waitFor(() =&gt; expect(...))</C> ตรวจซ้ำทั้งก้อนจนผ่านหรือหมดเวลา — ใช้เมื่อเงื่อนไขมีหลายขั้น</>}
        visual={<AsyncTrace state="waitFor" />}
      />
      <Example
        id="6-009"
        section="รอของที่ยังไม่มา"
        phase="example"
        title={<>รอให้กำลังโหลดหายไป</>}
        body={<>บท 11 ข้อ 3: ตรวจว่า <C>กำลังโหลด...</C> หายไป</>}
        snippet="min-wait"
        lines={[[5, 13]]}
        highlight={[[9, 12]]}
      />
      <Error
        id="6-010"
        section="รอของที่ยังไม่มา"
        phase="watchout"
        title={<>getByText ก่อนของมา</>}
        cause={<><C>{'getByText("Mali")'}</C> ทันทีหลัง render</>}
        fix={<><C>{'await findByText("Mali")'}</C></>}
        symptom={<><C>{'Unable to find an element with the text: Mali.'}</C><br />DOM: <C>กำลังโหลด...</C></>}
        visual={<AsyncTrace state="miss" />}
      />

      <Topic
        id="6-011"
        section="ปลอม fetch"
        title={<>ปลอม fetch</>}
        body={<>สลับ fetch จริงเป็น fetch ปลอม</>}
        visual={<FetchSwitch />}
      />
      <Explain
        id="6-012"
        section="ปลอม fetch"
        phase="know"
        title={<>test ไม่ควรยิง API จริง</>}
        body={<><C>PostList</C> เรียก <C>fetch("/api/posts")</C>; test สลับ <C>fetch</C> เป็นตัวปลอมที่คืนข้อมูลที่เรากำหนด ทันทีและไม่มี network</>}
        visual={<FetchSwitch state="trace" />}
      />
      <Example
        id="6-013"
        section="ปลอม fetch"
        phase="know"
        title={<>test เล็กสุด: เห็นโพสต์จาก fetch ปลอม</>}
        body={<>ปลอม Response แล้วรอโพสต์ขึ้นหน้า</>}
        snippet="min-fetch"
        lines={[[9, 19]]}
        highlight={[[17, 18]]}
      />
      <Explain
        id="6-014"
        section="ปลอม fetch"
        phase="parts"
        title={<>vi.spyOn: ดักฟังก์ชันเดิม</>}
        body={<><C>{'vi.spyOn(globalThis, "fetch")'}</C> เปลี่ยน <C>fetch</C> ให้เป็น spy ที่เราควบคุมได้ และยังเก็บว่าถูกเรียกด้วยอะไร</>}
        visual={<FetchSwitch state="spy" />}
      />
      <Explain
        id="6-015"
        section="ปลอม fetch"
        phase="parts"
        title={<>mockResolvedValue: กำหนดคำตอบ</>}
        body={<><C>.mockResolvedValue(fake)</C> ให้ fetch คืน Response ปลอมทุกครั้ง — component เรียก <C>json()</C>; ถ้าตรวจ <C>ok</C> ก็ต้องใส่ <C>ok</C> ด้วย</>}
        visual={<FetchSwitch state="mock" />}
      />
      <Explain
        id="6-016"
        section="ปลอม fetch"
        phase="parts"
        title={<>restoreAllMocks: คืน fetch จริง</>}
        body={<><C>afterEach(() =&gt; vi.restoreAllMocks())</C> คืนของจริงหลังทุก test ไม่งั้น fetch ปลอมรั่วไป test ถัดไป</>}
        visual={<FetchSwitch state="restore" />}
      />
      <Example
        id="6-017"
        section="ปลอม fetch"
        phase="example"
        title={<>ตรวจว่า fetch ถูกเรียกด้วย URL อะไร</>}
        body={<>บท 12 ข้อ 2: เก็บ spy ไว้ แล้วตรวจ URL</>}
        snippet="min-called"
        lines={[[9, 19]]}
        highlight={[[16, 18]]}
      />
      <Error
        id="6-018"
        section="ปลอม fetch"
        phase="watchout"
        title={<>mock คืน array ตรง ๆ</>}
        cause={<><C>{'mockResolvedValue([...])'}</C> ไม่มี <C>json()</C></>}
        fix={<>คืน Response มี <C>ok: true</C> และ <C>json()</C></>}
        symptom={<><C>TypeError: res.json is not a function</C><br />หน้าไม่ขึ้น</>}
        visual={<FetchSwitch state="miss" />}
      />

      <Topic
        id="6-019"
        section="สถานะพังและว่าง"
        title={<>สถานะพังและว่าง</>}
        body={<>สำเร็จ · พัง · ไม่มีข้อมูล</>}
        visual={<StateBranches />}
      />
      <Explain
        id="6-020"
        section="สถานะพังและว่าง"
        phase="know"
        title={<>หน้าเดียวมีหลายสถานะ</>}
        body={<><C>SafePostList</C> แยกสี่ทาง: กำลังโหลด, โหลดพัง, ไม่มีโพสต์, มีโพสต์ — test ที่ดีต้องเห็นทุกทางที่ผู้ใช้เห็น</>}
        visual={<StateBranches state="trace" />}
      />
      <Explain
        id="6-021"
        section="สถานะพังและว่าง"
        phase="parts"
        title={<>mockRejectedValue: fetch พัง</>}
        body={<><C>{'mockRejectedValue(new Error("network"))'}</C> ทำให้ promise reject; หน้าแสดง alert <C>โหลดไม่สำเร็จ</C></>}
        visual={<StateBranches state="rejected" />}
      />
      <Explain
        id="6-022"
        section="สถานะพังและว่าง"
        phase="parts"
        title={<>array ว่าง: ไม่มีโพสต์</>}
        body={<><C>json: async () =&gt; []</C> ทำให้ <C>posts.length === 0</C>; หน้าแสดง <C>ยังไม่มีโพสต์</C> ไม่ใช่ลิสต์ว่าง</>}
        visual={<StateBranches state="empty" />}
      />
      <Explain
        id="6-023"
        section="สถานะพังและว่าง"
        phase="parts"
        title={<>กรณีปกติ: มีลิสต์ ไม่มี alert</>}
        body={<><C>findByText("โพสต์แรก")</C> แล้ว <C>queryByRole("alert")</C> ต้องเป็น null — ตรวจทั้งของที่มาและของที่ต้องไม่มา</>}
        visual={<StateBranches state="normal" />}
      />
      <Example
        id="6-024"
        section="สถานะพังและว่าง"
        phase="example"
        title={<>fetch พัง ต้องเห็น alert</>}
        body={<>บท 13 ข้อ 1: รอ alert แล้วตรวจข้อความ</>}
        snippet="min-error"
        lines={[[9, 17]]}
        highlight={[[14, 16]]}
      />
      <Error
        id="6-025"
        section="สถานะพังและว่าง"
        phase="watchout"
        title={<>ลืม ok: true ใน Response ปลอม</>}
        cause={<>Response ไม่มี <C>ok</C></>}
        fix={<>ใส่ <C>ok: true</C> ใน Response ปลอม</>}
        symptom={<><C>{'Unable to find an element with the text: โพสต์แรก'}</C><br /><C>โหลดไม่สำเร็จ</C></>}
        visual={<StateBranches state="miss" />}
      />

      <Topic
        id="6-026"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        title={<>เสริม: ท่าอื่นของ async</>}
        body={<>รอของหาย · เลื่อนเวลา · สลับ global · MSW · act</>}
        visual={<AsyncExtras />}
      />
      <Explain
        id="6-027"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        phase="know"
        title={<>ห้าท่าที่ต่อจาก findBy/fetch</>}
        body={<>1 <C>waitForElementToBeRemoved</C> · 2 fake timers · 3 <C>vi.stubGlobal</C> · 4 MSW · 5 act warning</>}
        visual={<AsyncExtras state="map" />}
      />
      <Explain
        id="6-028"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        phase="parts"
        title={<>waitForElementToBeRemoved: รอของหาย</>}
        body={<>ส่ง element หรือ callback ที่คืน element; resolve เมื่อมันถูกเอาออกจาก DOM — element ต้องมีอยู่ก่อน</>}
        visual={<AsyncExtras state="removed" />}
      />
      <Explain
        id="6-029"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        phase="parts"
        title={<>fake timers: เลื่อนเวลาเอง</>}
        body={<><C>vi.useFakeTimers()</C> แล้ว <C>vi.advanceTimersByTime(1000)</C> ใน <C>act</C>; จบแล้ว <C>vi.useRealTimers()</C></>}
        visual={<AsyncExtras state="timers" />}
      />
      <Explain
        id="6-030"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        phase="parts"
        title={<>vi.stubGlobal: สลับ global ทั้งตัว</>}
        body={<><C>{'vi.stubGlobal("fetch", fake)'}</C> เปลี่ยน global ทั้งตัว แล้ว <C>vi.unstubAllGlobals()</C> คืนค่าเดิม — ต่างจาก <C>spyOn</C> ที่ห่อฟังก์ชันเดิม</>}
        visual={<AsyncExtras state="stub" />}
      />
      <Explain
        id="6-031"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        phase="parts"
        title={<>MSW: ปลอมที่ชั้น network</>}
        body={<><C>setupServer(...handlers)</C> ดัก request จริง; <C>listen</C> ก่อน test, <C>resetHandlers</C> ระหว่าง, <C>close</C> ตอนจบ — เหมาะเมื่อ API หลายตัว</>}
        visual={<AsyncExtras state="msw" />}
      />
      <Explain
        id="6-032"
        section="เสริม: ห้าท่าที่ต่อจาก findBy/fetch"
        phase="parts"
        title={<>act warning: รอไม่ถูกจังหวะ</>}
        body={<>บางโปรเจกต์เห็น <C>not wrapped in act(...)</C> = state เปลี่ยนนอก act เพราะไม่รอ promise/timer; repo นี้ไม่ขึ้น — แก้ด้วย <C>findBy</C>/<C>waitFor</C></>}
        visual={<AsyncExtras state="act" />}
      />

      <Summary
        id="6-033"
        section="Closing"
        title={<>จบ Part 6 แล้วคุณทำได้</>}
        items={[
          <><C>findBy</C>/<C>waitFor</C> รอของที่มาทีหลัง</>,
          <><C>spyOn</C> + <C>mockResolvedValue</C> ปลอม fetch</>,
          <><C>mockRejectedValue</C> กับ array ว่างเทสพัง/ว่าง</>,
          <>รู้จัก extras อีกห้าท่า</>,
        ]}
      />
      <Focus
        id="6-034"
        section="Closing"
        title={<>ต่อไป: หลาย component และ context</>}
        body={<>Part 7: ประกอบ TodoApp, custom render + wrapper และ rerender</>}
      />
      <Sources
        id="6-035"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <><A href="https://testing-library.com/docs/dom-testing-library/api-async">Testing Library — Async Methods</A></>,
          <><A href="https://testing-library.com/docs/using-fake-timers">Using Fake Timers</A></>,
          <><A href="https://vitest.dev/api/vi">Vitest — vi</A></>,
          <><A href="https://vitest.dev/api/mock">Vitest — Mock</A></>,
          <><A href="https://mswjs.io/docs/integrations/node/">MSW — Node integration</A></>,
          <>repo lessons 11-13</>,
        ]}
      />
    </Deck>
  );
}
