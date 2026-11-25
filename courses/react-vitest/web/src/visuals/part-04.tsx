import { roleColour, SketchArrow, SketchLine, SketchRect } from '../components';

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
  bad?: boolean;
  dim?: boolean;
  dashed?: boolean;
  mono?: boolean;
};

function Box({ seed, x, y, w, h, label, note, size = 16, lit, bad, dim, dashed, mono }: BoxProps) {
  const stroke = bad ? danger : lit ? accent : dim ? pale : ink;
  const fill = bad ? danger : lit ? accent : dim ? '#8a8a8a' : ink;
  const labelY = note ? y + h / 2 - 13 : y + h / 2;
  return (
    <g>
      <SketchRect seedKey={seed} x={x} y={y} w={w} h={h} rounded stroke={stroke} strokeWidth={lit || bad ? 3 : 1.7} dashed={dashed} />
      <Label x={x + w / 2} y={labelY} size={size} fill={fill} weight={lit || bad ? 600 : undefined} mono={mono}>
        {label}
      </Label>
      {note ? (
        <Label x={x + w / 2} y={labelY + 27} size={size} fill={bad ? danger : dim ? '#8a8a8a' : muted} mono={mono}>
          {note}
        </Label>
      ) : null}
    </g>
  );
}

/** The opening hook: one component, two states, in three columns. */
export function StateShapes() {
  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="หน้าเว็บสามแบบที่เปลี่ยนตาม props: alert เปิดหรือปิด ลิสต์มีสามรายการหรือว่าง และปุ่มที่กดได้หรือถูกปิด"
      fontFamily="var(--rs-font)"
    >
      {[8, 156, 304].map((x, index) => (
        <g key={x}>
          <SketchRect seedKey={`states/top/${index}`} x={x} y={20} w={140} h={120} rounded stroke={ink} strokeWidth={1.7} />
          <SketchLine seedKey={`states/top-bar/${index}`} x1={x + 2} y1={46} x2={x + 138} y2={46} stroke={pale} strokeWidth={1.2} />
          <SketchRect seedKey={`states/bottom/${index}`} x={x} y={174} w={140} h={120} rounded stroke={ink} strokeWidth={1.7} />
          <SketchLine seedKey={`states/bottom-bar/${index}`} x1={x + 2} y1={200} x2={x + 138} y2={200} stroke={pale} strokeWidth={1.2} />
        </g>
      ))}

      <Label x={78} y={34} size={16} fill={muted}>alert</Label>
      <Label x={226} y={34} size={16} fill={muted}>ลิสต์</Label>
      <Label x={374} y={34} size={16} fill={muted}>ปุ่ม</Label>
      <Label x={78} y={188} size={16} fill={muted}>alert</Label>
      <Label x={226} y={188} size={16} fill={muted}>ลิสต์</Label>
      <Label x={374} y={188} size={16} fill={muted}>ปุ่ม</Label>

      <SketchRect seedKey="states/alert-on" x={20} y={60} w={116} h={48} rounded stroke={accent} strokeWidth={2.4} />
      <Label x={78} y={84} fill={accent} weight={600}>บันทึกแล้ว</Label>

      <Label x={172} y={70} anchor="start">ส้ม</Label>
      <Label x={172} y={96} anchor="start">กล้วย</Label>
      <Label x={172} y={122} anchor="start">มะม่วง</Label>

      <SketchRect seedKey="states/button-on" x={330} y={76} w={88} h={40} rounded stroke={ink} strokeWidth={2} />
      <Label x={374} y={96}>สมัคร</Label>

      <SketchRect seedKey="states/alert-off" x={20} y={214} w={116} h={48} rounded stroke={pale} strokeWidth={1.6} dashed />
      <Label x={78} y={238} fill={muted}>ไม่มี alert</Label>
      <Label x={226} y={238} fill={muted}>ไม่มีรายการ</Label>
      <SketchRect seedKey="states/button-off" x={330} y={214} w={88} h={40} rounded stroke={pale} strokeWidth={1.6} dashed />
      <Label x={374} y={234} fill={pale}>สมัคร</Label>

      <Label x={78} y={158} mono fill={muted}>visible=true</Label>
      <Label x={226} y={158} mono fill={muted}>items=3</Label>
      <Label x={374} y={158} mono fill={muted}>agreed=true</Label>
      <Label x={78} y={312} mono fill={muted}>visible=false</Label>
      <Label x={226} y={312} mono fill={muted}>items=[]</Label>
      <Label x={374} y={312} mono fill={muted}>agreed=false</Label>
    </svg>
  );
}

