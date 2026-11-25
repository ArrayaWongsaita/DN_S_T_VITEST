import { roleColour, SketchArrow, SketchEllipse, SketchLine, SketchRect } from '../components';

const ink = '#2b2b2b';
const muted = '#646464';
const pale = '#b5b5b5';
const ghost = '#8a8a8a';
const accent = roleColour('accent');
const success = roleColour('success');
const danger = roleColour('danger');

type LabelProps = {
  x: number;
  y: number;
  children: string;
  size?: number;
  fill?: string;
  weight?: number;
  anchor?: 'start' | 'middle' | 'end';
  mono?: boolean;
};

function Label({ x, y, children, size = 16, fill = ink, weight, anchor = 'middle', mono }: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={size}
      fill={fill}
      fontWeight={weight}
      fontFamily={mono ? 'var(--rs-mono)' : 'var(--rs-font)'}
    >
      {children}
    </text>
  );
}

type BoxProps = {
  seed: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  note?: string;
  size?: number;
  lit?: boolean;
  good?: boolean;
  bad?: boolean;
  dim?: boolean;
  dashed?: boolean;
  mono?: boolean;
};

function Box({ seed, x, y, w, h, label, note, size = 16, lit, good, bad, dim, dashed, mono }: BoxProps) {
  const stroke = bad ? danger : good ? success : lit ? accent : dim ? pale : ink;
  const fill = bad ? danger : good ? success : lit ? accent : dim ? ghost : ink;
  const labelY = note ? y + h / 2 - 12 : y + h / 2;
  return (
    <g>
      <SketchRect seedKey={seed} x={x} y={y} w={w} h={h} rounded stroke={stroke} strokeWidth={lit || good || bad ? 2.5 : 1.6} dashed={dashed} />
      <Label x={x + w / 2} y={labelY} size={size} fill={fill} weight={lit || good || bad ? 600 : undefined} mono={mono}>
        {label}
      </Label>
      {note ? (
        <Label x={x + w / 2} y={labelY + 26} size={size} fill={bad ? danger : muted} mono={mono}>
          {note}
        </Label>
      ) : null}
    </g>
  );
}

type FormState = 'hook' | 'full' | 'trace' | 'field' | 'rules' | 'exits' | 'miss';

