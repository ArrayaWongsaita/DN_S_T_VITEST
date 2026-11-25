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
  noteSize?: number;
  lit?: boolean;
  bad?: boolean;
  dim?: boolean;
  dashed?: boolean;
  mono?: boolean;
};

function Box({ seed, x, y, w, h, label, note, size = 16, noteSize = 16, lit, bad, dim, dashed, mono }: BoxProps) {
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
        <Label x={x + w / 2} y={labelY + 27} size={noteSize} fill={bad ? danger : dim ? '#8a8a8a' : muted} mono={mono}>
          {note}
        </Label>
      ) : null}
    </g>
  );
}

type ResultProps = {
  seed: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  note?: string;
  tone: 'success' | 'danger' | 'muted';
  dim?: boolean;
};

function Result({ seed, x, y, w, h, label, note, tone, dim }: ResultProps) {
  const colour = dim ? pale : tone === 'success' ? success : tone === 'danger' ? danger : muted;
  const labelY = note ? y + h / 2 - 13 : y + h / 2;
  return (
    <g>
      <SketchRect seedKey={seed} x={x} y={y} w={w} h={h} rounded stroke={colour} strokeWidth={dim ? 1.7 : 2.4} />
      <Label x={x + w / 2} y={labelY} size={16} fill={colour} weight={dim ? undefined : 600}>
        {label}
      </Label>
      {note ? (
        <Label x={x + w / 2} y={labelY + 27} size={16} fill={colour}>
          {note}
        </Label>
      ) : null}
    </g>
  );
}

/** The opening hook: the config is missing the environment line and the run fails with a DOM error. */
export function MissingEnv() {
  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="config ที่ขาด environment: jsdom ทำให้รันแล้วเจอ ReferenceError: document is not defined" fontFamily="var(--rs-font)">
      <SketchRect seedKey="env/config" x={14} y={28} w={206} h={272} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={117} y={52} size={16} fill={muted} mono>
        vitest.config.ts
      </Label>
      <Label x={26} y={84} size={16} anchor="start" mono>
        {'export default {'}
      </Label>
      <Label x={26} y={112} size={16} anchor="start" mono>
        {'plugins: [react()],'}
      </Label>
      <Label x={26} y={140} size={16} anchor="start" mono>
        {'  test: {'}
      </Label>
      <SketchRect seedKey="env/missing" x={26} y={154} w={182} h={32} rounded stroke={danger} strokeWidth={2.2} dashed />
      <Label x={117} y={170} size={16} fill={danger} mono>
        environment: ?
      </Label>
      <Label x={117} y={212} size={16} fill={danger} weight={600}>
        ขาดบรรทัดนี้
      </Label>
      <Label x={26} y={234} size={16} anchor="start" mono>
        {'  },'}
      </Label>
      <Label x={26} y={262} size={16} anchor="start" mono>
        {'}'}
      </Label>

      <SketchArrow seedKey="env/arrow" x1={222} y1={170} x2={234} y2={170} stroke={danger} strokeWidth={2} dashed />

      <SketchRect seedKey="env/terminal" x={236} y={28} w={210} h={272} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={341} y={52} size={16} fill={muted}>
        ผลรัน
      </Label>
      <Label x={250} y={92} size={16} anchor="start" fill={muted} mono>
        $ pnpm test
      </Label>
      <Label x={250} y={142} size={16} anchor="start" fill={danger} weight={600} mono>
        ReferenceError:
      </Label>
      <Label x={250} y={172} size={16} anchor="start" fill={danger} mono>
        document is not
      </Label>
      <Label x={250} y={198} size={16} anchor="start" fill={danger} mono>
        defined
      </Label>
      <Result seed="env/failed" x={250} y={232} w={182} h={52} label="× 2 failed" tone="danger" />
    </svg>
  );
}

type RunState = 'full' | 'install' | 'check' | 'all';