type PresenceState = 'full' | 'trace' | 'query' | 'not' | 'miss';

/** A conditional element: getByRole when it must be there, queryByRole + .not when it must be gone. */
export function PresenceBoard({ state = 'full' }: { state?: PresenceState }) {
  const miss = state === 'miss';
  const trace = state === 'trace';
  const query = state === 'query';
  const not = state === 'not';
  const focusedFalse = trace || query || not;
  const dimTrue = focusedFalse;
  const dimFalse = false;
  const dimBottom = query || miss;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="สองสภาพของ alert: visible true หาเจอด้วย getByRole, visible false หาไม่เจอด้วย queryByRole แล้ว .not ยืนยันว่าไม่มี"
      fontFamily="var(--rs-font)"
    >
      <Label x={106} y={16} size={16} fill={muted}>test</Label>
      <Label x={344} y={16} size={16} fill={muted}>หน้าเว็บ</Label>

      <SketchRect
        seedKey="presence/true-card"
        x={12}
        y={30}
        w={200}
        h={102}
        rounded
        stroke={dimTrue ? pale : ink}
        strokeWidth={1.7}
      />
      <Label x={24} y={48} anchor="start" mono fill={dimTrue ? pale : muted}>{'visible={true}'}</Label>
      <Box
        seed="presence/true-query"
        x={22}
        y={60}
        w={180}
        h={54}
        label="getByRole"
        note='("alert")'
        dim={dimTrue}
        mono
      />
      <Label x={24} y={124} anchor="start" fill={dimTrue ? pale : ink}>→ element</Label>
      <Label x={190} y={124} fill={dimTrue ? pale : success} weight={600}>✓</Label>

      <SketchRect seedKey="presence/page1" x={244} y={30} w={204} h={102} rounded stroke={ink} strokeWidth={1.7} />
      <SketchLine seedKey="presence/page1-bar" x1={246} y1={42} x2={446} y2={42} stroke={pale} strokeWidth={1.2} />
      <SketchRect
        seedKey="presence/alert"
        x={264}
        y={56}
        w={164}
        h={48}
        rounded
        stroke={dimTrue ? pale : accent}
        strokeWidth={dimTrue ? 1.5 : 2.3}
      />
      <Label x={346} y={80} fill={dimTrue ? pale : accent} weight={dimTrue ? undefined : 600}>บันทึกแล้ว</Label>

      <SketchRect
        seedKey="presence/false-card"
        x={12}
        y={146}
        w={200}
        h={102}
        rounded
        stroke={miss ? danger : dimFalse ? pale : ink}
        strokeWidth={miss ? 3 : 1.7}
      />
      <Label x={24} y={160} anchor="start" mono fill={dimFalse ? pale : muted}>{'visible={false}'}</Label>
      <Box
        seed="presence/false-query"
        x={22}
        y={172}
        w={180}
        h={54}
        label={miss ? 'getByRole' : 'queryByRole'}
        note='("alert")'
        lit={trace || query}
        bad={miss}
        dim={dimFalse && !not}
        mono
      />
      {miss ? (
        <Label x={24} y={238} anchor="start" fill={danger}>× throw</Label>
      ) : (
        <Label x={24} y={238} anchor="start" fill={dimFalse ? pale : trace || query || not ? accent : ink}>→ null</Label>
      )}

      <SketchRect seedKey="presence/page2" x={244} y={146} w={204} h={102} rounded stroke={ink} strokeWidth={1.7} />
      <SketchLine seedKey="presence/page2-bar" x1={246} y1={158} x2={446} y2={158} stroke={pale} strokeWidth={1.2} />
      <SketchRect seedKey="presence/empty" x={264} y={172} w={164} h={48} rounded stroke={pale} strokeWidth={1.5} dashed />
      <Label x={346} y={196} fill={muted}>ไม่มี alert</Label>

      <SketchArrow
        seedKey="presence/arrow1"
        x1={212}
        y1={84}
        x2={240}
        y2={84}
        stroke={dimTrue ? pale : ink}
        strokeWidth={dimTrue ? 1.4 : 1.8}
      />
      <SketchArrow
        seedKey="presence/arrow2"
        x1={212}
        y1={199}
        x2={240}
        y2={199}
        stroke={miss ? danger : dimFalse && !not ? pale : trace || query || not ? accent : ink}
        strokeWidth={miss || trace || query || not ? 2.4 : 1.8}
        dashed={miss}
      />

      <SketchLine
        seedKey="presence/down"
        x1={110}
        y1={248}
        x2={110}
        y2={260}
        stroke={dimBottom ? pale : accent}
        strokeWidth={dimBottom ? 1.4 : 2}
        dashed
      />
      <SketchRect
        seedKey="presence/not"
        x={12}
        y={260}
        w={436}
        h={54}
        rounded
        stroke={miss ? pale : dimBottom ? pale : trace || not ? success : ink}
        strokeWidth={miss || dimBottom ? 1.5 : trace || not ? 2.4 : 1.7}
      />
      <Label x={24} y={280} anchor="start" mono fill={dimBottom ? pale : ink}>expect(null)</Label>
      <Label x={24} y={304} anchor="start" mono fill={dimBottom ? pale : ink}>.not.toBeInTheDocument()</Label>
      <Label x={432} y={292} size={18} fill={dimBottom ? pale : success} weight={600}>✓</Label>
    </svg>
  );
}

