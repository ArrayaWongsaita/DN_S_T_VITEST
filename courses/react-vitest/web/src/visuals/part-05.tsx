import { roleColour, SketchArrow, SketchLine, SketchPath, SketchRect } from '../components';

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

function Cursor({ x, y, colour = accent }: { x: number; y: number; colour?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <SketchPath
        seedKey="part05/cursor"
        d="M0 0 L0 17 L4 13 L7 21 L11 19 L8 11 L15 10 Z"
        stroke={colour}
        strokeWidth={1.6}
        fill={colour}
        fillStyle="solid"
      />
    </g>
  );
}

type ClickState = 'hook' | 'full' | 'trace' | 'setup' | 'click' | 'await' | 'miss';

/** A click is a full interaction: the test sets up a user, clicks, waits, then checks the page. */
export function ClickTrace({ state = 'full' }: { state?: ClickState }) {
  const hook = state === 'hook';
  const trace = state === 'trace';
  const setup = state === 'setup';
  const click = state === 'click';
  const wait = state === 'await';
  const miss = state === 'miss';
  const focused = !hook && state !== 'full';
  const setupLit = setup;
  const clickLit = trace || click || miss;
  const expectLit = wait;
  const expectBad = miss;
  const eventsLit = trace || click;
  const dim = (lit: boolean) => focused && !lit;

  if (hook) {
    return (
      <svg
        className="rs-figure"
        viewBox="0 0 460 330"
        role="img"
        aria-label="เคอร์เซอร์กดปุ่ม +1 บนหน้าเว็บ แล้วตัวเลขเปลี่ยนจาก Count 0 เป็น Count 1"
        fontFamily="var(--rs-font)"
      >
        <Label x={124} y={54} fill={muted}>ก่อนกด</Label>
        <Label x={324} y={54} fill={muted}>หลังกด</Label>
        <SketchRect seedKey="click/hook-before" x={40} y={72} w={168} h={136} rounded stroke={ink} strokeWidth={1.7} />
        <SketchLine seedKey="click/hook-before-bar" x1={42} y1={94} x2={206} y2={94} stroke={pale} strokeWidth={1.2} />
        <Label x={124} y={118} size={20}>Count: 0</Label>
        <SketchRect seedKey="click/hook-button" x={76} y={134} w={64} h={32} rounded stroke={ink} strokeWidth={2} />
        <Label x={108} y={150}>+1</Label>
        <Cursor x={124} y={132} />

        <SketchArrow seedKey="click/hook-arrow" x1={212} y1={140} x2={236} y2={140} stroke={accent} strokeWidth={2.4} />

        <SketchRect seedKey="click/hook-after" x={240} y={72} w={168} h={136} rounded stroke={accent} strokeWidth={2.4} />
        <SketchLine seedKey="click/hook-after-bar" x1={242} y1={94} x2={406} y2={94} stroke={pale} strokeWidth={1.2} />
        <Label x={324} y={118} size={20} fill={accent} weight={600}>Count: 1</Label>
        <Label x={324} y={164} size={20} fill={success} weight={600}>✓</Label>
      </svg>
    );
  }

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="test ทางซ้ายมี setup render click และ expect; หน้าเว็บทางขวาเปลี่ยน Count 0 เป็น Count 1 และแสดงลำดับ event หกตัวของ click"
      fontFamily="var(--rs-font)"
    >
      <SketchRect seedKey="click/card" x={2} y={16} w={230} h={200} rounded stroke={ink} strokeWidth={1.7} />
      <Label x={117} y={38} fill={muted}>test</Label>
      {setup ? (
        <>
          <SketchRect seedKey="click/user-chip" x={150} y={26} w={64} h={24} rounded stroke={accent} strokeWidth={1.8} />
          <Label x={182} y={38} size={16} fill={accent} weight={600}>user</Label>
        </>
      ) : null}

      <Box seed="click/setup" x={12} y={48} w={206} h={36} label="setup()" lit={setupLit} dim={dim(setupLit)} mono />
      <Box seed="click/render" x={12} y={90} w={206} h={36} label="render()" dim={focused} mono />
      <Box seed="click/click" x={12} y={132} w={206} h={40} label="user.click(+1)" lit={clickLit} bad={miss} dim={dim(clickLit)} mono />
      <Box seed="click/expect" x={12} y={178} w={206} h={36} label="expect(Count: 1)" lit={expectLit} bad={expectBad} dim={dim(expectLit)} mono />

      {setup ? null : (
        <Label x={117} y={232} size={18} fill={miss ? danger : success} weight={600}>
          {miss ? '× ไม่เจอ' : '✓ ผ่าน'}
        </Label>
      )}

      <SketchArrow
        seedKey="click/action-arrow"
        x1={218}
        y1={152}
        x2={miss ? 286 : 302}
        y2={miss ? 106 : 96}
        stroke={miss ? danger : clickLit ? accent : focused ? pale : ink}
        strokeWidth={miss || clickLit ? 2.4 : 1.8}
        dashed={miss}
      />
      {miss ? <Label x={292} y={106} size={20} fill={danger} weight={600}>×</Label> : null}

      <g opacity={setup || wait ? 0.45 : 1}>
        <SketchRect seedKey="click/page1" x={238} y={24} w={210} h={96} rounded stroke={ink} strokeWidth={1.7} />
        <SketchLine seedKey="click/page1-bar" x1={240} y1={44} x2={446} y2={44} stroke={pale} strokeWidth={1.2} />
        <Label x={343} y={34} fill={muted}>หน้าเว็บ</Label>
        <Label x={343} y={66} size={20}>Count: 0</Label>
        <SketchRect seedKey="click/page1-button" x={306} y={80} w={64} h={30} rounded stroke={ink} strokeWidth={2} />
        <Label x={338} y={95}>+1</Label>
        <Cursor x={354} y={82} colour={miss ? danger : accent} />
      </g>

      {miss ? null : (
        <>
          <SketchArrow
            seedKey="click/down"
            x1={343}
            y1={120}
            x2={343}
            y2={144}
            stroke={wait ? accent : ink}
            strokeWidth={wait ? 2.6 : 1.8}
          />
          {wait ? <Label x={358} y={132} fill={accent} mono anchor="start">await</Label> : null}
          <SketchRect seedKey="click/page2" x={238} y={146} w={210} h={96} rounded stroke={wait ? accent : ink} strokeWidth={wait ? 2.4 : 1.7} />
          <SketchLine seedKey="click/page2-bar" x1={240} y1={166} x2={446} y2={166} stroke={pale} strokeWidth={1.2} />
          <Label x={343} y={188} size={20} fill={wait ? accent : ink} weight={wait ? 600 : undefined}>Count: 1</Label>
          <Label x={430} y={188} size={18} fill={success} weight={600}>✓</Label>
        </>
      )}

      <Label x={12} y={258} anchor="start" fill={dim(eventsLit) ? pale : muted}>event ที่ถูกยิง</Label>
      <Label x={12} y={282} anchor="start" mono fill={dim(eventsLit) ? pale : eventsLit ? accent : ink}>
        pointerdown · mousedown · focus
      </Label>
      <Label x={12} y={304} anchor="start" mono fill={dim(eventsLit) ? pale : eventsLit ? accent : ink}>
        pointerup · mouseup · click
      </Label>
    </svg>
  );
}