/** Install once, then two ways to run: the setup check, or every lesson. */
export function SetupRun({ highlight = 'full' }: { highlight?: RunState }) {
  const all = highlight === 'full';
  const install = highlight === 'install';
  const check = highlight === 'check';
  const bad = highlight === 'all';
  const dimTop = !all && !install;
  const dimCheck = !all && !check;
  const dimAll = !all && !bad;

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="ติดตั้งด้วย pnpm install แล้วเช็กด้วย pnpm test setup-check หรือรันทุกบทด้วย pnpm test" fontFamily="var(--rs-font)">
      <Box seed="run/project" x={14} y={28} w={124} h={58} label="โปรเจกต์" note="package.json" size={18} lit={install} dim={dimTop} />
      <SketchArrow seedKey="run/a1" x1={138} y1={57} x2={176} y2={57} stroke={install ? accent : dimTop ? pale : ink} strokeWidth={install ? 2.6 : 1.8} />
      <Box seed="run/install" x={176} y={28} w={116} h={58} label="pnpm install" size={17} lit={install} dim={dimTop} />
      <SketchArrow seedKey="run/a2" x1={292} y1={57} x2={322} y2={57} stroke={install ? accent : dimTop ? pale : ink} strokeWidth={install ? 2.6 : 1.8} />
      <Box seed="run/modules" x={322} y={28} w={128} h={58} label="node_modules" size={16} lit={install} dim={dimTop} />

      <Label x={16} y={118} size={16} fill={dimCheck ? '#8a8a8a' : muted} anchor="start">
        เช็กการติดตั้ง
      </Label>
      <Box seed="run/check" x={14} y={130} w={214} h={50} label="pnpm test setup-check" size={16} lit={check} dim={dimCheck} />
      <SketchArrow seedKey="run/a3" x1={228} y1={155} x2={250} y2={155} stroke={check ? accent : dimCheck ? pale : ink} strokeWidth={check ? 2.6 : 1.8} />
      <Result seed="run/passed" x={250} y={124} w={100} h={62} label="✓ 2 passed" tone="success" dim={!all && !check} />

      <Label x={16} y={210} size={16} fill={dimAll ? '#8a8a8a' : muted} anchor="start">
        รันทุกบท
      </Label>
      <Box seed="run/all" x={14} y={222} w={126} h={50} label="pnpm test" size={16} bad={bad} dim={dimAll && !bad} />
      <SketchArrow seedKey="run/a4" x1={140} y1={247} x2={170} y2={247} stroke={bad ? danger : dimAll ? pale : ink} strokeWidth={bad ? 2.6 : 1.8} />
      <Result seed="run/todo" x={170} y={216} w={210} h={62} label="52 todo" note="ยังไม่เขียน" tone={bad ? 'danger' : 'muted'} dim={!all && !bad} />
    </svg>
  );
}

type ConfigSlot = 'plugins' | 'environment' | 'include' | 'globals' | 'setupFiles';

/** The config file as a board: one outer shelf for Vite, one test shelf for Vitest. */
export function ConfigBoard({ highlight, outside }: { highlight?: ConfigSlot; outside?: boolean }) {
  const dim = (slot: ConfigSlot) => highlight !== undefined && highlight !== slot;
  const lit = (slot: ConfigSlot) => highlight === slot;

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="vitest.config.ts: plugins อยู่ชั้นนอก และ environment, include, globals, setupFiles อยู่ใต้ test" fontFamily="var(--rs-font)">
      <SketchRect seedKey="cfg/card" x={14} y={14} w={300} h={302} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={164} y={40} size={18} fill={ink} weight={600} mono>
        vitest.config.ts
      </Label>
      <Box seed="cfg/plugins" x={30} y={58} w={268} h={44} label="plugins: react()" lit={lit('plugins')} dim={dim('plugins')} />

      <SketchLine seedKey="cfg/divider" x1={68} y1={116} x2={302} y2={116} stroke={pale} strokeWidth={1.3} />
      <Label x={30} y={116} size={16} fill={muted} anchor="start">
        test
      </Label>

      <Box seed="cfg/environment" x={30} y={130} w={268} h={36} label="environment: jsdom" lit={lit('environment')} dim={dim('environment')} />
      <Box seed="cfg/include" x={30} y={174} w={268} h={36} label="include: lessons + setup-check" lit={lit('include')} dim={dim('include')} bad={outside} />
      <Box seed="cfg/globals" x={30} y={218} w={268} h={36} label="globals: false" lit={lit('globals')} dim={dim('globals')} />
      <Box seed="cfg/setupFiles" x={30} y={262} w={268} h={36} label="setupFiles: vitest.setup.ts" lit={lit('setupFiles')} dim={dim('setupFiles')} />

      {highlight === undefined ? (
        <>
          <Box seed="cfg/file" x={326} y={120} w={120} h={64} label="ไฟล์เทส" note="เข้า config" />
          <Result seed="cfg/pass" x={326} y={220} w={120} h={64} label="✓ 2 passed" tone="success" />
        </>
      ) : null}

      {highlight === 'plugins' ? <Box seed="cfg/js" x={326} y={48} w={120} h={64} label="TSX → JS" note="plugin React" lit /> : null}
      {highlight === 'environment' ? <Box seed="cfg/page" x={326} y={118} w={120} h={64} label="หน้าเว็บ" note="document" lit /> : null}

      {highlight === 'include' && !outside ? (
        <>
          <Label x={386} y={96} size={16} fill={muted}>
            ไฟล์เทส
          </Label>
          <Box seed="cfg/lessons" x={326} y={108} w={120} h={38} label="lessons" lit />
          <Box seed="cfg/setup-check" x={326} y={154} w={120} h={38} label="setup-check" lit />
        </>
      ) : null}

      {highlight === 'globals' ? <Box seed="cfg/import" x={326} y={204} w={120} h={64} label="test / expect" note="import เอง" lit /> : null}
      {highlight === 'setupFiles' ? <Box seed="cfg/setup-file" x={326} y={258} w={120} h={64} label="setup file" note="vitest.setup.ts" lit /> : null}

      {outside ? (
        <>
          <SketchArrow seedKey="cfg/out-arrow" x1={308} y1={192} x2={326} y2={192} stroke={danger} strokeWidth={2} dashed />
          <SketchPath seedKey="cfg/out-cut" d="M312 180 L322 204" stroke={danger} strokeWidth={2.4} />
          <Box seed="cfg/outside-file" x={326} y={150} w={120} h={70} label="Cart.test.tsx" note="นอก include" bad />
        </>
      ) : null}
    </svg>
  );
}