type ListState = 'full' | 'trace' | 'query' | 'count' | 'empty' | 'multiple';

/** An array becomes a list: count the items, read one by position, and handle the empty list. */
export function ListBoard({ state = 'full' }: { state?: ListState }) {
  const multiple = state === 'multiple';
  const trace = state === 'trace';
  const query = state === 'query';
  const count = state === 'count';
  const empty = state === 'empty';
  const dimA = empty;
  const dimB = trace || query || count || multiple;
  const dimQuery = trace || empty;
  const dimResults = trace || empty || query;
  const fruits = ['ส้ม', 'กล้วย', 'มะม่วง'];

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="อาร์เรย์สามผลไม้กลายเป็นลิสต์สามรายการ getAllByRole คืนอาร์เรย์ นับด้วย toHaveLength และดูตัวแรกด้วย index ศูนย์ พร้อมสภาพลิสต์ว่าง"
      fontFamily="var(--rs-font)"
    >
      <Label x={12} y={26} size={16} anchor="start" fill={dimA ? pale : muted}>items</Label>
      <Label x={209} y={26} size={16} fill={dimA ? pale : muted}>หน้าเว็บ</Label>
      <Label x={372} y={26} size={16} fill={dimA ? pale : muted}>query</Label>

      <SketchRect seedKey="list/array" x={12} y={36} w={110} h={112} rounded stroke={dimA ? pale : ink} strokeWidth={1.7} />
      {fruits.map((fruit, index) => (
        <g key={fruit}>
          <Label x={22} y={64 + index * 26} size={16} fill={dimA ? pale : muted} mono>{String(index)}</Label>
          <Label x={38} y={64 + index * 26} size={16} anchor="start" fill={dimA ? pale : ink}>{fruit}</Label>
        </g>
      ))}
      <SketchArrow
        seedKey="list/arrow"
        x1={122}
        y1={92}
        x2={138}
        y2={92}
        stroke={dimA ? pale : trace ? accent : ink}
        strokeWidth={trace ? 2.4 : 1.8}
      />

      <SketchRect seedKey="list/page" x={138} y={36} w={142} h={112} rounded stroke={dimA ? pale : ink} strokeWidth={1.7} />
      <SketchRect
        seedKey="list/ul"
        x={150}
        y={48}
        w={118}
        h={88}
        rounded
        stroke={multiple ? danger : dimA ? pale : trace ? accent : ink}
        strokeWidth={multiple || trace ? 2.4 : 1.5}
        dashed
      />
      {fruits.map((fruit, index) => (
        <g key={fruit}>
          <Label x={162} y={72 + index * 26} size={16} fill={dimA ? pale : muted} mono>{String(index)}</Label>
          <Label x={178} y={72 + index * 26} size={16} anchor="start" fill={dimA ? pale : multiple ? danger : ink}>{fruit}</Label>
        </g>
      ))}

      <Label x={138} y={168} size={16} anchor="start" mono fill={dimResults ? pale : count ? success : ink}>items[0]</Label>
      <Label x={222} y={168} size={16} anchor="start" mono fill={dimResults ? pale : count ? success : ink}>→ "ส้ม"</Label>

      <SketchArrow
        seedKey="list/qarrow"
        x1={280}
        y1={72}
        x2={296}
        y2={72}
        stroke={multiple ? danger : query ? accent : dimQuery ? pale : ink}
        strokeWidth={multiple || query ? 2.4 : 1.8}
        dashed={multiple}
      />
      <Box
        seed="list/query"
        x={296}
        y={36}
        w={152}
        h={72}
        label={multiple ? 'getByRole' : 'getAllByRole'}
        note='("listitem")'
        lit={query}
        bad={multiple}
        dim={dimQuery}
        mono
      />

      {multiple ? (
        <Label x={296} y={144} size={16} anchor="start" fill={danger}>× หลายตัว</Label>
      ) : (
        <>
          <Label x={296} y={136} size={16} anchor="start" mono fill={dimResults ? pale : count ? success : ink}>[li, li, li]</Label>
          <Label x={296} y={162} size={16} anchor="start" mono fill={dimResults ? pale : count ? success : ink}>toHaveLength(3)</Label>
        </>
      )}

      <Label x={12} y={190} size={16} anchor="start" fill={dimB ? pale : muted}>array ว่าง</Label>
      <SketchRect seedKey="list/empty-array" x={12} y={204} w={110} h={110} rounded stroke={empty ? accent : dimB ? pale : ink} strokeWidth={empty ? 2.4 : 1.7} />
      <Label x={67} y={259} size={16} mono fill={empty ? accent : dimB ? pale : ink}>items = []</Label>
      <SketchArrow
        seedKey="list/empty-arrow"
        x1={122}
        y1={259}
        x2={138}
        y2={259}
        stroke={empty ? accent : dimB ? pale : ink}
        strokeWidth={empty ? 2.4 : 1.8}
      />
      <SketchRect seedKey="list/empty-page" x={138} y={204} w={142} h={110} rounded stroke={empty ? accent : dimB ? pale : ink} strokeWidth={empty ? 2.4 : 1.7} />
      <SketchLine seedKey="list/empty-bar" x1={140} y1={216} x2={278} y2={216} stroke={pale} strokeWidth={1.2} />
      <Label x={209} y={259} size={16} fill={empty ? accent : dimB ? pale : ink}>ไม่มีรายการ</Label>

      <SketchArrow
        seedKey="list/empty-qarrow"
        x1={280}
        y1={259}
        x2={296}
        y2={259}
        stroke={empty ? accent : dimB ? pale : ink}
        strokeWidth={empty ? 2.4 : 1.8}
      />
      <SketchRect seedKey="list/empty-query" x={296} y={204} w={152} h={114} rounded stroke={empty ? accent : dimB ? pale : ink} strokeWidth={empty ? 2.4 : 1.7} />
      <Label x={372} y={226} mono fill={empty ? accent : dimB ? pale : ink}>queryByRole</Label>
      <Label x={372} y={252} mono fill={empty ? accent : dimB ? pale : ink}>("list")</Label>
      <Label x={372} y={278} mono fill={empty ? accent : dimB ? pale : ink}>→ null</Label>
      <Label x={372} y={302} mono fill={empty ? success : dimB ? pale : ink}>+ .not ✓</Label>
    </svg>
  );
}

