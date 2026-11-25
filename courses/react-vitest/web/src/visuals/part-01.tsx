import { roleColour, SketchArrow, SketchEllipse, SketchLine, SketchPath, SketchRect } from '../components';

const ink = '#2b2b2b';
const muted = '#646464';
const paper = '#ffffff';
const accent = roleColour('accent');
const primary = roleColour('primary');
const success = roleColour('success');
const danger = roleColour('danger');

type LabelProps = {
  x: number;
  y: number;
  children: string;
  size?: number;
  fill?: string;
  weight?: number;
};

function Label({ x, y, children, size = 18, fill = ink, weight }: LabelProps) {
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={size} fill={fill} fontWeight={weight}>
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
  size?: number;
  lit?: boolean;
  bad?: boolean;
  dim?: boolean;
  dashed?: boolean;
};

function Box({ seed, x, y, w, h, label, size = 18, lit, bad, dim, dashed }: BoxProps) {
  const stroke = bad ? danger : lit ? accent : dim ? '#b5b5b5' : ink;
  const fill = bad ? danger : lit ? accent : dim ? '#8a8a8a' : ink;
  return (
    <g>
      <SketchRect
        seedKey={seed}
        x={x}
        y={y}
        w={w}
        h={h}
        rounded
        stroke={stroke}
        strokeWidth={lit || bad ? 3 : 1.7}
        dashed={dashed}
      />
      <Label x={x + w / 2} y={y + h / 2} size={size} fill={fill} weight={lit || bad ? 600 : undefined}>
        {label}
      </Label>
    </g>
  );
}

/** The opening hook: one button changed, the other broken. */
export function BrokenButtons() {
  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="แบบฟอร์มที่ปุ่มส่งเปลี่ยนสี แต่ปุ่มยกเลิกพัง" fontFamily="var(--rs-font)">
      <SketchRect seedKey="hook/card" x={60} y={36} w={340} h={252} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={230} y={76} size={18} fill={muted}>
        แบบฟอร์ม
      </Label>
      <SketchRect seedKey="hook/field" x={100} y={104} w={260} h={42} rounded stroke="#b5b5b5" strokeWidth={1.4} />
      <Label x={230} y={125} size={16} fill="#8a8a8a">
        ชื่อ
      </Label>

      <SketchRect seedKey="hook/send" x={100} y={190} w={110} h={52} rounded stroke={primary} strokeWidth={2.6} fill={primary} fillStyle="solid" />
      <Label x={155} y={216} size={18} fill={paper} weight={600}>
        ส่ง
      </Label>

      <SketchRect seedKey="hook/cancel" x={250} y={190} w={116} h={52} rounded stroke={danger} strokeWidth={2.4} dashed />
      <Label x={308} y={216} size={18} fill={danger} weight={600}>
        ยกเลิก
      </Label>
      <SketchPath seedKey="hook/crack" d="M288 196 l-8 14 l10 9 l-6 17" stroke={danger} strokeWidth={2} />
      <Label x={308} y={266} size={16} fill={danger} weight={600}>
        พัง
      </Label>
    </svg>
  );
}

/** One check: the expected text, the page, and the comparison. `trace` points at the comparison; `blind` adds an unchecked button with a bug. */
export function CheckCard({ mode = 'full' }: { mode?: 'full' | 'trace' | 'blind' }) {
  const trace = mode === 'trace';
  const blind = mode === 'blind';
  const expectedStroke = trace ? accent : ink;
  const arrowStroke = trace ? accent : ink;

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="ใบตรวจหน้าเว็บ: สิ่งที่คาด เทียบกับข้อความบนหน้า แล้วบอกว่าผ่านหรือไม่" fontFamily="var(--rs-font)">
      <SketchRect seedKey="check/expected-card" x={20} y={40} w={170} h={180} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={105} y={68} size={16} fill={muted}>
        สิ่งที่คาด
      </Label>
      <SketchRect seedKey="check/expected-text" x={40} y={95} w={130} h={48} rounded stroke={expectedStroke} strokeWidth={trace ? 3 : 1.7} />
      <Label x={105} y={119} size={16} fill={trace ? accent : ink} weight={trace ? 600 : undefined}>
        Hello, React!
      </Label>

      <SketchArrow seedKey="check/arrow" x1={195} y1={119} x2={252} y2={119} stroke={arrowStroke} strokeWidth={trace ? 3 : 1.8} />
      <Label x={224} y={96} size={16} fill={trace ? accent : muted} weight={trace ? 600 : undefined}>
        เทียบ
      </Label>

      <SketchRect seedKey="check/browser" x={260} y={30} w={180} h={210} rounded stroke={ink} strokeWidth={1.7} />
      <SketchLine seedKey="check/browser-bar" x1={262} y1={56} x2={438} y2={56} stroke="#b5b5b5" strokeWidth={1.2} />
      <Label x={350} y={43} size={16} fill={muted}>
        หน้าเว็บ
      </Label>
      {trace ? (
        <SketchRect seedKey="check/found" x={292} y={96} w={116} h={32} rounded stroke={accent} strokeWidth={2.2} dashed />
      ) : null}
      <Label x={350} y={112} size={16} fill={trace ? accent : ink} weight={trace ? 600 : undefined}>
        Hello, React!
      </Label>

      {blind ? (
        <>
          <SketchRect seedKey="check/button" x={300} y={160} w={100} h={40} rounded stroke={danger} strokeWidth={2.4} dashed />
          <Label x={350} y={180} size={16} fill={danger} weight={600}>
            ทักทาย
          </Label>
          <SketchEllipse seedKey="check/bug" cx={410} cy={154} w={24} h={24} stroke={danger} strokeWidth={2} fill={danger} fillStyle="hachure" />
          <Label x={410} y={154} size={16} fill={danger} weight={600}>
            ×
          </Label>
        </>
      ) : null}

      {blind ? (
        <Label x={230} y={284} size={18} fill={success} weight={600}>
          ✓ ผ่าน
        </Label>
      ) : (
        <>
          <Label x={118} y={284} size={18} fill={success} weight={trace ? 600 : undefined}>
            ✓ ผ่าน
          </Label>
          <Label x={334} y={284} size={18} fill={danger}>
            × ไม่ผ่าน
          </Label>
        </>
      )}
    </svg>
  );
}