type SetupPart = 'setup' | 'jest' | 'cleanup' | 'types';

/** The setup file's two jobs and the timeline of a test file; the editor only sees the types. */
export function SetupTimeline({ highlight, bad }: { highlight?: SetupPart; bad?: boolean }) {
  const lit = (part: SetupPart) => highlight === part;
  const dim = (part: SetupPart) => highlight !== undefined && highlight !== part;
  const cleanupBad = bad === true;
  const timelineCleanupBad = bad === true;

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="vitest.setup.ts เพิ่ม matcher ให้ expect และติดตั้ง cleanup หลังทุก test พร้อม type ให้ editor" fontFamily="var(--rs-font)">
      <Box seed="set/file" x={14} y={26} w={150} h={108} label="vitest.setup.ts" note="รันก่อนไฟล์เทส" size={16} lit={lit('setup')} dim={dim('setup')} />
      <SketchArrow seedKey="set/a1" x1={164} y1={50} x2={190} y2={47} stroke={lit('setup') ? accent : dim('jest') ? pale : ink} strokeWidth={lit('setup') ? 2.6 : 1.8} />
      <SketchArrow seedKey="set/a2" x1={164} y1={110} x2={190} y2={109} stroke={lit('setup') ? accent : dim('cleanup') ? pale : ink} strokeWidth={lit('setup') ? 2.6 : 1.8} />

      <Box seed="set/jest" x={190} y={24} w={110} h={46} label="jest-dom" lit={lit('jest')} dim={dim('jest')} />
      <SketchArrow seedKey="set/a3" x1={300} y1={47} x2={326} y2={47} stroke={lit('jest') ? accent : dim('jest') ? pale : ink} strokeWidth={lit('jest') ? 2.6 : 1.8} />
      <Box seed="set/expect" x={326} y={24} w={120} h={46} label="expect" lit={lit('jest')} dim={dim('jest')} />

      <Box seed="set/after" x={190} y={86} w={110} h={46} label="afterEach" lit={lit('cleanup')} dim={dim('cleanup')} />
      <SketchArrow seedKey="set/a4" x1={300} y1={109} x2={326} y2={109} stroke={lit('cleanup') ? accent : dim('cleanup') ? pale : ink} strokeWidth={lit('cleanup') ? 2.6 : 1.8} />
      <Box seed="set/cleanup" x={326} y={86} w={120} h={46} label="cleanup" lit={lit('cleanup')} bad={cleanupBad} dim={dim('cleanup') && !cleanupBad} />

      <SketchArrow seedKey="set/a5" x1={386} y1={132} x2={386} y2={182} stroke={cleanupBad ? danger : lit('cleanup') ? accent : pale} strokeWidth={lit('cleanup') || cleanupBad ? 2.4 : 1.8} dashed />

      <Box seed="set/test" x={190} y={182} w={110} h={48} label="test" dim={dim('cleanup') && !lit('cleanup')} />
      <SketchArrow seedKey="set/a6" x1={300} y1={206} x2={326} y2={206} stroke={lit('cleanup') ? accent : pale} strokeWidth={lit('cleanup') ? 2.4 : 1.8} />
      <Box seed="set/cleanup2" x={326} y={182} w={120} h={48} label="cleanup" lit={lit('cleanup')} bad={timelineCleanupBad} dim={dim('cleanup') && !lit('cleanup')} />

      <SketchPath seedKey="set/loop" d="M386 230 L386 252 L250 252" stroke={cleanupBad ? danger : lit('cleanup') ? accent : muted} strokeWidth={2} />
      <SketchArrow seedKey="set/loop-arrow" x1={250} y1={252} x2={250} y2={238} stroke={cleanupBad ? danger : lit('cleanup') ? accent : muted} strokeWidth={2} />
      <Label x={318} y={270} size={16} fill={cleanupBad ? danger : muted}>
        test ถัดไป
      </Label>

      {cleanupBad ? (
        <>
          <SketchPath seedKey="set/cross1" d="M338 94 L434 134" stroke={danger} strokeWidth={2.6} />
          <SketchPath seedKey="set/cross2" d="M434 94 L338 134" stroke={danger} strokeWidth={2.6} />
          <SketchRect seedKey="set/dom1" x={196} y={144} w={44} h={18} rounded stroke={danger} strokeWidth={1.8} />
          <SketchRect seedKey="set/dom2" x={202} y={152} w={44} h={18} rounded stroke={danger} strokeWidth={1.8} />
          <Label x={290} y={157} size={16} fill={danger} weight={600}>
            DOM ค้าง
          </Label>
        </>
      ) : null}

      <Label x={89} y={158} size={16} fill={muted}>
        ตอนเขียน
      </Label>
      <Box seed="set/types" x={14} y={172} w={150} h={44} label="tsconfig types" dashed={!lit('types')} lit={lit('types')} dim={dim('types')} />
      <SketchArrow seedKey="set/a7" x1={89} y1={216} x2={89} y2={238} stroke={lit('types') ? accent : pale} strokeWidth={lit('types') ? 2.4 : 1.8} />
      <Box seed="set/editor" x={14} y={238} w={150} h={44} label="editor" dashed={!lit('types')} lit={lit('types')} dim={dim('types')} />
    </svg>
  );
}