type FormState = 'full' | 'trace' | 'label' | 'value' | 'checked' | 'disabled' | 'one-sided';

/** A form has a value, a checked state and a disabled state; each is read with its own matcher. */
export function FormBoard({ state = 'full' }: { state?: FormState }) {
  const trace = state === 'trace';
  const labelState = state === 'label';
  const valueState = state === 'value';
  const checked = state === 'checked';
  const disabled = state === 'disabled';
  const oneSided = state === 'one-sided';
  const focused = state !== 'full';
  const row1 = trace || labelState || valueState;
  const row2 = checked || oneSided;
  const row3 = disabled;
  const dim1 = focused && !row1;
  const dim2 = focused && !row2;
  const dim3 = focused && !row3;
  const checkColour = oneSided ? danger : row2 ? accent : ink;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ฟอร์มสมัคร: label อีเมลผูกกับช่องกรอก checkbox ยอมรับเงื่อนไข และปุ่มสมัครที่ถูกปิด พร้อมการตรวจ value checked และ disabled"
      fontFamily="var(--rs-font)"
    >
      <Label x={328} y={36} size={16} fill={muted}>test</Label>
      <SketchRect seedKey="form/page" x={12} y={20} w={184} h={286} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={104} y={38} size={16} fill={muted}>หน้าเว็บ</Label>
      <SketchLine seedKey="form/bar" x1={14} y1={48} x2={194} y2={48} stroke={pale} strokeWidth={1.2} />

      <Label x={26} y={70} size={16} anchor="start" fill={row1 ? accent : dim1 ? pale : ink}>อีเมล</Label>
      <SketchLine seedKey="form/label-link" x1={68} y1={70} x2={90} y2={70} stroke={row1 ? accent : dim1 ? pale : ink} strokeWidth={row1 ? 2.4 : 1.5} dashed />
      <SketchRect
        seedKey="form/input"
        x={92}
        y={53}
        w={86}
        h={34}
        rounded
        stroke={row1 ? accent : dim1 ? pale : ink}
        strokeWidth={row1 ? 2.4 : 1.5}
      />
      <Label x={135} y={70} size={16} mono fill={valueState || trace ? accent : dim1 ? pale : ink}>mali@...</Label>

      {oneSided ? (
        <Label x={26} y={136} size={16} anchor="start" fill={danger}>ติ๊กตลอด</Label>
      ) : null}
      <SketchRect
        seedKey="form/checkbox"
        x={26}
        y={152}
        w={18}
        h={18}
        rounded
        stroke={oneSided ? danger : row2 ? accent : dim2 ? pale : ink}
        strokeWidth={oneSided || row2 ? 2.6 : 1.6}
      />
      <Label x={35} y={161} size={16} fill={checkColour} weight={oneSided || row2 ? 600 : undefined}>✓</Label>
      <Label x={52} y={161} size={16} anchor="start" fill={oneSided ? danger : row2 ? accent : dim2 ? pale : ink}>ยอมรับเงื่อนไข</Label>

      <SketchRect
        seedKey="form/button"
        x={26}
        y={232}
        w={92}
        h={38}
        rounded
        stroke={row3 ? accent : pale}
        strokeWidth={row3 ? 2.6 : 1.6}
        dashed={!row3}
      />
      <Label x={72} y={251} fill={row3 ? accent : pale} weight={row3 ? 600 : undefined}>สมัคร</Label>

      <SketchLine seedKey="form/c1" x1={196} y1={70} x2={208} y2={70} stroke={row1 ? accent : dim1 ? pale : ink} strokeWidth={row1 ? 2.2 : 1.4} dashed />
      <Box seed="form/q1" x={208} y={48} w={240} h={44} label='getByLabelText("อีเมล")' lit={row1} dim={dim1} mono />
      <Box seed="form/m1" x={208} y={98} w={240} h={36} label='toHaveValue("mali@...")' lit={valueState || trace} dim={dim1 || labelState} mono />

      <SketchLine seedKey="form/c2" x1={196} y1={161} x2={208} y2={161} stroke={row2 ? accent : dim2 ? pale : ink} strokeWidth={row2 ? 2.2 : 1.4} dashed />
      <Box seed="form/q2" x={208} y={139} w={240} h={44} label='getByRole("checkbox")' lit={row2} dim={dim2} mono />
      <Box seed="form/m2" x={208} y={189} w={240} h={36} label="toBeChecked" lit={checked} dim={dim2} mono />

      <SketchLine seedKey="form/c3" x1={196} y1={251} x2={208} y2={251} stroke={row3 ? accent : dim3 ? pale : ink} strokeWidth={row3 ? 2.2 : 1.4} dashed />
      <Box seed="form/q3" x={208} y={229} w={240} h={44} label='getByRole("button")' lit={row3} dim={dim3} mono />
      <SketchRect
        seedKey="form/m3"
        x={208}
        y={276}
        w={240}
        h={50}
        rounded
        stroke={row3 ? accent : dim3 ? pale : ink}
        strokeWidth={row3 ? 3 : 1.7}
      />
      <Label x={328} y={290} size={15} mono fill={row3 ? accent : dim3 ? '#8a8a8a' : ink}>toBeDisabled</Label>
      <Label x={328} y={312} size={15} mono fill={row3 ? accent : dim3 ? '#8a8a8a' : muted}>toBeEnabled</Label>
    </svg>
  );
}

