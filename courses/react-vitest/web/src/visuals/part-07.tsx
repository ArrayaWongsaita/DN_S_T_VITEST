import { roleColour, SketchArrow, SketchLine, SketchPath, SketchRect } from '../components';

const ink = '#2b2b2b';
const muted = '#646464';
const pale = '#b5b5b5';
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
  const fill = bad ? danger : good ? success : lit ? accent : dim ? pale : ink;
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

type AppState = 'hook' | 'full' | 'trace' | 'state' | 'input' | 'list' | 'miss';

/** One page, four components: input sends up, state holds todos, list shows and sends toggle back. */
export function AppUnderTest({ state = 'full' }: { state?: AppState }) {
  const hook = state === 'hook';
  const trace = state === 'trace';
  const stateLit = state === 'state' || trace;
  const inputLit = state === 'input' || trace;
  const listLit = state === 'list' || trace;
  const miss = state === 'miss';
  const focused = state !== 'full' && !hook && !miss;
  const dim = (lit: boolean) => (focused && !lit ? 0.32 : 1);
  const wire = (lit: boolean) => (lit ? accent : focused || miss ? pale : ink);
  const wireWidth = (lit: boolean) => (lit ? 2.4 : 1.6);
  const counter = trace ? 'เหลือ 1 รายการ' : 'เหลือ 0 รายการ';

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="หน้า TodoApp หนึ่งหน้า: TodoInput ส่งงานขึ้น state, TodoList แสดงงาน และส่ง toggle กลับ; test เปิดทั้งหน้า"
      fontFamily="var(--rs-font)"
    >
      <g opacity={hook ? 0.35 : 1}>
        <Label x={230} y={38} fill={muted}>หน้าเดียวที่ผู้ใช้เห็น</Label>
      </g>
      <SketchRect seedKey="app/page" x={10} y={52} w={440} h={264} rounded stroke={hook ? ink : miss ? danger : ink} strokeWidth={1.7} dashed={hook} />

      <SketchRect seedKey="app/test-card" x={10} y={6} w={112} h={32} rounded stroke={hook ? accent : pale} strokeWidth={hook ? 2.4 : 1.5} />
      <Label x={66} y={22} mono fill={hook ? accent : muted}>test</Label>
      <SketchArrow seedKey="app/test-arrow" x1={122} y1={22} x2={142} y2={52} stroke={hook ? accent : pale} strokeWidth={hook ? 2.4 : 1.5} />

      <g opacity={dim(stateLit)}>
        <SketchRect seedKey="app/state" x={160} y={76} w={170} h={92} rounded stroke={stateLit ? accent : ink} strokeWidth={stateLit ? 2.4 : 1.7} />
        <Label x={245} y={94} fill={stateLit ? accent : ink} weight={stateLit ? 600 : undefined}>TodoApp</Label>
        <Label x={245} y={116} mono fill={stateLit ? accent : muted}>todos</Label>
        <Box seed="app/counter" x={172} y={132} w={146} h={26} label={counter} lit={trace || state === 'state'}  />
      </g>

      <g opacity={dim(inputLit)}>
        <SketchRect seedKey="app/input" x={24} y={196} w={126} h={98} rounded stroke={inputLit ? accent : ink} strokeWidth={inputLit ? 2.4 : 1.7} />
        <Label x={87} y={214} fill={inputLit ? accent : ink} weight={inputLit ? 600 : undefined}>TodoInput</Label>
        <Box seed="app/field" x={36} y={226} w={102} h={24} label="งานใหม่"  dashed />
        <Box seed="app/add" x={36} y={258} w={64} h={24} label="เพิ่ม"  lit={inputLit} />
      </g>

      <g opacity={dim(listLit)}>
        <SketchRect seedKey="app/list" x={312} y={178} w={124} h={122} rounded stroke={listLit ? accent : ink} strokeWidth={listLit ? 2.4 : 1.7} />
        {miss ? (
          <Label x={366} y={192} fill={danger} weight={600}>checkbox ×2</Label>
        ) : (
          <Label x={374} y={192} fill={listLit ? accent : ink} weight={listLit ? 600 : undefined}>TodoList</Label>
        )}
        <SketchRect seedKey="app/item1" x={322} y={208} w={104} h={32} rounded stroke={trace || listLit ? accent : ink} strokeWidth={trace || listLit ? 2.2 : 1.5} />
        <SketchRect seedKey="app/check1" x={330} y={216} w={14} h={14} stroke={trace || listLit ? accent : ink} strokeWidth={1.6} />
        <Label x={352} y={232} anchor="start" fill={trace || listLit ? accent : ink}>ซื้อนม</Label>
        <g opacity={trace ? 0.35 : 1}>
          <SketchRect seedKey="app/item2" x={322} y={252} w={104} h={32} rounded stroke={miss ? danger : ink} strokeWidth={miss ? 2.2 : 1.5} />
          <SketchRect seedKey="app/check2" x={330} y={260} w={14} h={14} stroke={miss ? danger : ink} strokeWidth={miss ? 2.2 : 1.6} />
          <Label x={352} y={276} anchor="start" fill={miss ? danger : ink}>ซื้อไข่</Label>
        </g>
      </g>

      <SketchArrow seedKey="app/on-add" x1={150} y1={210} x2={158} y2={170} stroke={wire(inputLit)} strokeWidth={wireWidth(inputLit)} dashed={miss} />
      <Label x={136} y={188} anchor="end" mono fill={inputLit ? accent : muted}>onAdd</Label>

      <SketchArrow seedKey="app/todos" x1={330} y1={150} x2={350} y2={178} stroke={wire(listLit)} strokeWidth={wireWidth(listLit)} dashed={miss} />
      <Label x={350} y={160} anchor="start" mono fill={listLit ? accent : muted}>todos</Label>

      <SketchLine seedKey="app/toggle-1" x1={312} y1={240} x2={290} y2={240} stroke={wire(listLit)} strokeWidth={wireWidth(listLit)} dashed={miss} />
      <SketchLine seedKey="app/toggle-2" x1={290} y1={240} x2={290} y2={122} stroke={wire(listLit)} strokeWidth={wireWidth(listLit)} dashed={miss} />
      <SketchArrow seedKey="app/toggle-3" x1={290} y1={122} x2={330} y2={122} stroke={wire(listLit)} strokeWidth={wireWidth(listLit)} dashed={miss} />
      <Label x={286} y={182} anchor="end" mono fill={listLit ? accent : muted}>onToggle</Label>

      {miss ? (
        <g>
          <SketchRect seedKey="app/miss-box" x={316} y={202} w={116} h={88} rounded stroke={danger} strokeWidth={2.2} dashed />
          <Label x={438} y={218} size={18} fill={danger} weight={600}>×</Label>
        </g>
      ) : null}
    </svg>
  );
}