type PipelineHighlight = 'runner' | 'expect' | 'jsdom' | 'transform';

/** A test file's journey: transform, DOM, runner, assertion, result. */
export function VitestPipeline({ mode = 'full', highlight }: { mode?: 'full' | 'trace' | 'watchout'; highlight?: PipelineHighlight }) {
  const trace = mode === 'trace';
  const watchout = mode === 'watchout';
  const dimmed = highlight !== undefined && !trace;
  const fileLit = trace;
  const runnerLit = trace || highlight === 'runner';
  const transformLit = trace || highlight === 'transform';
  const jsdomLit = trace || (highlight === 'jsdom' && !watchout);
  const expectLit = highlight === 'expect';

  const arrow = (relevant: boolean) => {
    if (trace) return accent;
    if (watchout) return '#c9c9c9';
    if (relevant) return accent;
    if (highlight === 'expect') return '#c9c9c9';
    return ink;
  };

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="สายพาน Vitest: ไฟล์ test ผ่าน Vite และ jsdom ไปยัง Vitest แล้วออกผล" fontFamily="var(--rs-font)">
      <Box seed="pipe/file" x={50} y={18} w={210} h={46} label="ไฟล์ test" lit={fileLit} dim={dimmed} />
      <SketchArrow seedKey="pipe/a1" x1={155} y1={64} x2={155} y2={84} stroke={arrow(transformLit)} strokeWidth={trace || transformLit ? 2.6 : 1.8} />
      <Box seed="pipe/transform" x={50} y={84} w={210} h={46} label="Vite + plugin-react" size={16} lit={transformLit} dim={dimmed && !transformLit} />
      <SketchArrow seedKey="pipe/a2" x1={155} y1={130} x2={155} y2={150} stroke={arrow(transformLit || jsdomLit)} strokeWidth={trace || transformLit || jsdomLit ? 2.6 : 1.8} />
      <Box seed="pipe/jsdom" x={50} y={150} w={210} h={46} label="jsdom" lit={jsdomLit} bad={watchout} dim={dimmed && !jsdomLit && !watchout} />
      <SketchArrow seedKey="pipe/a3" x1={155} y1={196} x2={155} y2={216} stroke={arrow(jsdomLit || runnerLit)} strokeWidth={trace || jsdomLit || runnerLit ? 2.6 : 1.8} />
      <Box seed="pipe/runner" x={50} y={216} w={210} h={46} label="Vitest" lit={runnerLit} dim={dimmed && !runnerLit} />
      <SketchArrow seedKey="pipe/expect-link" x1={260} y1={239} x2={305} y2={239} stroke={expectLit ? accent : dimmed ? '#c9c9c9' : ink} strokeWidth={expectLit ? 2.6 : 1.8} />
      <Box seed="pipe/expect" x={305} y={216} w={115} h={46} label="expect" size={16} lit={expectLit} dim={dimmed && !expectLit} />
      <SketchArrow seedKey="pipe/a4" x1={155} y1={262} x2={155} y2={282} stroke={arrow(runnerLit)} strokeWidth={trace || runnerLit ? 2.6 : 1.8} />
      <Label x={155} y={300} size={18} fill={success} weight={600}>
        ✓ 1 passed
      </Label>

      {watchout ? (
        <>
          <SketchLine seedKey="pipe/monitor-link" x1={262} y1={173} x2={318} y2={173} stroke={danger} strokeWidth={1.6} dashed />
          <SketchRect seedKey="pipe/monitor" x={320} y={144} w={86} h={52} rounded stroke={danger} strokeWidth={2} />
          <SketchRect seedKey="pipe/screen" x={328} y={152} w={70} h={32} rounded stroke={danger} strokeWidth={1.6} />
          <SketchLine seedKey="pipe/stand" x1={363} y1={196} x2={363} y2={208} stroke={danger} strokeWidth={1.8} />
          <SketchLine seedKey="pipe/base" x1={345} y1={208} x2={381} y2={208} stroke={danger} strokeWidth={1.8} />
          <SketchPath seedKey="pipe/cross1" d="M340 158 L382 178" stroke={danger} strokeWidth={2.6} />
          <SketchPath seedKey="pipe/cross2" d="M382 158 L340 178" stroke={danger} strokeWidth={2.6} />
        </>
      ) : null}
    </svg>
  );
}

