import { roleColour, SketchArrow, SketchEllipse, SketchLine, SketchPath, SketchRect } from '../components';

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
  const labelY = note ? y + h / 2 - 13 : y + h / 2;
  return (
    <g>
      <SketchRect seedKey={seed} x={x} y={y} w={w} h={h} rounded stroke={stroke} strokeWidth={lit || good || bad ? 2.6 : 1.7} dashed={dashed} />
      <Label x={x + w / 2} y={labelY} size={size} fill={fill} weight={lit || good || bad ? 600 : undefined} mono={mono}>
        {label}
      </Label>
      {note ? (
        <Label x={x + w / 2} y={labelY + 27} size={size} fill={bad ? danger : dim ? ghost : muted} mono={mono}>
          {note}
        </Label>
      ) : null}
    </g>
  );
}

type AsyncState = 'hook' | 'full' | 'trace' | 'findBy' | 'waitFor' | 'miss';

/** Waiting for data: the page loads first, then the name arrives; findBy and waitFor retry until it does. */
export function AsyncTrace({ state = 'full' }: { state?: AsyncState }) {
  if (state === 'hook') {
    return (
      <svg
        className="rs-figure"
        viewBox="0 0 460 330"
        role="img"
        aria-label="หน้าเว็บแสดงกำลังโหลด แล้วรอไม่เกินหนึ่งวินาทีจึงแสดง Mali"
        fontFamily="var(--rs-font)"
      >
        <g opacity={0.35}>
          <SketchRect seedKey="async/hook-test" x={12} y={16} w={180} h={40} rounded stroke={pale} strokeWidth={1.4} />
          <Label x={102} y={36} fill={pale} mono>test</Label>
        </g>
        <SketchRect seedKey="async/hook-before" x={24} y={84} w={168} h={120} rounded stroke={ink} strokeWidth={1.7} />
        <SketchLine seedKey="async/hook-before-bar" x1={26} y1={108} x2={190} y2={108} stroke={pale} strokeWidth={1.2} />
        <Label x={108} y={98} fill={muted}>ก่อน</Label>
        <Label x={108} y={144} size={18}>กำลังโหลด...</Label>
        <SketchArrow seedKey="async/hook-arrow" x1={196} y1={144} x2={232} y2={144} stroke={accent} strokeWidth={2.4} />
        <SketchRect seedKey="async/hook-after" x={240} y={84} w={196} h={120} rounded stroke={accent} strokeWidth={2.4} />
        <SketchLine seedKey="async/hook-after-bar" x1={242} y1={108} x2={434} y2={108} stroke={pale} strokeWidth={1.2} />
        <Label x={338} y={98} fill={muted}>หลัง</Label>
        <Label x={338} y={144} size={20} fill={accent} weight={600}>Mali</Label>
        <Label x={338} y={178} size={18} fill={success} weight={600}>✓</Label>
        <SketchRect seedKey="async/hook-clock" x={330} y={232} w={100} h={34} rounded stroke={muted} strokeWidth={1.5} />
        <Label x={380} y={249} mono fill={muted}>สูงสุด 1s</Label>
      </svg>
    );
  }

  const focused = state !== 'full' && state !== 'miss';
  const trace = state === 'trace';
  const findBy = state === 'findBy';
  const wait = state === 'waitFor';
  const miss = state === 'miss';
  const dim = (lit: boolean) => focused && !lit;
  const laneFind = miss ? pale : findBy ? accent : trace || wait ? pale : ink;
  const laneWait = wait ? accent : trace || findBy || miss ? pale : ink;
  const t0Stroke = miss ? danger : wait ? accent : ink;
  const t1Stroke = trace || findBy ? accent : wait ? success : miss ? pale : ink;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="test ทางซ้ายรอ findBy และ waitFor; หน้าเว็บทางขวาเปลี่ยนจากกำลังโหลดเป็น Mali หลัง Promise"
      fontFamily="var(--rs-font)"
    >
      <SketchRect seedKey="async/card" x={8} y={16} w={204} h={180} rounded stroke={trace ? pale : ink} strokeWidth={1.7} />
      <g opacity={trace ? 0.45 : 1}>
        <Label x={110} y={34} fill={muted} mono>test</Label>
        <Box seed="async/render" x={18} y={48} w={184} h={34} label={'render(UserCard)'} dim={focused} mono />
        <Box seed="async/find" x={18} y={88} w={184} h={36} label={'findByText("Mali")'} lit={findBy} bad={miss} dim={dim(findBy)} mono />
        <Box seed="async/wait" x={18} y={130} w={184} h={36} label="waitFor(...)" lit={wait} dim={dim(wait)} mono />
        <Label x={110} y={184} size={18} fill={miss ? danger : trace ? pale : success} weight={600}>
          {miss ? '× ไม่เจอ' : '✓ ผ่าน'}
        </Label>
      </g>

      <g opacity={miss ? 1 : 1}>
        <SketchRect seedKey="async/t0" x={228} y={16} w={220} h={78} rounded stroke={t0Stroke} strokeWidth={wait || miss ? 2.4 : 1.7} />
        <Label x={238} y={32} anchor="start" fill={miss ? danger : muted}>ก่อน Promise</Label>
        <Label x={338} y={64} size={18} fill={miss ? danger : ink}>กำลังโหลด...</Label>
      </g>

      <SketchArrow
        seedKey="async/promise"
        x1={338}
        y1={94}
        x2={338}
        y2={108}
        stroke={miss ? pale : trace || wait || findBy ? accent : ink}
        strokeWidth={trace || wait || findBy ? 2.4 : 1.8}
        dashed={miss}
      />

      <g opacity={miss ? 0.3 : 1}>
        <SketchRect seedKey="async/t1" x={228} y={108} w={220} h={78} rounded stroke={t1Stroke} strokeWidth={trace || findBy || wait ? 2.4 : 1.7} />
        <Label x={238} y={124} anchor="start" fill={muted}>หลัง Promise</Label>
        <Label x={338} y={156} size={20} fill={trace || findBy ? accent : wait ? success : ink} weight={trace || findBy || wait ? 600 : undefined}>
          Mali
        </Label>
      </g>

      {miss ? (
        <>
          <SketchArrow seedKey="async/miss-arrow" x1={204} y1={106} x2={226} y2={64} stroke={danger} strokeWidth={2.4} dashed />
          <Label x={216} y={78} size={18} fill={danger} weight={600}>×</Label>
        </>
      ) : null}

      <g opacity={trace ? 0.45 : miss ? 0.45 : 1}>
        <SketchRect seedKey="async/lane-find" x={8} y={204} w={444} h={50} rounded stroke={laneFind} strokeWidth={findBy ? 2.4 : 1.5} dashed />
        <Label x={20} y={220} anchor="start" fill={findBy ? accent : trace ? pale : miss ? pale : ink}>
          findBy: ลองซ้ำทุก 50ms
        </Label>
        <Label x={20} y={240} anchor="start" fill={findBy ? accent : muted}>จนเจอ หรือครบ 1s</Label>
      </g>

      <g opacity={trace ? 0.45 : miss ? 0.45 : 1}>
        <SketchRect seedKey="async/lane-wait" x={8} y={264} w={444} h={50} rounded stroke={laneWait} strokeWidth={wait ? 2.4 : 1.5} dashed />
        <Label x={20} y={280} anchor="start" fill={wait ? accent : ink}>waitFor: ตรวจซ้ำทั้งก้อน</Label>
        <Label x={20} y={300} anchor="start" fill={wait ? accent : muted}>expect(...) จนผ่าน</Label>
      </g>
    </svg>
  );
}

