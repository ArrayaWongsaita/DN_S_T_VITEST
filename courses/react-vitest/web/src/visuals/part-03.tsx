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

type FindState = 'full' | 'trace' | 'query' | 'check' | 'empty' | 'miss';

/** render puts the component on the page, a query points at the text, and a matcher asks whether it is there. */
export function FindTrace({ state = 'full' }: { state?: FindState }) {
  const trace = state === 'trace';
  const query = state === 'query';
  const check = state === 'check';
  const empty = state === 'empty';
  const miss = state === 'miss';
  const fail = empty || miss;
  const dimRender = query || check;
  const dimQuery = check;
  const dimCheck = query;
  const dot = empty ? '× ไม่เจอ' : miss ? '× ไม่เจอ' : '✓ อยู่บนหน้า';
  const dotColour = fail ? danger : success;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="test ทางซ้ายวาง component ลงหน้าเว็บทางขวา แล้ว query ชี้ไปที่ข้อความ Hello, React! และ matcher ถามว่าอยู่บนหน้าไหม"
      fontFamily="var(--rs-font)"
    >
      <SketchRect seedKey="find/card" x={6} y={16} w={206} h={284} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={109} y={40} size={16} fill={muted}>
        test
      </Label>

      <Box
        seed="find/render"
        x={18}
        y={58}
        w={182}
        h={46}
        label="render(<Hello />)"
        lit={trace}
        dim={dimRender}
        mono
      />
      <SketchArrow
        seedKey="find/render-arrow"
        x1={200}
        y1={81}
        x2={238}
        y2={81}
        stroke={trace ? accent : dimRender ? pale : ink}
        strokeWidth={trace ? 2.6 : 1.8}
      />

      <Box
        seed="find/query"
        x={18}
        y={126}
        w={182}
        h={56}
        label="screen.getByText"
        note={miss ? '("hello")' : '("Hello, React!")'}
        lit={trace || query}
        dim={dimQuery}
        mono
      />
      <SketchArrow
        seedKey="find/query-arrow"
        x1={200}
        y1={154}
        x2={empty ? 330 : 264}
        y2={empty ? 120 : 118}
        stroke={fail ? danger : trace || query ? accent : dimCheck ? pale : ink}
        strokeWidth={fail || trace || query ? 2.6 : 1.8}
        dashed
      />

      <Box
        seed="find/matcher"
        x={18}
        y={204}
        w={182}
        h={50}
        label="toBeInTheDocument"
        lit={check}
        dim={dimCheck}
        mono
      />
      <Label x={109} y={280} size={18} fill={dotColour} weight={600}>
        {dot}
      </Label>

      <SketchRect seedKey="find/page" x={238} y={24} w={210} h={180} rounded stroke={ink} strokeWidth={1.7} />
      <SketchLine seedKey="find/page-bar" x1={240} y1={50} x2={446} y2={50} stroke={pale} strokeWidth={1.2} />
      <Label x={343} y={37} size={16} fill={muted}>
        หน้าเว็บ
      </Label>

      {empty ? (
        <>
          <Label x={343} y={112} size={16} fill={muted} mono>
            {'<body />'}
          </Label>
          <Label x={343} y={150} size={20} fill={danger} weight={600}>
            ×
          </Label>
        </>
      ) : (
        <>
          <SketchRect
            seedKey="find/text-box"
            x={270}
            y={94}
            w={146}
            h={36}
            rounded
            stroke={fail ? pale : trace || query ? accent : ink}
            strokeWidth={trace || query ? 2.2 : 1.5}
            dashed
          />
          <Label x={343} y={112} size={18} fill={trace || query ? accent : ink} weight={trace || query ? 600 : undefined}>
            Hello, React!
          </Label>
          {miss ? (
            <Label x={252} y={140} size={20} fill={danger} weight={600}>
              ×
            </Label>
          ) : null}
        </>
      )}
    </svg>
  );
}

type RoleState = 'full' | 'role' | 'name' | 'query' | 'bad';