/** A login form checks two rules before it sends; the test walks the pass path or reads the alerts. */
export function FormFlow({ state = 'full' }: { state?: FormState }) {
  const hook = state === 'hook';
  const trace = state === 'trace';
  const field = state === 'field';
  const rules = state === 'rules';
  const exits = state === 'exits';
  const miss = state === 'miss';
  const focused = state !== 'full' && !hook;
  const dim = (lit: boolean) => (focused && !lit ? 0.28 : 1);
  const formLit = field || trace;
  const gateLit = rules || trace;
  const okLit = trace || exits;
  const alertLit = exits;
  const formGroup = hook ? 1 : dim(formLit);
  const gateGroup = miss ? 1 : hook ? 1 : dim(gateLit);

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ฟอร์มเข้าสู่ระบบสองช่อง ลูกศรไปประตูตรวจสองกฎ แล้วแยกเป็น alert เมื่อไม่ผ่าน หรือ onSubmit เมื่อผ่าน"
      fontFamily="var(--rs-font)"
    >
      <g opacity={miss ? 0.55 : dim(false)}>
        <SketchRect seedKey="form/test" x={12} y={64} w={118} h={126} rounded stroke={trace ? accent : pale} strokeWidth={trace ? 2.2 : 1.6} />
        <Label x={71} y={82} fill={muted}>test</Label>
        <Label x={32} y={110} anchor="start" mono fill={trace ? accent : muted}>type</Label>
        <Label x={32} y={136} anchor="start" mono fill={trace ? accent : muted}>type</Label>
        <Label x={32} y={162} anchor="start" mono fill={trace ? accent : muted}>click</Label>
      </g>
      <SketchArrow seedKey="form/test-arrow" x1={130} y1={127} x2={140} y2={127} stroke={hook || trace ? accent : pale} strokeWidth={hook || trace ? 2.4 : 1.5} />

      <g opacity={formGroup}>
        <SketchRect seedKey="form/card" x={140} y={40} w={150} h={204} rounded stroke={formLit ? accent : ink} strokeWidth={formLit ? 2.5 : 1.7} />
        <Label x={215} y={58} fill={formLit ? accent : ink} weight={formLit ? 600 : undefined}>ฟอร์มเข้าสู่ระบบ</Label>

        <Label x={152} y={86} anchor="start" fill={formLit ? accent : ink}>อีเมล</Label>
        <SketchRect seedKey="form/email" x={152} y={100} w={126} h={26} rounded stroke={formLit ? accent : ink} strokeWidth={formLit ? 2.2 : 1.5} />
        <Label x={215} y={113} mono fill={trace ? accent : miss ? danger : muted}>{trace ? 'a@b.co' : miss ? 'abc' : ''}</Label>

        <Label x={152} y={142} anchor="start" fill={formLit ? accent : ink}>รหัสผ่าน</Label>
        <SketchRect seedKey="form/password" x={152} y={156} w={126} h={26} rounded stroke={formLit ? accent : ink} strokeWidth={formLit ? 2.2 : 1.5} />
        <Label x={215} y={169} mono fill={trace ? accent : miss ? danger : muted}>{trace ? '••••••••' : miss ? '123' : ''}</Label>

        <Box seed="form/button" x={152} y={192} w={126} h={28} label="เข้าสู่ระบบ" lit={trace} />
      </g>

      <SketchArrow seedKey="form/to-gate" x1={290} y1={79} x2={305} y2={79} stroke={gateLit ? accent : pale} strokeWidth={gateLit ? 2.4 : 1.5} />

      <g opacity={gateGroup}>
        <SketchRect seedKey="form/gate" x={305} y={40} w={145} h={94} rounded stroke={miss ? danger : gateLit ? accent : ink} strokeWidth={miss || gateLit ? 2.5 : 1.7} />
        <Label x={377} y={58} fill={miss ? danger : gateLit ? accent : ink} weight={miss || gateLit ? 600 : undefined}>ประตูตรวจ</Label>
        <Label x={314} y={82} anchor="start" fill={miss ? danger : ink}>อีเมล: @ และ .</Label>
        <Label x={314} y={108} anchor="start" fill={miss ? danger : ink}>รหัสผ่าน ≥ 8</Label>
        {trace ? (
          <>
            <Label x={442} y={82} fill={success} weight={600}>✓</Label>
            <Label x={442} y={108} fill={success} weight={600}>✓</Label>
          </>
        ) : null}
        {miss ? (
          <>
            <Label x={442} y={82} fill={danger} weight={600}>×</Label>
            <Label x={442} y={108} fill={danger} weight={600}>×</Label>
          </>
        ) : null}
      </g>

      {!miss ? (
        <>
          <SketchArrow seedKey="form/to-alert" x1={330} y1={134} x2={330} y2={145} stroke={alertLit ? danger : state === 'full' ? danger : pale} strokeWidth={alertLit ? 2.2 : 1.5} />
          <SketchArrow seedKey="form/to-ok" x1={410} y1={134} x2={410} y2={145} stroke={okLit ? accent : state === 'full' ? ink : pale} strokeWidth={okLit ? 2.4 : 1.5} />
          <g opacity={hook ? 0.28 : dim(alertLit)}>
            <Box seed="form/alert" x={296} y={145} w={68} h={52} label="alert" note="role" bad />
          </g>
          <g opacity={hook ? 0.28 : dim(okLit)}>
            <Box seed="form/ok" x={370} y={145} w={80} h={52} label="onSubmit" note="ส่งค่า" size={15} lit={okLit} />
            <SketchArrow seedKey="form/to-spy" x1={410} y1={197} x2={410} y2={208} stroke={okLit ? accent : state === 'full' ? ink : pale} strokeWidth={okLit ? 2.4 : 1.5} />
            <Box seed="form/spy" x={370} y={208} w={80} h={50} label="spy" note="✓ 1 ครั้ง" lit={okLit} />
          </g>
          <g opacity={hook || (focused && !alertLit) ? 0.28 : 1}>
            <SketchLine seedKey="form/back-1" x1={330} y1={197} x2={330} y2={258} stroke={danger} strokeWidth={1.8} dashed />
            <SketchLine seedKey="form/back-2" x1={330} y1={258} x2={215} y2={258} stroke={danger} strokeWidth={1.8} dashed />
            <SketchArrow seedKey="form/back-3" x1={215} y1={258} x2={215} y2={246} stroke={danger} strokeWidth={1.8} dashed />
            <Label x={273} y={274} fill={danger}>กลับไปแก้</Label>
          </g>
        </>
      ) : (
        <g>
          <Box seed="form/alert-1" x={304} y={145} w={146} h={50} label="email ผิด" note='role="alert"' bad />
          <Box seed="form/alert-2" x={304} y={199} w={146} h={50} label="รหัสผ่านสั้น" note='role="alert"' bad />
          <SketchLine seedKey="form/query-1" x1={71} y1={190} x2={71} y2={300} stroke={danger} strokeWidth={2} />
          <SketchLine seedKey="form/query-2" x1={71} y1={300} x2={296} y2={300} stroke={danger} strokeWidth={2} />
          <SketchLine seedKey="form/query-3" x1={296} y1={300} x2={296} y2={170} stroke={danger} strokeWidth={2} />
          <SketchArrow seedKey="form/query-4" x1={296} y1={170} x2={304} y2={170} stroke={danger} strokeWidth={2} />
          <SketchArrow seedKey="form/query-5" x1={296} y1={224} x2={304} y2={224} stroke={danger} strokeWidth={2} />
          <Label x={300} y={194} size={18} fill={danger} weight={600}>×</Label>
        </g>
      )}
    </svg>
  );
}