type Extra = 'full' | 'tools' | 'alias-css' | 'next' | 'globals' | 'dim';

/** The optional kit: seven settings and tools, picked only when the project needs them. */
export function ExtraKit({ highlight = 'full' }: { highlight?: Extra }) {
  const isLit = (n: number) => {
    if (highlight === 'tools') return n === 2 || n === 3 || n === 4;
    if (highlight === 'alias-css') return n === 5 || n === 6;
    if (highlight === 'next') return n === 7;
    if (highlight === 'globals') return n === 1;
    return false;
  };
  const isDim = (n: number) => highlight === 'dim' || (highlight !== 'full' && !isLit(n));

  const tiles: { n: number; x: number; y: number; label: string; note?: string }[] = [
    { n: 1, x: 14, y: 18, label: 'globals', note: 'true / false' },
    { n: 2, x: 236, y: 18, label: 'coverage', note: '@vitest/coverage-v8' },
    { n: 3, x: 14, y: 92, label: 'UI', note: '@vitest/ui' },
    { n: 4, x: 236, y: 92, label: 'VS Code', note: 'vitest.explorer' },
    { n: 5, x: 14, y: 166, label: 'alias @/', note: 'resolve.alias + paths' },
    { n: 6, x: 236, y: 166, label: 'CSS', note: 'test.css' },
    { n: 7, x: 14, y: 240, label: 'Next.js', note: 'vite-tsconfig-paths' },
  ];

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="ของเสริม: globals, coverage, UI, VS Code, alias, CSS และ Next.js" fontFamily="var(--rs-font)">
      {tiles.map((tile) => (
        <Box
          key={tile.n}
          seed={`kit/${tile.n}`}
          x={tile.x}
          y={tile.y}
          w={210}
          h={62}
          label={tile.label}
          note={tile.note}
          size={18}
          lit={isLit(tile.n)}
          dim={isDim(tile.n)}
        />
      ))}
      <Box seed="kit/8" x={236} y={240} w={210} h={62} label="เปิดเมื่อจำเป็น" dashed dim />
    </svg>
  );
}
