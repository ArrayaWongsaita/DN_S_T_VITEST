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
import { CourseClose, FormFlow, RouterMock } from '../visuals/part-08';
import { listings, meta, outputs } from './part-08.data';

export default function Part08() {
  return (
    <Deck meta={meta} diagrams={{}} listings={listings} outputs={outputs}>
      <Cover
        id="8-001"
        section="Opening"
        title={<>ฟอร์มและ Next.js</>}
        body={
          <>
            <P>เทส React ด้วย Vitest · Part 8</P>
            <P>จาก validation ถึง vi.mock</P>
          </>
        }
      />
      <Objectives
        id="8-002"
        section="Opening"
        title={<>จบ Part นี้แล้วคุณจะ…</>}
        items={[
          <>เทสฟอร์มทางผ่านและทาง error</>,
          <>ตรวจ <C>onSubmit</C> ด้วย <C>vi.fn()</C></>,
          <>ปลอม <C>next/navigation</C> ด้วย <C>vi.mock</C> + <C>vi.hoisted</C></>,
          <>รู้จัก snapshot, coverage, CI, ต่อยอด</>,
        ]}
      />
      <Focus
        id="8-003"
        section="Opening"
        title={<>สองเรื่องที่เจอในแอปจริง</>}
        body={<>ฟอร์มที่ตรวจก่อนส่ง และปุ่มที่พาไปหน้าอื่น — ทั้งคู่มีทางแยกที่ test ต้องเดินให้ครบ</>}
        visual={<FormFlow state="hook" />}
      />

      <Topic
        id="8-004"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        title={<>ฟอร์มที่ตรวจก่อนส่ง</>}
        body={<>พิมพ์ → ตรวจ → ผ่านหรือ error</>}
        visual={<FormFlow />}
      />
      <Explain
        id="8-005"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="know"
        title={<>ฟอร์มตรวจก่อนเรียก onSubmit</>}
        body={<><C>LoginForm</C> เก็บอีเมลกับรหัสผ่าน; กดปุ่มแล้วตรวจทุกกฎ — ผ่านจึงเรียก <C>onSubmit</C>, ไม่ผ่านจึงแสดง error</>}
        visual={<FormFlow state="trace" />}
      />
      <Example
        id="8-006"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="know"
        title={<>test เล็กสุด: กรอกถูกแล้วส่งได้</>}
        body={<><C>getByLabelText</C> หาสองช่อง, <C>user.type</C> พิมพ์, click ปุ่ม แล้วตรวจว่า <C>onSubmit</C> ถูกเรียกพร้อมค่า</>}
        snippet="min-form"
        lines={[[6, 14]]}
        highlight={[[13, 13]]}
      />
      <Explain
        id="8-007"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="parts"
        title={<>ช่องกรอก: label คือที่จับ</>}
        body={<><C>{'getByLabelText("อีเมล")'}</C> หา input จาก label ที่ผูก <C>htmlFor</C>; <C>user.type</C> พิมพ์ทีละตัว; ค่าถูกเก็บใน state ของฟอร์ม</>}
        visual={<FormFlow state="field" />}
      />
      <Explain
        id="8-008"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="parts"
        title={<>ประตูตรวจ: สองกฎตัดสินก่อนส่ง</>}
        body={<>อีเมลต้องมี <C>@</C> และ <C>.</C>; รหัสผ่านอย่างน้อย 8 ตัว; ผิดข้อไหนก็เพิ่มข้อความนั้นลงรายการ error</>}
        visual={<FormFlow state="rules" />}
      />
      <Explain
        id="8-009"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="parts"
        title={<>ทางออก: alert หรือ onSubmit</>}
        body={<>ไม่ผ่าน → <C>{'<p role="alert">'}</C> ต่อรายการ; ผ่าน → <C>{'onSubmit({ email, password })'}</C>; test ตรวจทั้งข้อความและจำนวนครั้งที่เรียก</>}
        visual={<FormFlow state="exits" />}
      />
      <Example
        id="8-010"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="example"
        title={<>อีเมลผิด: เห็น alert และไม่ส่ง</>}
        body={<>กรอกรหัสผ่านให้ถูกเพื่อให้เหลือ error เดียว; <C>{'getByRole("alert")'}</C> อ่านข้อความ; <C>onSubmit</C> ต้องไม่ถูกเรียก</>}
        snippet="form-error"
        lines={[[6, 15]]}
        highlight={[[13, 14]]}
      />
      <Error
        id="8-011"
        section="ฟอร์มที่ตรวจก่อนส่ง"
        phase="watchout"
        title={<>ผิดสองช่อง แล้วหา alert ตรง ๆ</>}
        cause={<><C>{'getByRole("alert")'}</C> เจอสองอัน</>}
        fix={<>กรอกอีกช่องให้ถูก → เหลือ alert เดียว</>}
        symptom={<><C>{'Found multiple elements with the role "alert"'}</C></>}
        visual={<FormFlow state="miss" />}
      />

      <Topic
        id="8-012"
        section="ปลอม next/navigation"
        title={<>ปลอม next/navigation</>}
        body={<>สลับ router จริงเป็น router ปลอม</>}
        visual={<RouterMock />}
      />
      <Explain
        id="8-013"
        section="ปลอม next/navigation"
        phase="know"
        title={<>useRouter ต้องมี app router ของ Next</>}
        body={<><C>SaveAndGo</C> เรียก <C>useRouter()</C>; ใน Vitest ไม่มี app router ให้ใช้ — ต้องสลับโมดูล <C>next/navigation</C> เป็นของปลอมก่อน import</>}
        visual={<RouterMock state="trace" />}
      />
      <Example
        id="8-014"
        section="ปลอม next/navigation"
        phase="know"
        title={<>test เล็กสุด: กดแล้ว back ถูกเรียก</>}
        body={<>ด้านบนมี <C>vi.mock</C> + <C>vi.hoisted</C>; test เพียง render, click แล้วตรวจ <C>back</C> หนึ่งครั้ง</>}
        snippet="min-nav"
        lines={[[6, 15]]}
        highlight={[[14, 14]]}
      />
      <Explain
        id="8-015"
        section="ปลอม next/navigation"
        phase="parts"
        title={<>vi.mock: สลับทั้งโมดูล</>}
        body={<>อาร์กิวเมนต์ที่สองของ <C>vi.mock</C> เป็นฟังก์ชันที่คืน <C>{'{ useRouter: () => ({ push, back }) }'}</C>; component ที่ import จะได้ของปลอมนี้ทุกครั้ง</>}
        visual={<RouterMock state="mock" />}
      />
      <Explain
        id="8-016"
        section="ปลอม next/navigation"
        phase="parts"
        title={<>vi.hoisted: สร้าง spies ก่อน vi.mock ทำงาน</>}
        body={<><C>vi.mock</C> ถูกยกขึ้นเหนือ import; <C>vi.hoisted</C> สร้าง spy ก่อน จึงใช้ใน <C>vi.mock</C> ได้</>}
        visual={<RouterMock state="hoist" />}
      />
      <Explain
        id="8-017"
        section="ปลอม next/navigation"
        phase="parts"
        title={<>spies: ตรวจว่า router ถูกสั่งอะไร</>}
        body={<><C>{'toHaveBeenCalledWith("/done")'}</C>, <C>toHaveBeenCalledTimes(1)</C>; Vitest ล้างประวัติ mock ก่อนทุก test (<C>clearMocks</C> = true)</>}
        visual={<RouterMock state="assert" />}
      />
      <Example
        id="8-018"
        section="ปลอม next/navigation"
        phase="example"
        title={<>กดบันทึก: push(&quot;/done&quot;)</>}
        body={<><C>SaveAndGo</C> เรียก <C>{'router.push("/done")'}</C>; test ตรวจ argument ที่ส่งเข้า <C>push</C></>}
        snippet="save-go"
        lines={[[6, 15]]}
        highlight={[[14, 14]]}
      />
      <Error
        id="8-019"
        section="ปลอม next/navigation"
        phase="watchout"
        title={<>ลืม mock: ไม่มี app router</>}
        cause={<><C>render</C> โดยไม่ <C>vi.mock</C></>}
        fix={<><C>{'vi.mock("next/navigation", ...)'}</C> ก่อน import</>}
        symptom={<><C>Error: invariant expected app router to be mounted</C></>}
        visual={<RouterMock state="miss" />}
      />

      <Topic
        id="8-020"
        section="เสริม: เก็บตกและก้าวต่อไป"
        title={<>เสริม: เก็บตกและก้าวต่อไป</>}
        body={<>snapshot · coverage · CI · cheatsheet · ต่อยอด</>}
        visual={<CourseClose />}
      />
      <Explain
        id="8-021"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="know"
        title={<>ห้าอย่างที่ต่อจากแกนหลัก</>}
        body={<>1 snapshot · 2 coverage · 3 CI · 4 cheatsheet · 5 ต่อยอด — รู้ไว้ว่ามีอะไร จะได้ไปถูก</>}
        visual={<CourseClose state="map" />}
      />
      <Explain
        id="8-022"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="parts"
        title={<>snapshot: บันทึกหน้าตาไว้เทียบ</>}
        body={<><C>expect(container).toMatchSnapshot()</C> เก็บ DOM ลง <C>.snap</C>; ครั้งแรก <C>Snapshots 1 written</C>; ครั้งต่อไปเทียบทั้งก้อน</>}
        visual={<CourseClose state="snapshot" />}
      />
      <Explain
        id="8-023"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="parts"
        title={<>coverage: ดูว่าส่วนไหนยังไม่ถูกเทส</>}
        body={<><C>vitest run --coverage</C> ต้องมี <C>@vitest/coverage-v8</C>; ตารางบอก % Stmts/Branch/Funcs/Lines และบรรทัดที่ยังไม่ถูกแตะ</>}
        visual={<CourseClose state="coverage" />}
      />
      <Explain
        id="8-024"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="parts"
        title={<>CI: ให้เครื่องรัน test ทุก push</>}
        body={<>GitHub Actions: checkout โค้ด → pnpm + Node → <C>pnpm install --frozen-lockfile</C> → <C>pnpm test</C>; ทุก push/PR ได้ผล test</>}
        visual={<CourseClose state="ci" />}
      />
      <Explain
        id="8-025"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="parts"
        title={<>cheatsheet: หกคำถามก่อนเขียน test</>}
        body={<>ต้องมี → <C>getBy</C> · ต้องไม่มี → <C>queryBy</C> · จะมา → <C>findBy</C> · ตรวจอะไร → matcher; ใครทำ → <C>user-event</C>; อะไรปลอม → <C>vi</C></>}
        visual={<CourseClose state="cheatsheet" />}
      />
      <Explain
        id="8-026"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="parts"
        title={<>ต่อยอด: Browser Mode และ Server Component</>}
        body={<>Browser Mode รันในเบราว์เซอร์จริง; async Server Component ยังไม่รองรับใน RTL — Next แนะนำ E2E (เทสทั้ง flow)</>}
        visual={<CourseClose state="next" />}
      />
      <Error
        id="8-027"
        section="เสริม: เก็บตกและก้าวต่อไป"
        phase="watchout"
        title={<>snapshot ผ่านทั้งที่หน้าจอผิด</>}
        cause={<>แก้ UI แล้วกด <C>-u</C> (อัปเดต snap) โดยไม่ดู diff</>}
        fix={<>อ่าน diff ก่อน</>}
        symptom={<><C>Snapshots 1 updated</C><br /><C>Tests 1 passed (1)</C></>}
        visual={<CourseClose state="miss" />}
      />

      <Summary
        id="8-028"
        section="Closing"
        title={<>จบ Part 8 แล้วคุณทำได้</>}
        items={[
          <>เทสฟอร์ม: ผ่าน → <C>onSubmit</C>, ผิด → <C>{'role="alert"'}</C></>,
          <>ปลอม router ด้วย <C>vi.mock</C> + <C>vi.hoisted</C></>,
          <>snapshot/coverage/CI + ข้อควรระวัง</>,
          <>เห็นทางไปต่อ</>,
        ]}
      />
      <Focus
        id="8-029"
        section="Closing"
        title={<>จบคอร์สแล้ว — ไปต่อที่ไหน</>}
        body={<>เอา repo ไปเขียน test ของหน้าจริง, เปิด CI, ลอง Browser Mode; เจอของใหม่ก็กลับไปอ่าน docs</>}
      />
      <Sources
        id="8-030"
        section="Closing"
        title={<>แหล่งอ่านต่อ</>}
        items={[
          <><A href="https://vitest.dev/api/vi#vi-hoisted">Vitest — vi.mock &amp; hoisted</A></>,
          <><A href="https://vitest.dev/guide/snapshot">Vitest — snapshot</A></>,
          <><A href="https://vitest.dev/guide/coverage">Vitest — coverage</A></>,
          <><A href="https://vitest.dev/guide/browser/why">Vitest — browser</A></>,
          <><A href="https://testing-library.com/docs/queries/about">Testing Library</A></>,
          <><A href="https://nextjs.org/docs/app/api-reference/functions/use-router">Next.js — useRouter</A></>,
          <><A href="https://nextjs.org/docs/app/guides/testing">Next.js — testing</A></>,
          <>repo 16-17</>,
        ]}
      />
    </Deck>
  );
}