type RouterState = 'full' | 'trace' | 'mock' | 'hoist' | 'assert' | 'miss';

/** next/navigation is replaced by a fake module; push and back are spies the test can inspect. */
export function RouterMock({ state = 'full' }: { state?: RouterState }) {
  const trace = state === 'trace';
  const mock = state === 'mock';
  const hoist = state === 'hoist';
  const assert = state === 'assert';
  const miss = state === 'miss';
  const focused = state !== 'full' && !miss;
  const dim = (lit: boolean) => (focused && !lit ? 0.28 : 1);
  const fakeSide = !miss;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="component เรียก useRouter จาก next/navigation; vi.mock สลับโมดูลเป็น router ปลอมที่ push และ back เป็น spy; ถ้าไม่ mock จะไม่มี app router"
      fontFamily="var(--rs-font)"
    >
      <g opacity={dim(hoist)}>
        <SketchRect seedKey="router/hoist" x={12} y={12} w={438} h={32} rounded stroke={hoist ? accent : pale} strokeWidth={hoist ? 2.4 : 1.4} dashed />
        <Label x={231} y={28} fill={hoist ? accent : muted} mono>vi.mock ถูกยกขึ้นก่อน import</Label>
      </g>
      <g opacity={dim(hoist)}>
        <Box seed="router/hoisted" x={12} y={50} w={128} h={44} label="vi.hoisted" lit={hoist} />
      </g>

      <g opacity={miss ? 1 : dim(trace || mock)}>
        <SketchRect seedKey="router/page" x={12} y={104} w={128} h={136} rounded stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.7} />
        <Label x={76} y={122} fill={trace ? accent : ink}>Client</Label>
        <Label x={76} y={148} fill={trace ? accent : ink}>Component</Label>
        <Box seed="router/save" x={28} y={180} w={96} h={30} label="บันทึก" lit={trace} />
      </g>
      <SketchArrow seedKey="router/click" x1={124} y1={195} x2={148} y2={160} stroke={trace ? accent : miss ? danger : pale} strokeWidth={trace || miss ? 2.4 : 1.5} />

      <g opacity={dim(mock || trace)}>
        <SketchRect seedKey="router/module" x={146} y={104} w={158} h={64} rounded stroke={mock || trace ? accent : miss ? danger : ink} strokeWidth={mock || trace || miss ? 2.4 : 1.7} dashed={miss} />
        <Label x={225} y={122} fill={mock || trace ? accent : miss ? danger : ink} weight={mock || trace ? 600 : undefined}>โมดูล</Label>
        <Label x={225} y={144} mono fill={mock || trace ? accent : muted}>next/navigation</Label>
      </g>

      <g opacity={dim(mock || trace)}>
        <Label x={223} y={242} fill={muted}>สลับ</Label>
        <SketchLine seedKey="router/lever" x1={223} y1={184} x2={fakeSide ? 260 : 186} y2={188} stroke={miss ? danger : mock ? accent : ink} strokeWidth={2.2} />
        <SketchEllipse seedKey="router/pivot" cx={223} cy={184} w={8} h={8} stroke={miss ? danger : mock ? accent : ink} strokeWidth={1.6} />
        <Box seed="router/real" x={156} y={188} w={60} h={32} label="ของจริง" bad={miss} dim={fakeSide} />
        <Box seed="router/fake" x={230} y={188} w={60} h={32} label="ของปลอม" lit={fakeSide} dim={!fakeSide} />
      </g>

      <g opacity={miss ? 0.28 : dim(mock || trace || assert)}>
        <SketchRect seedKey="router/fake-card" x={312} y={88} w={138} h={80} rounded stroke={mock || trace ? accent : ink} strokeWidth={mock || trace ? 2.4 : 1.7} />
        <Label x={381} y={106} mono fill={mock || trace ? accent : ink}>useRouter()</Label>
        <Label x={381} y={132} mono fill={mock || trace ? accent : muted}>{'{ push, back }'}</Label>
        <SketchArrow seedKey="router/to-fake" x1={304} y1={136} x2={312} y2={124} stroke={mock || trace ? accent : pale} strokeWidth={mock || trace ? 2.4 : 1.5} />
      </g>

      <SketchArrow seedKey="router/to-push" x1={360} y1={168} x2={345} y2={188} stroke={trace || assert ? accent : pale} strokeWidth={trace || assert ? 2.4 : 1.5} />
      <SketchArrow seedKey="router/to-back" x1={410} y1={168} x2={419} y2={188} stroke={assert ? accent : pale} strokeWidth={assert ? 2.4 : 1.5} />

      <g opacity={miss ? 0.28 : dim(assert || trace)}>
        <Box seed="router/push" x={310} y={188} w={70} h={58} label="push" note="/done" lit={trace || assert} />
        <Box seed="router/back" x={386} y={188} w={64} h={58} label="back" note="()" lit={assert} dim={trace} />
      </g>

      {miss ? (
        <g>
          <Label x={304} y={182} size={18} fill={danger} weight={600}>×</Label>
          <Label x={223} y={272} fill={danger} weight={600}>ไม่มี app router</Label>
        </g>
      ) : null}
    </svg>
  );
}