type FetchState = 'full' | 'trace' | 'spy' | 'mock' | 'restore' | 'miss';

/** fetch is a wire; the test swaps the real wire for a fake Response, then restores it. */
export function FetchSwitch({ state = 'full' }: { state?: FetchState }) {
  const focused = state !== 'full' && state !== 'miss';
  const trace = state === 'trace';
  const spy = state === 'spy';
  const mock = state === 'mock';
  const restore = state === 'restore';
  const miss = state === 'miss';
  const lever = miss ? danger : trace || spy ? accent : ink;
  const realFill = restore ? accent : focused && !restore ? pale : ink;
  const fakeFill = miss ? danger : trace || spy ? accent : restore ? pale : ink;
  const responseStroke = miss ? danger : mock || trace ? accent : ink;
  const listStroke = miss ? danger : trace || mock ? accent : ink;
  const restoreStroke = restore ? accent : miss ? pale : trace || spy || mock ? pale : ink;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="PostList เรียก fetch ผ่านสวิตช์ไปยัง Response ปลอม แล้วได้ลิสต์โพสต์ และ restoreAllMocks คืน fetch จริง"
      fontFamily="var(--rs-font)"
    >
      <g opacity={mock || restore ? 0.45 : 1}>
        <SketchRect seedKey="fetch/post-card" x={8} y={52} w={124} h={104} rounded stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.7} />
        <Label x={70} y={74} fill={trace ? accent : ink} weight={trace ? 600 : undefined}>PostList</Label>
        <Label x={70} y={102} mono fill={trace ? accent : ink}>fetch(</Label>
        <Label x={70} y={124} mono fill={trace ? accent : ink}>"/api/posts")</Label>
        <Label x={70} y={146} fill={muted}>component</Label>
      </g>
      <SketchArrow seedKey="fetch/wire" x1={132} y1={104} x2={164} y2={104} stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.8} />

      <g opacity={mock ? 0.45 : 1}>
        <SketchRect seedKey="fetch/switch" x={164} y={40} w={112} h={128} rounded stroke={spy || miss ? accent : ink} strokeWidth={spy || miss ? 2.4 : 1.7} />
        <Label x={220} y={60} mono fill={trace || spy ? accent : ink} weight={trace || spy ? 600 : undefined}>fetch</Label>
        <Label x={220} y={82} mono fill={muted}>globalThis</Label>
        <Label x={180} y={112} anchor="start" fill={realFill}>จริง</Label>
        <Label x={180} y={152} anchor="start" fill={fakeFill}>ปลอม</Label>
        <SketchLine seedKey="fetch/lever-real" x1={220} y1={132} x2={244} y2={112} stroke={realFill} strokeWidth={restore ? 2.4 : 1.5} dashed={!restore} />
        <SketchLine seedKey="fetch/lever-fake" x1={220} y1={132} x2={244} y2={152} stroke={lever} strokeWidth={trace || spy || miss ? 2.4 : 1.8} dashed={restore} />
        <SketchEllipse seedKey="fetch/pivot" cx={220} cy={132} w={9} h={9} stroke={ink} strokeWidth={1.5} fill={ink} fillStyle="solid" />
      </g>

      <SketchArrow seedKey="fetch/to-response" x1={276} y1={84} x2={292} y2={84} stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.8} />

      <g opacity={spy || restore ? 0.45 : 1}>
        <SketchRect seedKey="fetch/response" x={292} y={24} w={160} h={120} rounded stroke={responseStroke} strokeWidth={mock || trace || miss ? 2.4 : 1.7} />
        <Label x={372} y={44} mono fill={miss ? danger : mock || trace ? accent : ink} weight={mock || trace ? 600 : undefined}>Response</Label>
        <SketchLine seedKey="fetch/response-bar" x1={294} y1={58} x2={450} y2={58} stroke={pale} strokeWidth={1.2} />
        {miss ? (
          <>
            <Label x={372} y={76} mono fill={ink}>ok: true</Label>
            <SketchRect seedKey="fetch/missing-json" x={306} y={90} w={132} h={30} rounded stroke={danger} strokeWidth={2.2} dashed />
            <Label x={372} y={105} mono fill={danger} size={16}>ไม่มี json()</Label>
            <Label x={372} y={132} mono fill={danger}>[...]</Label>
          </>
        ) : (
          <>
            <Label x={372} y={76} mono fill={ink}>ok: true</Label>
            <Label x={372} y={100} mono fill={ink}>json: async</Label>
            <Label x={372} y={124} mono fill={ink}>() =&gt; [...]</Label>
          </>
        )}
      </g>

      <SketchArrow seedKey="fetch/to-list" x1={372} y1={144} x2={372} y2={160} stroke={miss ? pale : trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.8} dashed={miss} />

      <g opacity={spy || mock || restore ? 0.45 : 1}>
        <SketchRect seedKey="fetch/list" x={292} y={160} w={160} h={96} rounded stroke={listStroke} strokeWidth={trace || mock || miss ? 2.4 : 1.7} />
        <Label x={372} y={180} fill={miss ? danger : muted}>หน้าเว็บ</Label>
        {miss ? (
          <>
            <Label x={372} y={208} fill={danger}>กำลังโหลด...</Label>
            <Label x={436} y={208} size={18} fill={danger} weight={600}>×</Label>
            <Label x={372} y={236} fill={pale}>โพสต์แรก</Label>
          </>
        ) : (
          <>
            <Label x={372} y={208} fill={trace || mock ? accent : ink}>โพสต์แรก</Label>
            <Label x={372} y={236} fill={ink}>โพสต์ที่สอง</Label>
          </>
        )}
      </g>

      <SketchLine seedKey="fetch/restore-1" x1={372} y1={256} x2={372} y2={292} stroke={restoreStroke} strokeWidth={restore ? 2.2 : 1.5} dashed />
      <SketchLine seedKey="fetch/restore-2" x1={372} y1={292} x2={276} y2={292} stroke={restoreStroke} strokeWidth={restore ? 2.2 : 1.5} dashed />
      <SketchArrow seedKey="fetch/restore-3" x1={276} y1={292} x2={276} y2={170} stroke={restoreStroke} strokeWidth={restore ? 2.4 : 1.5} dashed />
      <Label x={324} y={278} fill={restore ? accent : muted} mono>afterEach</Label>
      <Label x={324} y={306} fill={restore ? accent : muted} mono>restoreAllMocks()</Label>
    </svg>
  );
}