/** One page, two elements: each has a role (what it is) and a name (what the user calls it). */
export function RoleBoard({ state = 'full' }: { state?: RoleState }) {
  const focused = state !== 'full';
  const bad = state === 'bad';
  const roleLit = state === 'role' || bad;
  const nameLit = state === 'name';
  const queryLit = state === 'query' || bad;
  const dimQuery = focused && !queryLit;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ตารางบนหน้า role และ name: heading สวัสดี Mali และ button ทักทาย พร้อมคำสั่ง getByRole"
      fontFamily="var(--rs-font)"
    >
      <Label x={99} y={32} size={16} fill={muted}>
        บนหน้า
      </Label>
      <Label x={250} y={32} size={16} fill={muted} mono>
        role
      </Label>
      <Label x={381} y={32} size={16} fill={muted} mono>
        name
      </Label>

      <Box seed="role/text1" x={14} y={48} w={170} h={56} label="สวัสดี Mali" dim={focused} />
      <Box seed="role/role1" x={204} y={48} w={92} h={56} label="heading" lit={roleLit} dim={focused && !roleLit} mono />
      <Box seed="role/name1" x={316} y={48} w={130} h={56} label="สวัสดี Mali" lit={nameLit} dim={focused && !nameLit} />

      <Box seed="role/text2" x={14} y={116} w={170} h={56} label="ทักทาย" dim={focused} />
      <Box seed="role/role2" x={204} y={116} w={92} h={56} label="button" lit={bad ? false : roleLit || queryLit} dim={bad ? true : focused && !roleLit && !queryLit} mono />
      <Box seed="role/name2" x={316} y={116} w={130} h={56} label="ทักทาย" lit={bad ? false : nameLit || queryLit} dim={bad ? true : focused && !nameLit && !queryLit} />

      {bad ? null : (
        <>
          <SketchArrow
            seedKey="role/a1"
            x1={250}
            y1={196}
            x2={250}
            y2={178}
            stroke={queryLit ? accent : dimQuery ? pale : ink}
            strokeWidth={queryLit ? 2.6 : 1.8}
            dashed
          />
          <SketchArrow
            seedKey="role/a2"
            x1={381}
            y1={196}
            x2={381}
            y2={178}
            stroke={queryLit ? accent : dimQuery ? pale : ink}
            strokeWidth={queryLit ? 2.6 : 1.8}
            dashed
          />
        </>
      )}

      <SketchRect
        seedKey="role/query"
        x={14}
        y={196}
        w={432}
        h={94}
        rounded
        stroke={bad ? danger : queryLit ? accent : dimQuery ? pale : ink}
        strokeWidth={queryLit ? 3 : 1.7}
        dashed={bad}
      />
      {bad ? (
        <>
          <Label x={28} y={243} size={16} anchor="start" fill={danger} weight={600} mono>
            {'getByRole("h2")'}
          </Label>
          <Label x={412} y={243} size={20} fill={danger} weight={600}>
            ×
          </Label>
        </>
      ) : (
        <>
          <Label x={28} y={226} size={16} anchor="start" fill={queryLit ? accent : dimQuery ? '#8a8a8a' : ink} mono>
            {'getByRole("button",'}
          </Label>
          <Label x={28} y={258} size={16} anchor="start" fill={queryLit ? accent : dimQuery ? '#8a8a8a' : ink} mono>
            {'{ name: "ทักทาย" })'}
          </Label>
        </>
      )}
    </svg>
  );
}

type DetailState = 'full' | 'trace' | 'text' | 'attr' | 'class' | 'price';