type ExtraState = 'full' | 'map' | 'within' | 'visible' | 'table' | 'style';

/** Four extras: scope a query, tell visible from present, pick the right query type, check a style. */
export function ExtraCheckBoard({ state = 'full' }: { state?: ExtraState }) {
  const map = state === 'map';
  const focused = state !== 'full' && !map;
  const withinLit = state === 'within';
  const visibleLit = state === 'visible';
  const tableLit = state === 'table';
  const styleLit = state === 'style';
  const opacity = (lit: boolean) => (focused && !lit ? 0.35 : 1);

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ของเสริมสี่อย่าง: within จำกัดขอบเขต toBeVisible แยกจาก toBeInTheDocument ตาราง get query find และ toHaveStyle"
      fontFamily="var(--rs-font)"
    >
      <g opacity={opacity(withinLit)}>
        <Label x={119} y={38} size={18} weight={map || withinLit ? 600 : undefined} fill={map || withinLit ? accent : ink}>within</Label>
        {map ? <Label x={24} y={38} size={18} weight={600} fill={accent}>1</Label> : null}
        <Box seed="extra/section1" x={26} y={50} w={186} h={36} label="section 1" dim={focused && !withinLit} mono />
        <Box seed="extra/section2" x={26} y={94} w={186} h={36} label="section 2" lit={withinLit} mono />
        <SketchRect
          seedKey="extra/scope"
          x={20}
          y={88}
          w={198}
          h={48}
          rounded
          stroke={accent}
          strokeWidth={withinLit ? 2.6 : 1.4}
          dashed
        />
        <Label x={119} y={150} mono fill={withinLit ? accent : muted}>within(lists[1])</Label>
      </g>

      <g opacity={opacity(visibleLit)}>
        <Label x={341} y={38} size={18} weight={map || visibleLit ? 600 : undefined} fill={map || visibleLit ? accent : ink}>toBeVisible</Label>
        {map ? <Label x={244} y={38} size={18} weight={600} fill={accent}>2</Label> : null}
        <Box seed="extra/notice" x={247} y={50} w={188} h={54} label="ปิดปรับปรุง" note="display:none" lit={visibleLit} mono />
        <Label x={247} y={126} anchor="start" mono fill={muted}>toBeInTheDocument</Label>
        <Label x={432} y={126} size={18} fill={success} weight={600}>✓</Label>
        <Label x={247} y={152} anchor="start" mono fill={visibleLit ? danger : muted}>toBeVisible</Label>
        <Label x={432} y={152} size={18} fill={visibleLit ? danger : pale} weight={600}>✗</Label>
      </g>

      <g opacity={opacity(tableLit)}>
        <Label x={127} y={187} size={18} weight={map || tableLit ? 600 : undefined} fill={map || tableLit ? accent : ink}>get / query / find</Label>
        {map ? <Label x={18} y={187} size={18} weight={600} fill={accent}>3</Label> : null}
        <SketchRect seedKey="extra/table" x={24} y={204} w={206} h={112} rounded stroke={tableLit ? accent : ink} strokeWidth={tableLit ? 2.4 : 1.7} />
        <SketchLine seedKey="extra/tv1" x1={84} y1={204} x2={84} y2={316} stroke={pale} strokeWidth={1.2} />
        <SketchLine seedKey="extra/tv2" x1={130} y1={204} x2={130} y2={316} stroke={pale} strokeWidth={1.2} />
        <SketchLine seedKey="extra/tv3" x1={176} y1={204} x2={176} y2={316} stroke={pale} strokeWidth={1.2} />
        <SketchLine seedKey="extra/th" x1={24} y1={232} x2={230} y2={232} stroke={pale} strokeWidth={1.2} />
        <SketchLine seedKey="extra/th2" x1={24} y1={260} x2={230} y2={260} stroke={pale} strokeWidth={1.2} />
        <SketchLine seedKey="extra/th3" x1={24} y1={288} x2={230} y2={288} stroke={pale} strokeWidth={1.2} />
        <Label x={107} y={218} size={15} mono fill={muted}>0</Label>
        <Label x={153} y={218} size={15} mono fill={muted}>1</Label>
        <Label x={203} y={218} size={15} fill={muted}>หลาย</Label>
        <Label x={32} y={246} size={15} anchor="start" mono>get</Label>
        <Label x={107} y={246} size={15} fill={danger}>×</Label>
        <Label x={153} y={246} size={15} fill={success}>✓</Label>
        <Label x={203} y={246} size={15} fill={danger}>×</Label>
        <Label x={32} y={274} size={15} anchor="start" mono>query</Label>
        <Label x={107} y={274} size={15} mono>null</Label>
        <Label x={153} y={274} size={15} fill={success}>✓</Label>
        <Label x={203} y={274} size={15} fill={danger}>×</Label>
        <Label x={32} y={302} size={15} anchor="start" mono>find</Label>
        <Label x={107} y={302} size={15} fill={muted}>รอ</Label>
        <Label x={153} y={302} size={15} fill={success}>✓</Label>
        <Label x={203} y={302} size={15} fill={muted}>รอ</Label>
      </g>

      <g opacity={opacity(styleLit)}>
        <Label x={341} y={188} size={18} weight={map || styleLit ? 600 : undefined} fill={map || styleLit ? accent : ink}>toHaveStyle</Label>
        {map ? <Label x={244} y={188} size={18} weight={600} fill={accent}>4</Label> : null}
        <Box seed="extra/badge" x={247} y={206} w={130} h={54} label="ป้าย" note="display:none" lit={styleLit} mono />
        <Label x={247} y={278} anchor="start" mono fill={styleLit ? accent : ink}>toHaveStyle</Label>
        <Label x={247} y={302} anchor="start" mono fill={styleLit ? accent : ink}>("display: none")</Label>
        <Label x={432} y={290} size={18} fill={success} weight={600}>✓</Label>
      </g>

      {withinLit ? <SketchRect seedKey="extra/ring1" x={8} y={14} w={222} h={152} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {visibleLit ? <SketchRect seedKey="extra/ring2" x={230} y={14} w={222} h={152} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {tableLit ? <SketchRect seedKey="extra/ring3" x={8} y={170} w={228} h={150} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {styleLit ? <SketchRect seedKey="extra/ring4" x={230} y={170} w={222} h={150} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
    </svg>
  );
}