type BranchState = 'full' | 'trace' | 'rejected' | 'empty' | 'normal' | 'miss';

/** One page, four states: loading, failed alert, empty, and a list. */
export function StateBranches({ state = 'full' }: { state?: BranchState }) {
  const focused = state !== 'full';
  const trace = state === 'trace';
  const rejected = state === 'rejected';
  const empty = state === 'empty';
  const normal = state === 'normal';
  const miss = state === 'miss';
  const dim = (lit: boolean) => focused && !lit;
  const failedStroke = rejected || miss ? danger : normal ? success : ink;
  const listStroke = trace || normal ? success : miss ? danger : ink;
  const emptyStroke = empty ? accent : ink;
  const loadingStroke = focused ? pale : ink;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="SafePostList แยกสี่ทาง: กำลังโหลด โหลดพังด้วย alert ไม่มีโพสต์ และลิสต์โพสต์"
      fontFamily="var(--rs-font)"
    >
      <SketchRect seedKey="branches/component" x={8} y={100} w={120} h={120} rounded stroke={trace ? accent : ink} strokeWidth={trace ? 2.4 : 1.7} />
      <Label x={68} y={124} fill={trace ? accent : ink} weight={trace ? 600 : undefined}>SafePostList</Label>
      <Label x={68} y={150} mono fill={ink}>fetch(</Label>
      <Label x={68} y={172} mono fill={ink}>"/api/posts")</Label>
      <Label x={68} y={198} fill={muted}>component</Label>
      <SketchEllipse seedKey="branches/fork" cx={128} cy={160} w={10} h={10} stroke={ink} strokeWidth={1.4} fill={ink} fillStyle="solid" />

      <g opacity={focused && !trace && !normal ? 0.35 : trace || normal ? 0.35 : 1}>
        <SketchRect seedKey="branches/loading" x={240} y={12} w={208} h={54} rounded stroke={loadingStroke} strokeWidth={1.7} />
        <Label x={344} y={39} size={18} fill={focused ? pale : ink}>กำลังโหลด...</Label>
      </g>

      <g opacity={rejected || miss ? 1 : normal ? 0.35 : focused ? 0.35 : 1}>
        <SketchRect seedKey="branches/failed" x={240} y={78} w={208} h={64} rounded stroke={failedStroke} strokeWidth={rejected || miss || normal ? 2.4 : 1.7} />
        <Label x={344} y={100} size={18} fill={rejected || miss ? danger : normal ? pale : ink}>โหลดไม่สำเร็จ</Label>
        <Label x={344} y={124} fill={rejected || miss ? danger : normal ? success : muted}>
          {normal ? '✓ ไม่มี alert' : 'role="alert"'}
        </Label>
      </g>

      <g opacity={empty ? 1 : focused ? 0.35 : 1}>
        <SketchRect seedKey="branches/empty" x={240} y={154} w={208} h={54} rounded stroke={emptyStroke} strokeWidth={empty ? 2.4 : 1.7} />
        <Label x={344} y={181} size={18} fill={empty ? accent : ink}>ยังไม่มีโพสต์</Label>
      </g>

      <g opacity={trace || normal ? 1 : focused ? 0.35 : 1}>
        <SketchRect seedKey="branches/list" x={240} y={220} w={208} h={86} rounded stroke={listStroke} strokeWidth={trace || normal || miss ? 2.4 : 1.7} />
        <Label x={344} y={240} fill={trace || normal ? success : miss ? danger : muted}>ลิสต์</Label>
        <Label x={344} y={264} fill={trace || normal ? success : miss ? pale : ink}>โพสต์แรก</Label>
        <Label x={344} y={288} fill={trace || normal ? success : miss ? pale : ink}>โพสต์ที่สอง</Label>
        {miss ? <Label x={438} y={240} size={18} fill={danger} weight={600}>×</Label> : null}
      </g>

      <SketchArrow seedKey="branches/to-loading" x1={132} y1={156} x2={238} y2={39} stroke={focused ? pale : ink} strokeWidth={1.6} />
      <SketchArrow seedKey="branches/to-failed" x1={132} y1={160} x2={238} y2={110} stroke={rejected || miss ? danger : normal ? success : focused ? pale : ink} strokeWidth={rejected || miss || normal ? 2.4 : 1.6} />
      <SketchArrow seedKey="branches/to-empty" x1={132} y1={164} x2={238} y2={181} stroke={empty ? accent : focused ? pale : ink} strokeWidth={empty ? 2.4 : 1.6} />
      <SketchArrow seedKey="branches/to-list" x1={132} y1={168} x2={238} y2={263} stroke={trace || normal ? success : miss ? danger : focused ? pale : ink} strokeWidth={trace || normal || miss ? 2.4 : 1.6} />

      <Label x={190} y={78} fill={focused && !trace ? pale : muted}>ยังไม่เสร็จ</Label>
      <Label x={190} y={124} fill={rejected || miss ? danger : normal ? success : muted}>{normal ? '✓' : 'throw'}</Label>
      <Label x={190} y={198} fill={empty ? accent : muted}>len 0</Label>
      <Label x={190} y={246} fill={trace || normal ? success : miss ? danger : muted}>[post]</Label>
      {miss ? <Label x={190} y={96} fill={danger} weight={600}>ok หาย</Label> : null}
    </svg>
  );
}