type ProviderState = 'full' | 'trace' | 'provider' | 'wrapper' | 'custom' | 'miss';

/** A context component needs its provider; the test supplies one through a wrapper. */
export function ProviderFrame({ state = 'full' }: { state?: ProviderState }) {
  const trace = state === 'trace';
  const provider = state === 'provider';
  const wrapper = state === 'wrapper';
  const custom = state === 'custom';
  const miss = state === 'miss';
  const focused = state !== 'full' && !miss;
  const dim = (lit: boolean) => (focused && !lit ? 0.32 : 1);
  const frameStroke = provider || wrapper ? accent : miss ? pale : ink;
  const contextStroke = trace ? accent : miss ? pale : ink;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ThemeToggle ต้องอยู่ใน ThemeProvider; test ห่อด้วย renderWithTheme และ wrapper; ถ้าไม่มี provider ค่า default ทำให้กดแล้วไม่เปลี่ยน"
      fontFamily="var(--rs-font)"
    >
      <g opacity={dim(custom || trace)}>
        <Box seed="provider/test" x={12} y={60} w={88} h={40} label="test" dim={focused} mono />
        <SketchArrow seedKey="provider/test-arrow" x1={100} y1={80} x2={120} y2={80} stroke={custom || trace ? accent : pale} strokeWidth={custom || trace ? 2.4 : 1.5} />
      </g>

      <g opacity={dim(provider || wrapper || trace)}>
        <SketchRect seedKey="provider/frame" x={120} y={60} w={210} h={150} rounded stroke={frameStroke} strokeWidth={provider || wrapper || trace ? 2.6 : 1.7} dashed />
        <Label x={225} y={44} fill={provider || wrapper ? accent : ink} weight={provider || wrapper ? 600 : undefined}>ThemeProvider</Label>
        <Box seed="provider/context" x={132} y={72} w={186} h={28} label="{ theme, toggle }" lit={trace || provider} mono  />
        <SketchArrow seedKey="provider/use" x1={225} y1={100} x2={225} y2={120} stroke={contextStroke} strokeWidth={trace ? 2.4 : 1.7} />
        <Label x={240} y={110} anchor="start" mono  fill={trace ? accent : muted}>useTheme</Label>
        <Box seed="provider/button" x={160} y={120} w={130} h={42} label="ธีม: light" lit={trace} bad={miss} />
        <Label x={225} y={184}  fill={miss ? danger : muted}>{miss ? 'toggle ไม่ทำงาน' : 'context value'}</Label>
      </g>

      <g opacity={dim(custom || wrapper)}>
        <SketchRect seedKey="provider/utils" x={12} y={210} w={180} h={112} rounded stroke={custom ? accent : focused && !custom && !wrapper ? pale : ink} strokeWidth={custom ? 2.4 : 1.7} />
        <Label x={102} y={226} fill={custom ? accent : ink} weight={custom ? 600 : undefined}>test-utils.tsx</Label>
        <Label x={102} y={250} mono fill={custom ? accent : muted}>renderWithTheme</Label>
        <Label x={102} y={274} mono fill={custom ? accent : muted}>wrapper + initial</Label>
        <Label x={102} y={296} mono fill={custom ? accent : muted}>initial = "light"</Label>
        <SketchArrow seedKey="provider/utils-arrow" x1={192} y1={244} x2={208} y2={214} stroke={custom ? accent : focused ? pale : ink} strokeWidth={custom ? 2.4 : 1.5} dashed />
        <Label x={214} y={232} anchor="start"  fill={wrapper ? accent : muted}>wrapper</Label>
      </g>

      <g opacity={dim(miss)}>
        <Label x={398} y={52}  fill={miss ? danger : muted}>ไม่มี provider</Label>
        <Box seed="provider/bare" x={348} y={70} w={100} h={40} label="ThemeToggle" bad={miss} dim={!miss} />
        <SketchArrow seedKey="provider/toggle" x1={398} y1={110} x2={398} y2={132} stroke={miss ? danger : pale} strokeWidth={miss ? 2.4 : 1.5} />
        <Box seed="provider/default" x={336} y={132} w={112} h={58} label="default" note="() => {}" bad={miss} dim={!miss} mono={false} />
        {miss ? <Label x={444} y={196} size={18} fill={danger} weight={600}>×</Label> : null}
      </g>
    </svg>
  );
}