/** Find one element, then ask three questions about what is inside it. */
export function DetailCheck({ state = 'full' }: { state?: DetailState }) {
  const price = state === 'price';
  const focused = state !== 'full' && !price;
  const textLit = state === 'text' || price;
  const attrLit = state === 'attr';
  const classLit = state === 'class';
  const trace = state === 'trace';
  const anyRow = textLit || attrLit || classLit || trace;

  const row = (kind: 'text' | 'attr' | 'class', y: number, label: string, value: string) => {
    const lit = kind === 'text' ? textLit : kind === 'attr' ? attrLit : classLit;
    const dim = (focused || price) && !lit;
    return (
      <g key={kind}>
        <Box seed={`detail/${kind}`} x={14} y={y} w={210} h={42} label={label} lit={lit || trace} dim={dim} mono />
        <SketchArrow
          seedKey={`detail/${kind}-a`}
          x1={224}
          y1={y + 21}
          x2={250}
          y2={y + 21}
          stroke={lit || trace ? success : dim ? pale : ink}
          strokeWidth={lit || trace ? 2.4 : 1.6}
        />
        <Label x={260} y={y + 21} size={16} anchor="start" fill={dim ? '#8a8a8a' : lit || trace ? success : ink} mono>
          {value}
        </Label>
        <Label x={430} y={y + 21} size={16} fill={dim ? pale : success} weight={600}>
          ✓
        </Label>
      </g>
    );
  };

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="หาป้ายด้วย getByRole แล้วตรวจข้อความ href และ class ของ element เดียวกัน"
      fontFamily="var(--rs-font)"
    >
      <Box
        seed="detail/find"
        x={14}
        y={26}
        w={164}
        h={56}
        label={price ? 'getByText' : 'getByRole'}
        note={price ? '("250")' : '("link")'}
        bad={price}
        dim={focused || trace}
        mono
      />
      <SketchArrow
        seedKey="detail/find-arrow"
        x1={178}
        y1={58}
        x2={300}
        y2={72}
        stroke={price ? danger : trace ? accent : anyRow ? pale : ink}
        strokeWidth={price || trace ? 2.6 : 1.8}
        dashed={price}
      />
      {price ? (
        <Label x={292} y={94} size={20} fill={danger} weight={600}>
          ×
        </Label>
      ) : null}

      <SketchRect seedKey="detail/page" x={244} y={18} w={202} h={104} rounded stroke={ink} strokeWidth={1.7} />
      <SketchLine seedKey="detail/page-bar" x1={246} y1={42} x2={444} y2={42} stroke={pale} strokeWidth={1.2} />
      <Label x={345} y={30} size={16} fill={muted}>
        หน้าเว็บ
      </Label>
      <SketchRect
        seedKey="detail/badge"
        x={price ? 300 : 306}
        y={price ? 64 : 66}
        w={price ? 90 : 78}
        h={price ? 40 : 36}
        rounded
        stroke={price ? pale : trace ? accent : ink}
        strokeWidth={trace ? 2.2 : 1.5}
        dashed
      />
      <Label x={345} y={84} size={18} fill={price ? ink : trace ? accent : ink} weight={trace ? 600 : undefined}>
        {price ? '250 THB' : 'ใหม่'}
      </Label>

      {row('text', price ? 190 : 140, 'toHaveTextContent', price ? '"250"' : '"ใหม่"')}
      {price ? null : row('attr', 194, 'toHaveAttribute', 'href="/doc"')}
      {price ? null : row('class', 248, 'toHaveClass', 'badge-info')}
    </svg>
  );
}

type LadderState = 'full' | 'top' | 'testid' | 'special' | 'debug';

const RUNGS = [
  { n: 1, label: 'getByRole' },
  { n: 2, label: 'getByLabelText' },
  { n: 3, label: 'getByPlaceholderText' },
  { n: 4, label: 'getByText' },
  { n: 5, label: 'getByAltText' },
  { n: 6, label: 'getByTestId' },
];

/** The query ladder: what to try first, and the two tools for looking at what is on the page. */
export function QueryLadder({ state = 'full' }: { state?: LadderState }) {
  const top = state === 'top';
  const testid = state === 'testid';
  const special = state === 'special';
  const debug = state === 'debug';
  const dimmed = top || testid || special || debug;

  const lit = (n: number) => {
    if (top) return n <= 4;
    if (testid) return n === 6;
    if (special) return n === 3 || n === 5;
    return false;
  };

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="บันได query หกขั้นเรียงจาก getByRole ถึง getByTestId พร้อม screen.debug และ logRoles"
      fontFamily="var(--rs-font)"
    >
      <SketchLine seedKey="ladder/seen" x1={376} y1={16} x2={376} y2={210} stroke={pale} strokeWidth={1.4} />
      <SketchLine seedKey="ladder/unseen" x1={376} y1={226} x2={376} y2={258} stroke={pale} strokeWidth={1.4} dashed />
      <Label x={414} y={113} size={16} fill={muted}>
        เห็น
      </Label>
      <Label x={414} y={242} size={16} fill={muted}>
        ไม่เห็น
      </Label>

      {RUNGS.map((rung, index) => {
        const y = 16 + index * 42;
        const litRung = lit(rung.n);
        const dim = dimmed && !litRung;
        const last = rung.n === 6;
        return (
          <g key={rung.n}>
            <Label x={24} y={y + 16} size={16} fill={dim ? pale : muted}>
              {String(rung.n)}
            </Label>
            <Box
              seed={`ladder/${rung.n}`}
              x={44}
              y={y}
              w={324}
              h={32}
              label={rung.label}
              lit={litRung}
              dim={dim}
              dashed={last}
              mono
            />
          </g>
        );
      })}

      <Box seed="ladder/debug" x={44} y={280} w={170} h={36} label="screen.debug()" lit={debug} dim={dimmed && !debug} mono />
      <Box seed="ladder/roles" x={226} y={280} w={140} h={36} label="logRoles()" lit={debug} dim={dimmed && !debug} mono />
    </svg>
  );
}