type ExtraState = 'full' | 'map' | 'removed' | 'timers' | 'stub' | 'msw' | 'act';

/** Five async follow-ups: wait for removal, fake timers, stubGlobal, MSW, and the act warning. */
export function AsyncExtras({ state = 'full' }: { state?: ExtraState }) {
  const map = state === 'map';
  const focused = state !== 'full' && !map;
  const removed = state === 'removed';
  const timers = state === 'timers';
  const stub = state === 'stub';
  const msw = state === 'msw';
  const act = state === 'act';
  const opacity = (lit: boolean) => (focused && !lit ? 0.35 : 1);
  const content = map ? 0.45 : 1;
  const header = (center: number, left: number, y: number, text: string, lit: boolean) => (
    <Label x={map ? left + 28 : center} y={y} anchor={map ? 'start' : 'middle'} fill={lit ? accent : ink} weight={lit ? 600 : undefined}>
      {text}
    </Label>
  );

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ห้าท่า async: waitForElementToBeRemoved, fake timers, vi.stubGlobal, MSW และ act warning"
      fontFamily="var(--rs-font)"
    >
      <g opacity={map ? content : opacity(removed)}>
        <SketchRect seedKey="extras/removed" x={12} y={16} w={212} h={132} rounded stroke={removed ? accent : ink} strokeWidth={removed ? 2.4 : 1.7} />
        {header(118, 12, 36, 'รอของหาย', removed)}
        <SketchRect seedKey="extras/loading-card" x={24} y={54} w={96} h={38} rounded stroke={removed ? accent : ink} strokeWidth={1.6} />
        <Label x={72} y={73} fill={removed ? accent : ink}>โหลด...</Label>
        <SketchArrow seedKey="extras/removed-arrow" x1={122} y1={73} x2={136} y2={73} stroke={accent} strokeWidth={2.2} />
        <SketchRect seedKey="extras/name-card" x={136} y={54} w={76} h={38} rounded stroke={success} strokeWidth={1.8} />
        <Label x={174} y={73} fill={success} weight={600}>Mali</Label>
        <Label x={118} y={110} mono fill={removed ? accent : muted}>waitForElement</Label>
        <Label x={118} y={132} mono fill={removed ? accent : muted}>ToBeRemoved</Label>
      </g>

      <g opacity={map ? content : opacity(timers)}>
        <SketchRect seedKey="extras/timers" x={236} y={16} w={212} h={132} rounded stroke={timers ? accent : ink} strokeWidth={timers ? 2.4 : 1.7} />
        {header(342, 236, 36, 'fake timers', timers)}
        <SketchRect seedKey="extras/clock" x={252} y={54} w={64} h={64} rounded stroke={timers ? accent : ink} strokeWidth={2} />
        <Label x={284} y={86} size={20} fill={timers ? accent : ink} weight={600}>1s</Label>
        <SketchArrow seedKey="extras/timers-arrow" x1={318} y1={86} x2={334} y2={86} stroke={accent} strokeWidth={2.2} />
        <SketchRect seedKey="extras/ready" x={334} y={68} w={96} h={36} rounded stroke={success} strokeWidth={1.8} />
        <Label x={382} y={86} fill={success} weight={600}>พร้อม</Label>
        <Label x={342} y={132} mono fill={timers ? accent : muted}>advanceTimers</Label>
      </g>

      <g opacity={map ? content : opacity(stub)}>
        <SketchRect seedKey="extras/stub" x={12} y={160} w={136} h={162} rounded stroke={stub ? accent : ink} strokeWidth={stub ? 2.4 : 1.7} />
        {header(80, 12, 182, 'stubGlobal', stub)}
        <Label x={80} y={205} mono fill={stub ? accent : muted}>globalThis</Label>
        <SketchRect seedKey="extras/fetch-slot" x={24} y={223} w={112} h={30} rounded stroke={stub ? accent : ink} strokeWidth={1.8} />
        <Label x={80} y={238} mono fill={stub ? accent : ink}>fetch</Label>
        <SketchArrow seedKey="extras/stub-arrow" x1={80} y1={253} x2={80} y2={263} stroke={stub ? accent : ink} strokeWidth={1.8} />
        <SketchRect seedKey="extras/fake-slot" x={24} y={263} w={112} h={28} rounded stroke={stub ? accent : ink} strokeWidth={1.6} dashed />
        <Label x={80} y={277} fill={stub ? accent : ink}>ของปลอม</Label>
        <Label x={80} y={306} fill={muted}>unstub</Label>
      </g>

      <g opacity={map ? content : opacity(msw)}>
        <SketchRect seedKey="extras/msw" x={160} y={160} w={136} h={162} rounded stroke={msw ? accent : ink} strokeWidth={msw ? 2.4 : 1.7} />
        {header(228, 160, 182, 'MSW', msw)}
        <SketchRect seedKey="extras/msw-fetch" x={172} y={212} w={112} h={28} rounded stroke={msw ? accent : ink} strokeWidth={1.6} />
        <Label x={228} y={226} mono fill={msw ? accent : ink}>fetch</Label>
        <SketchArrow seedKey="extras/msw-arrow1" x1={228} y1={240} x2={228} y2={250} stroke={msw ? accent : ink} strokeWidth={1.6} />
        <SketchRect seedKey="extras/handlers" x={172} y={250} w={112} h={30} rounded stroke={msw ? accent : ink} strokeWidth={1.8} />
        <Label x={228} y={265} mono fill={msw ? accent : ink}>handlers</Label>
        <SketchArrow seedKey="extras/msw-arrow2" x1={228} y1={280} x2={228} y2={290} stroke={msw ? accent : ink} strokeWidth={1.6} />
        <SketchRect seedKey="extras/network" x={172} y={290} w={112} h={26} rounded stroke={msw ? accent : ink} strokeWidth={1.5} />
        <Label x={228} y={303} mono fill={msw ? accent : ink}>network</Label>
      </g>

      <g opacity={map ? content : opacity(act)}>
        <SketchRect seedKey="extras/act" x={308} y={160} w={140} h={162} rounded stroke={act ? danger : ink} strokeWidth={act ? 2.4 : 1.7} />
        {header(378, 308, 182, 'act warning', act)}
        <SketchRect seedKey="extras/console" x={316} y={212} w={124} h={90} rounded stroke={act ? danger : ink} strokeWidth={1.7} />
        <Label x={378} y={232} fill={muted}>console</Label>
        <Label x={378} y={258} mono fill={act ? danger : ink}>not wrapped</Label>
        <Label x={378} y={284} mono fill={act ? danger : ink}>in act(...)</Label>
        <SketchEllipse seedKey="extras/warning" cx={424} cy={236} w={12} h={12} stroke={danger} strokeWidth={1.6} fill={danger} fillStyle="solid" />
        <Label x={424} y={236} size={14} fill="#fff" weight={600}>!</Label>
      </g>

      {map ? (
        <>
          <Label x={24} y={38} size={18} weight={600} fill={accent}>1</Label>
          <Label x={248} y={38} size={18} weight={600} fill={accent}>2</Label>
          <Label x={24} y={184} size={18} weight={600} fill={accent}>3</Label>
          <Label x={172} y={184} size={18} weight={600} fill={accent}>4</Label>
          <Label x={320} y={184} size={18} weight={600} fill={accent}>5</Label>
        </>
      ) : null}

      {focused && removed ? <SketchRect seedKey="extras/ring1" x={4} y={8} w={228} h={148} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && timers ? <SketchRect seedKey="extras/ring2" x={228} y={8} w={228} h={148} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && stub ? <SketchRect seedKey="extras/ring3" x={4} y={152} w={152} h={176} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && msw ? <SketchRect seedKey="extras/ring4" x={152} y={152} w={152} h={176} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && act ? <SketchRect seedKey="extras/ring5" x={300} y={152} w={156} h={176} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
    </svg>
  );
}