type MountState = 'full' | 'trace' | 'twice';

/** rerender changes props on the same mounted tree; render again builds a second tree. */
export function SameMount({ state = 'full' }: { state?: MountState }) {
  const trace = state === 'trace';
  const twice = state === 'twice';
  const focused = trace;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="rerender เปลี่ยน props ของ TodoItem ต้นไม้เดิมจาก done false เป็น true; เรียก render สองครั้งจะได้สองต้นไม้และเจอ checkbox ซ้ำ"
      fontFamily="var(--rs-font)"
    >
      {!twice ? (
        <g>
          <SketchRect seedKey="mount/card" x={50} y={70} w={360} h={110} rounded stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.7} />
          <Label x={230} y={88} fill={trace ? accent : ink} weight={trace ? 600 : undefined}>TodoItem</Label>
          <SketchLine seedKey="mount/divider" x1={230} y1={102} x2={230} y2={164} stroke={pale} strokeWidth={1.2} dashed />

          <Label x={140} y={104} fill={muted}>ก่อน</Label>
          <SketchRect seedKey="mount/check1" x={100} y={126} w={16} h={16} stroke={trace ? accent : ink} strokeWidth={trace ? 2.2 : 1.6} />
          <Label x={126} y={134} anchor="start" fill={ink}>ซื้อนม</Label>

          <Label x={320} y={104} fill={trace ? accent : muted}>หลัง</Label>
          <SketchRect seedKey="mount/check2" x={290} y={126} w={16} h={16} stroke={trace ? success : ink} strokeWidth={trace ? 2.2 : 1.6} />
          <SketchPath seedKey="mount/tick" d="M294 134 L298 139 L303 129" stroke={trace ? success : ink} strokeWidth={2.2} />
          <Label x={316} y={134} anchor="start" fill={ink}>ซื้อนม</Label>

          <SketchArrow seedKey="mount/rerender" x1={180} y1={152} x2={280} y2={152} stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.8} />
          <Label x={230} y={168} mono  fill={trace ? accent : muted}>rerender</Label>

          <SketchRect seedKey="mount/base" x={80} y={190} w={300} h={28} rounded stroke={trace ? accent : ink} strokeWidth={trace ? 2.2 : 1.5} dashed />
          <Label x={230} y={204}  fill={trace ? accent : muted}>ต้นไม้เดิม</Label>

          <g opacity={focused ? 0.45 : 1}>
            <Box seed="mount/props1" x={20} y={234} w={140} h={64} label="props #1" note="done: false" lit={trace} />
            <Box seed="mount/props2" x={300} y={234} w={140} h={64} label="props #2" note="done: true" lit={trace} />
            <SketchArrow seedKey="mount/props1-arrow" x1={90} y1={234} x2={90} y2={220} stroke={trace ? accent : ink} strokeWidth={trace ? 2.2 : 1.5} />
            <SketchArrow seedKey="mount/props2-arrow" x1={370} y1={234} x2={370} y2={220} stroke={trace ? accent : ink} strokeWidth={trace ? 2.2 : 1.5} />
          </g>
        </g>
      ) : (
        <g>
          <SketchRect seedKey="mount/t1" x={40} y={48} w={330} h={96} rounded stroke={danger} strokeWidth={2.2} />
          <Label x={205} y={68} fill={danger} weight={600}>TodoItem · ต้นไม้ 1</Label>
          <SketchRect seedKey="mount/t1-check" x={64} y={86} w={16} h={16} stroke={danger} strokeWidth={2} />
          <Label x={90} y={94} anchor="start" fill={ink}>ซื้อนม</Label>
          <Label x={205} y={126}  fill={danger}>ไม่ติ๊ก</Label>

          <SketchRect seedKey="mount/t2" x={120} y={176} w={330} h={96} rounded stroke={danger} strokeWidth={2.2} />
          <Label x={285} y={196} fill={danger} weight={600}>TodoItem · ต้นไม้ 2</Label>
          <SketchRect seedKey="mount/t2-check" x={144} y={214} w={16} h={16} stroke={danger} strokeWidth={2} />
          <SketchPath seedKey="mount/t2-tick" d="M148 222 L152 227 L157 217" stroke={danger} strokeWidth={2.2} />
          <Label x={170} y={222} anchor="start" fill={ink}>ซื้อนม</Label>
          <Label x={285} y={254}  fill={danger}>ติ๊ก</Label>

          <SketchArrow seedKey="mount/r1" x1={16} y1={96} x2={40} y2={96} stroke={danger} strokeWidth={2.2} />
          <SketchArrow seedKey="mount/r2" x1={16} y1={224} x2={120} y2={224} stroke={danger} strokeWidth={2.2} />
          <Label x={16} y={34} anchor="start" mono fill={danger}>render</Label>
          <Label x={16} y={208} anchor="start" mono  fill={danger}>render</Label>
          <Label x={432} y={70} size={18} fill={danger} weight={600}>×</Label>
          <Label x={432} y={198} size={18} fill={danger} weight={600}>×</Label>
          <Label x={230} y={306}  fill={danger} weight={600}>เจอ checkbox ซ้ำ</Label>
        </g>
      )}
    </svg>
  );
}