type CloseState = 'full' | 'map' | 'snapshot' | 'coverage' | 'ci' | 'cheatsheet' | 'next' | 'miss';

/** Five things after the core: snapshot, coverage, CI, cheatsheet, and where to go next. */
export function CourseClose({ state = 'full' }: { state?: CloseState }) {
  const map = state === 'map';
  const miss = state === 'miss';
  const focused = state !== 'full' && !map && !miss;
  const lit = (key: Exclude<CloseState, 'full' | 'map' | 'miss'>) => state === key;
  const dim = (key: Exclude<CloseState, 'full' | 'map' | 'miss'>) => (focused && !lit(key) ? 0.28 : 1);
  const num = (key: Exclude<CloseState, 'full' | 'map' | 'miss'>) => (lit(key) || map ? accent : ink);

  if (miss) {
    return (
      <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="snapshot ถูกอัปเดตด้วย -u ทำให้ test ผ่านทั้งที่ข้อความบนหน้าจอเปลี่ยน" fontFamily="var(--rs-font)">
        <SketchRect seedKey="close/page" x={40} y={60} w={160} h={140} rounded stroke={ink} strokeWidth={1.8} />
        <Label x={120} y={80} fill={ink} weight={600}>หน้าเว็บ</Label>
        <Box seed="close/button" x={48} y={130} w={144} h={30} label="เข้าสู่ระบบใหม่" />
        <Label x={120} y={180} fill={danger}>ข้อความเปลี่ยน</Label>

        <SketchRect seedKey="close/snap" x={250} y={60} w={160} h={140} rounded stroke={muted} strokeWidth={1.8} />
        <Label x={330} y={80} mono fill={ink}>.snap</Label>
        <SketchLine seedKey="close/line1" x1={266} y1={108} x2={394} y2={108} stroke={pale} strokeWidth={1.6} />
        <SketchLine seedKey="close/line2" x1={266} y1={128} x2={394} y2={128} stroke={pale} strokeWidth={1.6} />
        <SketchLine seedKey="close/line3" x1={266} y1={148} x2={394} y2={148} stroke={pale} strokeWidth={1.6} />
        <Label x={330} y={180} fill={danger}>ข้อความเก่า</Label>

        <SketchArrow seedKey="close/update" x1={200} y1={100} x2={250} y2={100} stroke={danger} strokeWidth={2.4} />
        <Label x={225} y={86} mono fill={danger} weight={600}>-u</Label>

        <SketchRect seedKey="close/result" x={240} y={220} w={180} h={56} rounded stroke={success} strokeWidth={2} />
        <Label x={330} y={238} mono fill={success}>Tests 1 passed</Label>
        <Label x={404} y={238} fill={success} weight={600}>✓</Label>
        <Label x={330} y={264} fill={danger}>แต่หน้าจอผิด</Label>

        <SketchRect seedKey="close/warn" x={40} y={220} w={160} h={56} rounded stroke={danger} strokeWidth={2} />
        <Label x={60} y={238} size={20} fill={danger} weight={600}>!</Label>
        <Label x={126} y={238} fill={danger} weight={600}>หน้าจอผิด</Label>
        <Label x={120} y={264} fill={danger}>snap ถูกทับ</Label>
      </svg>
    );
  }

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ห้าอย่างหลังแกนคอร์ส: snapshot coverage CI cheatsheet และการต่อยอดด้วย Browser Mode กับ E2E"
      fontFamily="var(--rs-font)"
    >
      <g opacity={map ? 0.45 : dim('snapshot')}>
        <SketchRect seedKey="close/t1" x={12} y={40} w={138} h={134} rounded stroke={lit('snapshot') ? accent : ink} strokeWidth={lit('snapshot') ? 2.4 : 1.6} />
        <Label x={26} y={60} size={map ? 20 : 18} fill={num('snapshot')} weight={600}>1</Label>
        <Label x={46} y={60} anchor="start" fill={lit('snapshot') ? accent : ink}>snapshot</Label>
        <Box seed="close/page" x={22} y={80} w={48} h={40} label="หน้า" lit={lit('snapshot')} />
        <Box seed="close/snap" x={92} y={80} w={48} h={40} label=".snap" lit={lit('snapshot')} mono />
        <SketchArrow seedKey="close/match" x1={70} y1={100} x2={92} y2={100} stroke={lit('snapshot') ? accent : ink} strokeWidth={1.8} />
        <Label x={81} y={136} mono fill={lit('snapshot') ? accent : muted}>match</Label>
        <Label x={81} y={158} mono fill={lit('snapshot') ? accent : muted}>written</Label>
      </g>

      <g opacity={map ? 0.45 : dim('coverage')}>
        <SketchRect seedKey="close/t2" x={160} y={40} w={138} h={134} rounded stroke={lit('coverage') ? accent : ink} strokeWidth={lit('coverage') ? 2.4 : 1.6} />
        <Label x={174} y={60} size={map ? 20 : 18} fill={num('coverage')} weight={600}>2</Label>
        <Label x={194} y={60} anchor="start" fill={lit('coverage') ? accent : ink}>coverage</Label>
        <Label x={172} y={84} anchor="start" mono fill={lit('coverage') ? accent : ink}>Stmts 81.25</Label>
        <Label x={172} y={108} anchor="start" mono fill={lit('coverage') ? accent : ink}>Branch 50</Label>
        <Label x={172} y={132} anchor="start" mono fill={lit('coverage') ? accent : ink}>Lines 92.3</Label>
        <Label x={172} y={158} anchor="start" mono fill={danger} weight={600}>line 35</Label>
      </g>

      <g opacity={map ? 0.45 : dim('ci')}>
        <SketchRect seedKey="close/t3" x={308} y={40} w={140} h={134} rounded stroke={lit('ci') ? accent : ink} strokeWidth={lit('ci') ? 2.4 : 1.6} />
        <Label x={322} y={60} size={map ? 20 : 18} fill={num('ci')} weight={600}>3</Label>
        <Label x={342} y={60} anchor="start" fill={lit('ci') ? accent : ink}>CI</Label>
        <Box seed="close/push" x={320} y={78} w={118} h={24} label="push" lit={lit('ci')} mono />
        <SketchArrow seedKey="close/ci-1" x1={379} y1={102} x2={379} y2={110} stroke={lit('ci') ? accent : ink} strokeWidth={1.8} />
        <Box seed="close/actions" x={320} y={110} w={118} h={24} label="Actions" lit={lit('ci')} />
        <SketchArrow seedKey="close/ci-2" x1={379} y1={134} x2={379} y2={142} stroke={lit('ci') ? accent : ink} strokeWidth={1.8} />
        <Box seed="close/test" x={320} y={142} w={118} h={24} label="test" lit={lit('ci')} mono />
        <Label x={424} y={154} fill={success} weight={600}>✓</Label>
      </g>

      <g opacity={map ? 0.45 : dim('cheatsheet')}>
        <SketchRect seedKey="close/t4" x={12} y={186} w={216} h={130} rounded stroke={lit('cheatsheet') ? accent : ink} strokeWidth={lit('cheatsheet') ? 2.4 : 1.6} />
        <Label x={26} y={206} size={map ? 20 : 18} fill={num('cheatsheet')} weight={600}>4</Label>
        <Label x={46} y={206} anchor="start" fill={lit('cheatsheet') ? accent : ink}>cheatsheet</Label>
        <Label x={24} y={232} anchor="start" fill={lit('cheatsheet') ? accent : ink}>ต้องมี → getBy</Label>
        <Label x={24} y={260} anchor="start" fill={lit('cheatsheet') ? accent : ink}>ต้องไม่มี → queryBy</Label>
        <Label x={24} y={288} anchor="start" fill={lit('cheatsheet') ? accent : ink}>จะมา → findBy</Label>
      </g>

      <g opacity={map ? 0.45 : dim('next')}>
        <SketchRect seedKey="close/t5" x={236} y={186} w={212} h={130} rounded stroke={lit('next') ? accent : ink} strokeWidth={lit('next') ? 2.4 : 1.6} />
        <Label x={250} y={206} size={map ? 20 : 18} fill={num('next')} weight={600}>5</Label>
        <Label x={270} y={206} anchor="start" fill={lit('next') ? accent : ink}>ต่อยอด</Label>
        <Box seed="close/browser" x={248} y={220} w={90} h={52} label="Browser" lit={lit('next')} />
        <Box seed="close/server" x={346} y={220} w={90} h={52} label="Server" lit={lit('next')} />
        <SketchArrow seedKey="close/e2e-arrow" x1={391} y1={272} x2={391} y2={286} head={8} stroke={lit('next') ? accent : ink} strokeWidth={1.8} />
        <Box seed="close/e2e" x={346} y={286} w={90} h={24} label="E2E" lit={lit('next')} mono />
      </g>
    </svg>
  );
}