type StackHighlight = 'render' | 'query' | 'user' | 'jest';

/** The user-facing helpers around a test: RTL reads the DOM, user-event acts on it, jest-dom checks it. */
export function ToolStack({ mode = 'full', highlight }: { mode?: 'full' | 'trace' | 'wrong'; highlight?: StackHighlight }) {
  const wrong = mode === 'wrong';
  const trace = mode === 'trace';
  const dimmed = highlight !== undefined || wrong;
  const testLit = trace || highlight === 'jest';
  const rtlLit = trace || highlight === 'render' || highlight === 'query';
  const userLit = highlight === 'user';
  const jestLit = highlight === 'jest';
  const domLit = highlight === 'render';
  const buttonLit = highlight === 'query' || highlight === 'user';
  const downStroke = wrong || highlight === 'user' || highlight === 'jest' ? '#c9c9c9' : trace || rtlLit ? accent : ink;
  const buttonStroke = wrong ? '#c9c9c9' : buttonLit ? accent : ink;
  const buttonFill = wrong ? '#8a8a8a' : buttonLit ? accent : ink;

  return (
    <svg className="rs-figure" viewBox="0 0 460 330" role="img" aria-label="เครื่องมือเทส: test ใช้ RTL กับ DOM, user-event กดใช้งาน, jest-dom ตรวจคำตอบ" fontFamily="var(--rs-font)">
      <Box seed="stack/test" x={155} y={18} w={150} h={44} label="test" lit={testLit} />
      <SketchArrow
        seedKey="stack/jest-link"
        x1={305}
        y1={40}
        x2={340}
        y2={40}
        stroke={jestLit ? accent : dimmed && !wrong ? '#c9c9c9' : ink}
        strokeWidth={jestLit ? 2.6 : 1.8}
      />
      <Box seed="stack/jest" x={340} y={18} w={105} h={44} label="jest-dom" size={16} lit={jestLit} dim={trace || wrong || (dimmed && !jestLit)} />
      <SketchArrow seedKey="stack/a1" x1={230} y1={62} x2={230} y2={104} stroke={downStroke} strokeWidth={trace || highlight === 'render' ? 2.6 : 1.8} />
      <Box seed="stack/rtl" x={135} y={104} w={190} h={48} label="RTL" lit={rtlLit} dim={wrong || (dimmed && !rtlLit && !trace)} />
      <SketchArrow seedKey="stack/a2" x1={230} y1={152} x2={230} y2={210} stroke={downStroke} strokeWidth={trace || rtlLit ? 2.6 : 1.8} />

      <SketchRect seedKey="stack/dom" x={135} y={210} w={190} h={86} rounded stroke={wrong ? '#c9c9c9' : domLit ? accent : ink} strokeWidth={domLit ? 2.6 : 1.7} />
      <Label x={230} y={232} size={16} fill={wrong ? '#8a8a8a' : domLit ? accent : ink} weight={domLit ? 600 : undefined}>
        DOM (jsdom)
      </Label>
      <SketchRect seedKey="stack/button" x={185} y={250} w={90} h={32} rounded stroke={buttonStroke} strokeWidth={buttonLit ? 2.4 : 1.5} dashed={buttonLit} />
      <Label x={230} y={266} size={16} fill={buttonFill} weight={buttonLit ? 600 : undefined}>
        ทักทาย
      </Label>

      {wrong ? (
        <>
          <SketchArrow seedKey="stack/wrong-arrow" x1={155} y1={40} x2={74} y2={104} stroke={danger} strokeWidth={2.6} dashed />
          <Box seed="stack/state" x={8} y={104} w={112} h={48} label="state" size={16} bad dashed />
        </>
      ) : (
        <>
          <SketchArrow seedKey="stack/user-link" x1={112} y1={252} x2={135} y2={252} stroke={userLit ? accent : dimmed ? '#c9c9c9' : ink} strokeWidth={userLit ? 2.6 : 1.8} />
          <Box seed="stack/user" x={8} y={228} w={104} h={48} label="user-event" size={16} lit={userLit} dim={trace || (dimmed && !userLit)} />
        </>
      )}
    </svg>
  );
}