type TypeState = 'full' | 'trace' | 'type' | 'clear' | 'append';

/** Typing and clearing: every character updates the input, and clearing resets the greeting. */
export function TypeField({ state = 'full' }: { state?: TypeState }) {
  const trace = state === 'trace';
  const type = state === 'type';
  const clear = state === 'clear';
  const append = state === 'append';
  const focused = state !== 'full';
  const topLit = trace || type;
  const bottomLit = clear;
  const topDim = focused && !topLit && !append;
  const bottomDim = focused && !bottomLit && !append;
  const keysLit = trace || type;
  const keysDim = focused && !keysLit && !append;
  const topHeader = append ? 'ไม่ clear' : 'หน้าเว็บ';
  const bottomHeader = append ? 'clear ก่อน' : 'หลัง clear';

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ช่องชื่อพิมพ์ Mali แล้วคำทักทายเปลี่ยน และเมื่อ clear ช่องว่างคำทักทายกลับเป็นคนแปลกหน้า"
      fontFamily="var(--rs-font)"
    >
      <SketchRect
        seedKey="type/page1"
        x={12}
        y={16}
        w={236}
        h={136}
        rounded
        stroke={append ? danger : topLit ? accent : topDim ? pale : ink}
        strokeWidth={append || topLit ? 2.4 : 1.7}
      />
      <SketchLine seedKey="type/page1-bar" x1={14} y1={40} x2={246} y2={40} stroke={pale} strokeWidth={1.2} />
      <Label x={130} y={29} fill={append ? danger : topDim ? pale : muted}>{topHeader}</Label>
      <Label x={28} y={58} anchor="start" fill={append ? danger : topDim ? pale : ink}>ชื่อ</Label>
      <SketchRect
        seedKey="type/input1"
        x={28}
        y={70}
        w={204}
        h={38}
        rounded
        stroke={append ? danger : topLit ? accent : topDim ? pale : ink}
        strokeWidth={append || topLit ? 2.2 : 1.5}
      />
      <Label x={40} y={89} anchor="start" mono size={18} fill={append ? danger : topLit ? accent : topDim ? pale : ink}>
        {append ? 'MaliSom' : 'Mali'}
      </Label>
      {append ? <Label x={226} y={89} size={18} fill={danger} weight={600}>×</Label> : null}
      <Label x={28} y={132} anchor="start" size={18} fill={append ? danger : topDim ? pale : ink}>
        {append ? 'สวัสดี MaliSom' : 'สวัสดี Mali'}
      </Label>

      <SketchRect
        seedKey="type/page2"
        x={12}
        y={168}
        w={236}
        h={146}
        rounded
        stroke={append ? success : bottomLit ? accent : bottomDim ? pale : ink}
        strokeWidth={append || bottomLit ? 2.4 : 1.7}
      />
      <SketchLine seedKey="type/page2-bar" x1={14} y1={192} x2={246} y2={192} stroke={pale} strokeWidth={1.2} />
      <Label x={130} y={181} fill={append ? success : bottomDim ? pale : muted}>{bottomHeader}</Label>
      <Label x={28} y={210} anchor="start" fill={append ? success : bottomDim ? pale : ink}>ชื่อ</Label>
      <SketchRect
        seedKey="type/input2"
        x={28}
        y={222}
        w={204}
        h={38}
        rounded
        stroke={append ? success : bottomLit ? accent : bottomDim ? pale : ink}
        strokeWidth={append || bottomLit ? 2.2 : 1.5}
      />
      <Label x={40} y={241} anchor="start" mono size={18} fill={append ? success : bottomLit ? accent : muted}>
        {append ? 'Som' : '—'}
      </Label>
      {append ? <Label x={226} y={241} size={18} fill={success} weight={600}>✓</Label> : null}
      <Label x={28} y={286} anchor="start" size={18} fill={append ? success : bottomDim ? pale : ink}>
        {append ? 'สวัสดี Som' : 'สวัสดี คนแปลกหน้า'}
      </Label>

      <Box
        seed="type/command1"
        x={264}
        y={72}
        w={184}
        h={44}
        label={append ? 'type("Som")' : 'type("Mali")'}
        lit={topLit}
        bad={append}
        dim={topDim}
        mono
      />
      <SketchArrow
        seedKey="type/arrow1"
        x1={262}
        y1={94}
        x2={248}
        y2={94}
        stroke={append ? danger : topLit ? accent : topDim ? pale : ink}
        strokeWidth={append || topLit ? 2.4 : 1.8}
      />
      <Box
        seed="type/command2"
        x={264}
        y={218}
        w={184}
        h={44}
        label={append ? 'clear แล้ว type' : 'clear(input)'}
        lit={bottomLit}
        good={append}
        dim={bottomDim}
        mono
      />
      <SketchArrow
        seedKey="type/arrow2"
        x1={262}
        y1={240}
        x2={248}
        y2={240}
        stroke={append ? success : bottomLit ? accent : bottomDim ? pale : ink}
        strokeWidth={append || bottomLit ? 2.4 : 1.8}
      />

      {append ? null : (
        <>
          {['M', 'a', 'l', 'i'].map((char, index) => (
            <g key={char}>
              <SketchRect
                seedKey={`type/key/${char}`}
                x={264 + index * 34}
                y={126}
                w={26}
                h={28}
                rounded
                stroke={keysLit ? accent : keysDim ? pale : ink}
                strokeWidth={keysLit ? 2 : 1.4}
              />
              <Label x={277 + index * 34} y={140} mono size={16} fill={keysLit ? accent : keysDim ? pale : ink}>{char}</Label>
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

type SpyState = 'full' | 'trace' | 'vi' | 'notcalled' | 'with' | 'realfn';

/** A callback prop goes into a fake function, which keeps a ledger of every call. */
export function SpyLedger({ state = 'full' }: { state?: SpyState }) {
  const trace = state === 'trace';
  const vi = state === 'vi';
  const notCalled = state === 'notcalled';
  const withArgs = state === 'with';
  const realFn = state === 'realfn';
  const focused = state !== 'full';
  const wireLit = trace;
  const rowLit = trace || vi || withArgs;
  const emptyLedger = notCalled;
  const lane1Lit = notCalled;
  const lane2Lit = withArgs;
  const dimLane1 = focused && !lane1Lit;
  const dimLane2 = focused && !lane2Lit && !realFn;
  const dimComponent = vi;
  const dimLedger = realFn ? true : trace || withArgs ? false : vi ? false : false;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ปุ่มตกลงเรียก onConfirm แล้ว vi.fn บันทึกการเรียกเป็นแถว พร้อมการตรวจ not.toHaveBeenCalled และ toHaveBeenCalledWith"
      fontFamily="var(--rs-font)"
    >
      <Label x={68} y={88} fill={muted}>component</Label>
      <g opacity={dimComponent ? 0.45 : 1}>
        <SketchRect seedKey="spy/card" x={12} y={104} w={112} h={76} rounded stroke={wireLit ? accent : ink} strokeWidth={wireLit ? 2.4 : 1.7} />
        <SketchRect seedKey="spy/button" x={26} y={126} w={84} h={34} rounded stroke={wireLit ? accent : ink} strokeWidth={wireLit ? 2.4 : 2} />
        <Label x={68} y={143} fill={wireLit ? accent : ink} weight={wireLit ? 600 : undefined}>ตกลง</Label>
      </g>

      <SketchArrow
        seedKey="spy/wire"
        x1={124}
        y1={142}
        x2={206}
        y2={142}
        stroke={realFn ? danger : wireLit ? accent : ink}
        strokeWidth={realFn || wireLit ? 2.6 : 1.8}
        dashed={realFn}
      />

      <g opacity={dimLedger ? 0.35 : 1}>
        <SketchRect
          seedKey="spy/ledger"
          x={210}
          y={56}
          w={238}
          h={150}
          rounded
          stroke={realFn ? pale : rowLit || vi ? accent : ink}
          strokeWidth={rowLit || vi ? 2.4 : 1.7}
          dashed={realFn}
        />
        <Label x={329} y={80} size={18} mono fill={realFn ? pale : rowLit || vi ? accent : ink}>vi.fn()</Label>
        <SketchLine seedKey="spy/ledger-bar" x1={212} y1={96} x2={446} y2={96} stroke={pale} strokeWidth={1.2} />
        {realFn ? null : emptyLedger ? (
          <Label x={329} y={140} fill={pale}>— ไม่มีแถว —</Label>
        ) : (
          <>
            <Label x={228} y={120} anchor="start" mono fill={rowLit ? accent : ink}>#1</Label>
            <Label x={266} y={120} anchor="start" mono fill={rowLit ? accent : ink}>"ตกลง"</Label>
            <Label x={228} y={150} anchor="start" mono fill={pale}>#2</Label>
            <Label x={266} y={150} anchor="start" mono fill={pale}>—</Label>
          </>
        )}
        {realFn ? null : <Label x={329} y={184} fill={muted}>สมุดบันทึกการเรียก</Label>}
      </g>

      {realFn ? (
        <>
          <SketchRect seedKey="spy/realfn" x={210} y={102} w={238} h={68} rounded stroke={danger} strokeWidth={2.8} />
          <Label x={329} y={126} fill={danger} weight={600}>onConfirm</Label>
          <Label x={329} y={152} fill={danger}>ฟังก์ชันจริง</Label>
          <Label x={329} y={196} fill={danger} weight={600}>× not a spy</Label>
        </>
      ) : null}

      {realFn ? null : (
        <>
          <Box
            seed="spy/lane1"
            x={96}
            y={220}
            w={352}
            h={44}
            label="not.toHaveBeenCalled"
            lit={lane1Lit}
            dim={dimLane1}
            mono
          />
          <Label x={12} y={242} anchor="start" mono fill={lane1Lit ? accent : dimLane1 ? pale : ink}>0 calls</Label>
          <Label x={430} y={242} size={18} fill={lane1Lit ? success : dimLane1 ? pale : success} weight={600}>✓</Label>
        </>
      )}

      <Box
        seed="spy/lane2"
        x={96}
        y={278}
        w={352}
        h={44}
        label={'toHaveBeenCalledWith("ตกลง")'}
        lit={lane2Lit}
        bad={realFn}
        dim={dimLane2}
        mono
      />
      <Label x={12} y={300} anchor="start" mono fill={lane2Lit ? accent : dimLane2 ? pale : ink}>1 call</Label>
      <Label x={430} y={300} size={18} fill={realFn ? danger : lane2Lit ? success : dimLane2 ? pale : success} weight={600}>
        {realFn ? '×' : '✓'}
      </Label>
    </svg>
  );
}

type ExtraState = 'full' | 'map' | 'keyboard' | 'hover' | 'select' | 'upload' | 'times';

/** Five interactions that follow click and type: keys, hover, select, upload, and call counting. */
export function ExtraUserKit({ state = 'full' }: { state?: ExtraState }) {
  const map = state === 'map';
  const focused = state !== 'full' && !map;
  const keyboardLit = state === 'keyboard';
  const hoverLit = state === 'hover';
  const selectLit = state === 'select';
  const uploadLit = state === 'upload';
  const timesLit = state === 'times';
  const opacity = (lit: boolean) => (focused && !lit ? 0.35 : 1);
  const content = map ? 0.45 : 1;

  return (
    <svg
      className="rs-figure"
      viewBox="0 0 460 330"
      role="img"
      aria-label="ห้าท่าของผู้ใช้: keyboard กับ tab, hover, selectOptions, upload และการนับครั้งกับล้าง mock"
      fontFamily="var(--rs-font)"
    >
      <g opacity={map ? content : opacity(keyboardLit)}>
        <SketchRect seedKey="extra/keys" x={12} y={20} w={212} h={140} rounded stroke={keyboardLit ? accent : ink} strokeWidth={keyboardLit ? 2.4 : 1.7} />
        <Label x={map ? 40 : 118} y={40} anchor={map ? 'start' : 'middle'} fill={keyboardLit ? accent : ink} weight={keyboardLit ? 600 : undefined}>keyboard / tab</Label>
        <SketchRect seedKey="extra/enter" x={30} y={66} w={78} h={34} rounded stroke={keyboardLit ? accent : ink} strokeWidth={keyboardLit ? 2.2 : 1.5} />
        <Label x={69} y={83} mono>Enter</Label>
        <SketchRect seedKey="extra/tab" x={118} y={66} w={56} h={34} rounded stroke={keyboardLit ? accent : ink} strokeWidth={keyboardLit ? 2.2 : 1.5} />
        <Label x={146} y={83} mono>Tab</Label>
        <SketchRect seedKey="extra/focus" x={30} y={114} w={176} h={26} rounded stroke={keyboardLit ? accent : pale} strokeWidth={keyboardLit ? 2.2 : 1.4} dashed={!keyboardLit} />
        <Label x={118} y={127} fill={keyboardLit ? accent : muted}>focus</Label>
      </g>

      <g opacity={map ? content : opacity(hoverLit)}>
        <SketchRect seedKey="extra/hover" x={236} y={20} w={212} h={140} rounded stroke={hoverLit ? accent : ink} strokeWidth={hoverLit ? 2.4 : 1.7} />
        <Label x={map ? 264 : 342} y={40} anchor={map ? 'start' : 'middle'} fill={hoverLit ? accent : ink} weight={hoverLit ? 600 : undefined}>hover</Label>
        <SketchRect seedKey="extra/menu" x={258} y={66} w={64} h={30} rounded stroke={hoverLit ? accent : ink} strokeWidth={hoverLit ? 2.2 : 1.8} />
        <Label x={290} y={81}>เมนู</Label>
        <Cursor x={330} y={64} colour={hoverLit ? accent : ink} />
        <SketchLine seedKey="extra/popup-line" x1={290} y1={96} x2={290} y2={108} stroke={hoverLit ? accent : pale} strokeWidth={hoverLit ? 2 : 1.3} />
        <SketchRect seedKey="extra/popup" x={286} y={108} w={124} h={28} rounded stroke={hoverLit ? accent : ink} strokeWidth={hoverLit ? 2.2 : 1.5} />
        <Label x={348} y={122} size={16} fill={hoverLit ? accent : ink}>ตัวเลือกย่อย</Label>
      </g>

      <g opacity={map ? content : opacity(selectLit)}>
        <SketchRect seedKey="extra/select" x={12} y={176} w={136} h={140} rounded stroke={selectLit ? accent : ink} strokeWidth={selectLit ? 2.4 : 1.7} />
        <Label x={map ? 40 : 80} y={196} anchor={map ? 'start' : 'middle'} fill={selectLit ? accent : ink} weight={selectLit ? 600 : undefined}>select</Label>
        <SketchRect seedKey="extra/select-box" x={26} y={218} w={108} h={32} rounded stroke={selectLit ? accent : ink} strokeWidth={selectLit ? 2.2 : 1.5} />
        <Label x={74} y={234}>กล้วย</Label>
        <Label x={124} y={234} size={16} fill={selectLit ? accent : muted}>▾</Label>
        <Label x={80} y={272} mono fill={selectLit ? accent : muted}>banana</Label>
        <Label x={80} y={296} fill={muted}>value</Label>
      </g>

      <g opacity={map ? content : opacity(uploadLit)}>
        <SketchRect seedKey="extra/upload" x={160} y={176} w={136} h={140} rounded stroke={uploadLit ? accent : ink} strokeWidth={uploadLit ? 2.4 : 1.7} />
        <Label x={map ? 188 : 228} y={196} anchor={map ? 'start' : 'middle'} fill={uploadLit ? accent : ink} weight={uploadLit ? 600 : undefined}>upload</Label>
        <SketchRect seedKey="extra/file-input" x={174} y={218} w={108} h={32} rounded stroke={uploadLit ? accent : ink} strokeWidth={uploadLit ? 2.2 : 1.5} />
        <Label x={228} y={234} size={16}>เลือกไฟล์</Label>
        <SketchRect seedKey="extra/file-chip" x={174} y={260} w={108} h={28} rounded stroke={uploadLit ? accent : pale} strokeWidth={uploadLit ? 2 : 1.4} dashed={!uploadLit} />
        <Label x={228} y={274} size={16} mono fill={uploadLit ? accent : muted}>hello.png</Label>
      </g>

      <g opacity={map ? content : opacity(timesLit)}>
        <SketchRect seedKey="extra/times" x={308} y={176} w={140} h={140} rounded stroke={timesLit ? accent : ink} strokeWidth={timesLit ? 2.4 : 1.7} />
        <Label x={map ? 336 : 378} y={196} anchor={map ? 'start' : 'middle'} fill={timesLit ? accent : ink} weight={timesLit ? 600 : undefined}>times / clear</Label>
        <Label x={378} y={222} mono fill={timesLit ? accent : ink}>2 calls</Label>
        <SketchRect seedKey="extra/clear" x={320} y={236} w={116} h={28} rounded stroke={timesLit ? accent : ink} strokeWidth={timesLit ? 2.2 : 1.5} />
        <Label x={378} y={250} size={16} mono fill={timesLit ? accent : ink}>mockClear</Label>
        <SketchRect seedKey="extra/reset" x={320} y={272} w={116} h={28} rounded stroke={timesLit ? accent : ink} strokeWidth={timesLit ? 2.2 : 1.5} />
        <Label x={378} y={286} size={16} mono fill={timesLit ? accent : ink}>mockReset</Label>
      </g>

      {map ? (
        <>
          <Label x={24} y={40} size={18} weight={600} fill={accent}>1</Label>
          <Label x={248} y={40} size={18} weight={600} fill={accent}>2</Label>
          <Label x={24} y={196} size={18} weight={600} fill={accent}>3</Label>
          <Label x={172} y={196} size={18} weight={600} fill={accent}>4</Label>
          <Label x={320} y={196} size={18} weight={600} fill={accent}>5</Label>
        </>
      ) : null}

      {focused && keyboardLit ? <SketchRect seedKey="extra/ring1" x={4} y={12} w={228} h={156} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && hoverLit ? <SketchRect seedKey="extra/ring2" x={228} y={12} w={228} h={156} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && selectLit ? <SketchRect seedKey="extra/ring3" x={4} y={168} w={136} h={156} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && uploadLit ? <SketchRect seedKey="extra/ring4" x={152} y={168} w={136} h={156} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
      {focused && timesLit ? <SketchRect seedKey="extra/ring5" x={300} y={168} w={156} h={156} rounded stroke={accent} strokeWidth={1.6} dashed /> : null}
    </svg>
  );
}