type DeskState = 'full' | 'map' | 'scope' | 'files' | 'each' | 'describe' | 'before';

/** Five organizing moves: what to test, file layout, test.each, describe, beforeEach. */
export function TestDesk({ state = 'full' }: { state?: DeskState }) {
  const map = state === 'map';
  const focused = state !== 'full' && !map;
  const lit = (key: Exclude<DeskState, 'full' | 'map'>) => state === key;
  const dim = (key: Exclude<DeskState, 'full' | 'map'>) => (focused && !lit(key) ? 0.3 : 1);
  const stroke = (key: Exclude<DeskState, 'full' | 'map'>) => (lit(key) ? accent : ink);
  const width = (key: Exclude<DeskState, 'full' | 'map'>) => (lit(key) ? 2.5 : 1.7);

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ห้าท่าจัดระเบียบ test: ควรเทสอะไร โครงไฟล์ test.each describe และ beforeEach"
      fontFamily="var(--rs-font)"
    >
      <g opacity={map ? 0.55 : dim('scope')}>
        <SketchRect seedKey="desk/scope" x={12} y={16} w={140} h={130} rounded stroke={stroke('scope')} strokeWidth={width('scope')} />
        <Label x={82} y={36} fill={lit('scope') ? accent : ink} weight={lit('scope') ? 600 : undefined}>1 ควรเทส</Label>
        <Box seed="desk/scope-user" x={24} y={50} w={116} h={32} label="หน้าเว็บ ✓" good={lit('scope')} dim={!lit('scope') && focused} />
        <Box seed="desk/scope-state" x={24} y={92} w={116} h={32} label="state ×" bad={lit('scope')} dim={!lit('scope') && focused} />
      </g>

      <g opacity={map ? 0.55 : dim('files')}>
        <SketchRect seedKey="desk/files" x={160} y={16} w={140} h={130} rounded stroke={stroke('files')} strokeWidth={width('files')} />
        <Label x={230} y={36} fill={lit('files') ? accent : ink} weight={lit('files') ? 600 : undefined}>2 ไฟล์</Label>
        <Box seed="desk/file-app" x={170} y={46} w={120} h={26} label="TodoApp.tsx" lit={lit('files')} mono />
        <Box seed="desk/file-test" x={170} y={78} w={120} h={26} label="TodoApp.test" lit={lit('files')} mono />
        <Box seed="desk/file-utils" x={170} y={110} w={120} h={24} label="test-utils" lit={lit('files')} mono dashed />
      </g>

      <g opacity={map ? 0.55 : dim('each')}>
        <SketchRect seedKey="desk/each" x={308} y={16} w={140} h={130} rounded stroke={stroke('each')} strokeWidth={width('each')} />
        <Label x={378} y={36} fill={lit('each') ? accent : ink} weight={lit('each') ? 600 : undefined}>3 test.each</Label>
        <Box seed="desk/each-1" x={320} y={50} w={116} h={28} label="ซื้อนม" lit={lit('each')} />
        <Box seed="desk/each-2" x={320} y={84} w={116} h={28} label="ซื้อไข่" lit={lit('each')} />
        <Label x={378} y={128} mono  fill={lit('each') ? accent : muted}>✓ ✓</Label>
      </g>

      <g opacity={map ? 0.55 : dim('describe')}>
        <SketchRect seedKey="desk/describe" x={12} y={160} w={212} h={154} rounded stroke={stroke('describe')} strokeWidth={width('describe')} />
        <Label x={118} y={182} fill={lit('describe') ? accent : ink} weight={lit('describe') ? 600 : undefined}>4 describe</Label>
        <Label x={34} y={208} anchor="start" mono  fill={lit('describe') ? accent : muted}>TodoApp</Label>
        <SketchLine seedKey="desk/describe-line" x1={34} y1={220} x2={34} y2={290} stroke={lit('describe') ? accent : ink} strokeWidth={lit('describe') ? 2.2 : 1.5} />
        <Box seed="desk/test1" x={48} y={220} w={156} h={22} label="test 1" dim={!lit('describe') && focused} />
        <Box seed="desk/test2" x={48} y={248} w={156} h={22} label="test 2" dim={!lit('describe') && focused} />
        <Box seed="desk/test3" x={48} y={276} w={156} h={22} label="test 3" dim={!lit('describe') && focused} />
      </g>

      <g opacity={map ? 0.55 : dim('before')}>
        <SketchRect seedKey="desk/before" x={236} y={160} w={212} h={154} rounded stroke={stroke('before')} strokeWidth={width('before')} />
        <Label x={342} y={182} fill={lit('before') ? accent : ink} weight={lit('before') ? 600 : undefined}>5 beforeEach</Label>
        <Box seed="desk/setup" x={250} y={198} w={148} h={24} label="user + render" lit={lit('before')} mono />
        <SketchLine seedKey="desk/loop1" x1={250} y1={222} x2={250} y2={290} stroke={lit('before') ? accent : ink} strokeWidth={lit('before') ? 2.2 : 1.5} />
        <SketchArrow seedKey="desk/loop2" x1={250} y1={238} x2={276} y2={238} stroke={lit('before') ? accent : ink} strokeWidth={lit('before') ? 2.2 : 1.5} />
        <SketchArrow seedKey="desk/loop3" x1={250} y1={264} x2={276} y2={264} stroke={lit('before') ? accent : ink} strokeWidth={lit('before') ? 2.2 : 1.5} />
        <SketchArrow seedKey="desk/loop4" x1={250} y1={290} x2={276} y2={290} stroke={lit('before') ? accent : ink} strokeWidth={lit('before') ? 2.2 : 1.5} />
        <Box seed="desk/b-test1" x={276} y={228} w={156} h={20} label="test 1" dim={!lit('before') && focused} />
        <Box seed="desk/b-test2" x={276} y={254} w={156} h={20} label="test 2" dim={!lit('before') && focused} />
        <Box seed="desk/b-test3" x={276} y={280} w={156} h={20} label="test 3" dim={!lit('before') && focused} />
      </g>

    </svg>
  );
}
