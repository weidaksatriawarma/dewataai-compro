/**
 * The forty-year chart: four assets indexed to 100, drawn on one axis.
 *
 * Two decisions carry most of the weight here.
 *
 * ONE AXIS, ALWAYS. Land and a software company differ by three orders of
 * magnitude at year forty. The tempting fix is a second y-scale, which would
 * invent a correlation that is not in the data. Indexing everything to 100 at
 * year zero puts them on one honest axis instead, and the log toggle is what
 * makes the small end readable. Linear is offered because the flattening it
 * causes is itself the argument: on a linear axis three of the four curves lie
 * on the floor, which is what compounding actually looks like.
 *
 * IDENTITY IS NEVER THE GREY ALONE. The palette is monochrome, so each series
 * also carries its own dash pattern, its name at the end of its own line, and a
 * row in the figure's table. Any one of those is enough to read the chart if
 * the others fail, which is the case in greyscale print and forced-colours.
 */
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiBrain01Icon,
  Bitcoin01Icon,
  CloudServerIcon,
  CafeIcon,
  Mining01Icon,
  Hotel01Icon,
  LandPlotIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import {
  ASSETS,
  INDEX,
  BASE_INDEX,
  HORIZON,
  SERIES,
  DEFAULT_VISIBLE,
  strokeColor,
  dashArray,
  type AssetKey,
} from "@/lib/horizon"

type Scale = "log" | "linear"

export interface HorizonLabels {
  xLabel: string
  yLabel: string
  scaleLabel: string
  log: string
  linear: string
  horizonLabel: string
  readout: string
  hint: string
  capNote: string
  selectAll: string
  clear: string
  srHint: string
}

interface Props {
  lang: "id" | "en"
  assets: Record<AssetKey, string>
  labels: HorizonLabels
}

const W = 780
const H = 380
const L = 58
const R = 136
const T = 26
const B = 54

/* One glyph per asset. Three grey steps cannot carry seven identities on their
   own, and the icon is the channel that survives everything else: it reads at a
   glance, it holds up in greyscale print, and it never asks the reader to tell
   one grey from the next. */
const GLYPH: Record<AssetKey, typeof AiBrain01Icon> = {
  software: AiBrain01Icon,
  bitcoin: Bitcoin01Icon,
  datacenter: CloudServerIcon,
  cafe: CafeIcon,
  mining: Mining01Icon,
  hotel: Hotel01Icon,
  land: LandPlotIcon,
}

/* Line weight leans on the step: a lighter grey needs a touch more body to
   read at the same distance as the ink line. */
const WEIGHT: Record<1 | 2 | 3, number> = { 1: 2.6, 2: 2.1, 3: 2.3 }
const weightOf = (k: AssetKey) => WEIGHT[SERIES[k].step]

const STEPS = [10, 20, 30, HORIZON] as const

/*
 * Everything that does not move: grid, ticks, the four lines, the end labels
 * and the axis titles.
 *
 * Split out and memoised because the crosshair is a state update on every
 * pointermove, and without this React reconciles roughly eighty unchanged SVG
 * nodes for each one. Its props all come from the geometry memo, so a cursor
 * move re-renders only the crosshair and the readout.
 */
interface PlotProps {
  paths: { key: AssetKey; d: string }[]
  yTicks: number[]
  xTicks: number[]
  endLabels: { key: AssetKey; y: number }[]
  px: (year: number) => number
  py: (value: number) => number
  nf: Intl.NumberFormat
  assets: Record<AssetKey, string>
  xLabel: string
  yLabel: string
}

const Plot = memo(function Plot({
  paths,
  yTicks,
  xTicks,
  endLabels,
  px,
  py,
  nf,
  assets,
  xLabel,
  yLabel,
}: PlotProps) {
  return (
    <g>
      {yTicks.map((v) => (
        <g key={`y${v}`}>
          <line x1={L} y1={py(v)} x2={W - R} y2={py(v)} className="hz-grid" />
          <text x={L - 10} y={py(v) + 4} textAnchor="end" className="hz-tick">
            {nf.format(v)}
          </text>
        </g>
      ))}
      {xTicks.map((y) => (
        <text
          key={`x${y}`}
          x={px(y)}
          y={H - B + 22}
          textAnchor="middle"
          className="hz-tick"
        >
          {y}
        </text>
      ))}
      <line x1={L} y1={H - B} x2={W - R} y2={H - B} className="hz-axis-line" />

      {paths.map(({ key: k, d }) => (
        <path
          key={k}
          d={d}
          fill="none"
          stroke={strokeColor(k)}
          strokeWidth={weightOf(k)}
          strokeDasharray={dashArray(k)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {endLabels.map(({ key, y }) => (
        <text key={`e${key}`} x={W - R + 12} y={y + 4} className="hz-end">
          {assets[key]}
        </text>
      ))}

      <text x={L} y={H - 6} className="hz-axis">
        {xLabel}
      </text>
      <text x={L - 10} y={T - 8} className="hz-axis">
        {yLabel}
      </text>
    </g>
  )
})

export default function HorizonChart({ lang, assets, labels }: Props) {
  const [scale, setScale] = useState<Scale>("log")
  const [span, setSpan] = useState<number>(HORIZON)
  const [visible, setVisible] = useState<readonly AssetKey[]>(DEFAULT_VISIBLE)
  const [cursor, setCursor] = useState<number | null>(null)
  const plot = useRef<SVGSVGElement>(null)

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
        maximumFractionDigits: 0,
      }),
    [lang]
  )

  /*
   * Everything the drawing needs, computed once per view rather than once per
   * mouse move.
   *
   * The moving crosshair is a state update on every pointermove, and the first
   * version of this component rebuilt all four 41-point paths inside the render
   * body. Under a four-times CPU throttle that cost about 70ms per move and
   * turned a hover into a stall. None of it depends on the cursor, so it all
   * belongs behind one memo keyed on what actually changes the geometry.
   */
  const view = useMemo(() => {
    const shown = ASSETS.filter((k) => visible.includes(k))
    const yMax = Math.max(...shown.map((k) => INDEX[k][span]), BASE_INDEX * 2)
    const h = H - T - B
    const lo = Math.log10(BASE_INDEX)
    const span10 = Math.log10(yMax) - lo

    const px = (year: number) => L + (year / span) * (W - L - R)
    const py =
      scale === "log"
        ? (v: number) =>
            H - B - ((Math.log10(Math.max(v, BASE_INDEX)) - lo) / span10) * h
        : (v: number) => H - B - (v / yMax) * h

    const paths = shown.map((k) => ({
      key: k,
      d: INDEX[k]
        .slice(0, span + 1)
        .map(
          (v, y) =>
            `${y === 0 ? "M" : "L"}${px(y).toFixed(1)} ${py(v).toFixed(1)}`
        )
        .join(" "),
    }))

    /* Log ticks are the decades themselves, which is the whole reason to use
       the scale. Linear gets five even steps. */
    const yTicks: number[] = []
    if (scale === "linear") {
      for (const f of [0, 0.25, 0.5, 0.75, 1]) yTicks.push(f * yMax)
    } else {
      for (let v = BASE_INDEX; v <= yMax * 1.0001; v *= 10) yTicks.push(v)
    }

    const xStep = span <= 10 ? 2 : span <= 20 ? 5 : 10
    const xTicks: number[] = []
    for (let y = 0; y <= span; y += xStep) xTicks.push(y)
    if (xTicks[xTicks.length - 1] !== span) xTicks.push(span)

    /*
     * End labels get pushed apart rather than overlapping. On a linear axis
     * five of the seven endpoints land within a few pixels of each other at
     * the bottom of the plot.
     *
     * Two passes, not one. A single downward pass plus a global shift pushed
     * the whole stack up by however far the last label spilled, which shoved
     * the top label clean out of the viewBox: on the linear scale the steepest
     * asset lost its name entirely. Pushing down and then pushing back up from
     * the floor keeps every label inside the plot, and the stack only needs
     * seven times sixteen pixels of the three hundred available.
     */
    const endLabels = shown
      .map((k) => ({ key: k, y: py(INDEX[k][span]) }))
      .sort((a, b) => a.y - b.y)
    const MIN = 16
    const TOP = T + 6
    const FLOOR = H - B
    for (let i = 0; i < endLabels.length; i++) {
      const floor = i === 0 ? TOP : endLabels[i - 1].y + MIN
      endLabels[i].y = Math.max(endLabels[i].y, floor)
    }
    for (let i = endLabels.length - 1; i >= 0; i--) {
      const ceiling =
        i === endLabels.length - 1 ? FLOOR : endLabels[i + 1].y - MIN
      endLabels[i].y = Math.min(endLabels[i].y, ceiling)
    }

    return { shown, px, py, paths, yTicks, xTicks, endLabels }
  }, [visible, span, scale])

  const { shown, px, py, paths, yTicks, xTicks, endLabels } = view

  /* Any subset can be drawn, down to a single line. Dropping the last one
     would leave an empty axis with no way back, so the last one stays. Adding
     preserves ASSETS order rather than click order, which keeps the legend,
     the readout and the end labels in the same sequence every time. */
  const toggle = (k: AssetKey) =>
    setVisible((prev) =>
      prev.includes(k)
        ? prev.length > 1
          ? prev.filter((x) => x !== k)
          : prev
        : ASSETS.filter((a) => a === k || prev.includes(a))
    )

  /*
   * The plot rectangle is measured once per hover rather than once per move.
   * getBoundingClientRect forces a synchronous layout, and calling it on every
   * pointermove made the browser lay the page out again for each pixel of
   * travel. Only `left` and `width` are used, and neither changes while the
   * pointer stays inside, so the cached value stays correct; a resize or the
   * pointer leaving throws it away.
   */
  const box = useRef<{ left: number; width: number } | null>(null)
  const remeasure = () => {
    const r = plot.current?.getBoundingClientRect()
    box.current = r ? { left: r.left, width: r.width } : null
  }
  useEffect(() => {
    const drop = () => (box.current = null)
    window.addEventListener("resize", drop)
    return () => window.removeEventListener("resize", drop)
  }, [])

  const track = (clientX: number) => {
    if (!box.current) remeasure()
    const b = box.current
    if (!b || !b.width) return
    const x = ((clientX - b.left) / b.width) * W
    const year = Math.min(
      span,
      Math.max(0, Math.round(((x - L) / (W - L - R)) * span))
    )
    /* Years are whole numbers, so a sweep across the plot is at most 41 state
       updates instead of one per pointer event. */
    setCursor((prev) => (prev === year ? prev : year))
  }

  const step = (delta: number) =>
    setCursor((c) =>
      Math.min(span, Math.max(0, (c === null ? span : c) + delta))
    )

  const ctrl =
    "rounded-none border-hairline px-3 font-mono text-[0.7rem] tracking-[0.1em] text-muted-foreground data-[state=on]:bg-ink data-[state=on]:text-background"

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center gap-x-10 gap-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.66rem] tracking-[0.16em] text-muted-foreground">
            {labels.scaleLabel}
          </span>
          <ToggleGroup
            type="single"
            value={scale}
            onValueChange={(v) => v && setScale(v as Scale)}
            variant="outline"
            size="sm"
            spacing={0}
          >
            <ToggleGroupItem value="log" className={ctrl}>
              {labels.log}
            </ToggleGroupItem>
            <ToggleGroupItem value="linear" className={ctrl}>
              {labels.linear}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.66rem] tracking-[0.16em] text-muted-foreground">
            {labels.horizonLabel}
          </span>
          <ToggleGroup
            type="single"
            value={String(span)}
            onValueChange={(v) => v && setSpan(Number(v))}
            variant="outline"
            size="sm"
            spacing={0}
          >
            {STEPS.map((s) => (
              <ToggleGroupItem key={s} value={String(s)} className={ctrl}>
                {s}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      {/* Only the plot scrolls. The controls above and the legend below stay in
          normal flow, so on a phone they are still reachable without dragging
          the chart sideways first. */}
      <div className="-mx-1 overflow-x-auto px-1">
        <div
          className="relative min-w-[30rem] outline-none"
          tabIndex={0}
          role="group"
          aria-label={labels.srHint}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault()
              step(1)
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault()
              step(-1)
            }
            if (e.key === "Escape") setCursor(null)
          }}
        >
          <svg
            ref={plot}
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            aria-hidden="true"
            onPointerMove={(e) => track(e.clientX)}
            onPointerDown={(e) => track(e.clientX)}
            onPointerEnter={remeasure}
            onPointerLeave={() => {
              box.current = null
              setCursor(null)
            }}
          >
            <Plot
              paths={paths}
              yTicks={yTicks}
              xTicks={xTicks}
              endLabels={endLabels}
              px={px}
              py={py}
              nf={nf}
              assets={assets}
              xLabel={labels.xLabel}
              yLabel={labels.yLabel}
            />

            {cursor !== null && (
              <g>
                <line
                  x1={px(cursor)}
                  y1={T}
                  x2={px(cursor)}
                  y2={H - B}
                  className="hz-cross"
                />
                {shown.map((k) => (
                  <circle
                    key={`c${k}`}
                    cx={px(cursor)}
                    cy={py(INDEX[k][cursor])}
                    r="4.5"
                    fill={strokeColor(k)}
                    stroke="var(--background)"
                    strokeWidth="2"
                  />
                ))}
              </g>
            )}
          </svg>

          {cursor !== null && (
            <div
              className={cn(
                "pointer-events-none absolute top-2 z-10 min-w-[11.5rem] border border-hairline bg-background px-4 py-3 shadow-sm",
                (px(cursor) / W) * 100 > 55 ? "-translate-x-full" : ""
              )}
              style={{
                left: `calc(${((px(cursor) / W) * 100).toFixed(2)}% ${(px(cursor) / W) * 100 > 55 ? "-" : "+"} 0.75rem)`,
              }}
            >
              <p className="font-mono text-[0.64rem] tracking-[0.16em] text-muted-foreground">
                {labels.readout} {cursor}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {shown.map((k) => (
                  <li
                    key={k}
                    className="flex items-baseline justify-between gap-5"
                  >
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-ink" aria-hidden="true">
                        <HugeiconsIcon
                          icon={GLYPH[k]}
                          size={13}
                          strokeWidth={1.8}
                        />
                      </span>
                      <span
                        className="inline-block h-0 w-4 shrink-0 border-t-2"
                        style={{
                          borderColor: strokeColor(k),
                          borderStyle: SERIES[k].stroke,
                        }}
                      />
                      {assets[k]}
                    </span>
                    <span className="font-mono text-xs text-ink tabular-nums">
                      {nf.format(INDEX[k][cursor])}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p aria-live="polite" className="sr-only">
            {cursor !== null
              ? `${labels.readout} ${cursor}. ` +
                shown
                  .map((k) => `${assets[k]} ${nf.format(INDEX[k][cursor])}`)
                  .join(", ")
              : ""}
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => setVisible(ASSETS)}
          disabled={visible.length === ASSETS.length}
          className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground underline-offset-4 transition-colors hover:text-ink disabled:opacity-40 disabled:hover:text-muted-foreground"
        >
          {labels.selectAll}
        </button>
        <button
          type="button"
          onClick={() => setVisible(["software"])}
          disabled={visible.length === 1}
          className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground underline-offset-4 transition-colors hover:text-ink disabled:opacity-40 disabled:hover:text-muted-foreground"
        >
          {labels.clear}
        </button>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
        {ASSETS.map((k) => {
          const off = !visible.includes(k)
          return (
            <li key={k}>
              <button
                type="button"
                aria-pressed={!off}
                onClick={() => toggle(k)}
                className={cn(
                  "flex items-center gap-2 text-xs transition-opacity",
                  off ? "opacity-35" : "opacity-100"
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md border border-hairline",
                    off ? "text-muted-foreground" : "text-ink"
                  )}
                  aria-hidden="true"
                >
                  <HugeiconsIcon icon={GLYPH[k]} size={13} strokeWidth={1.8} />
                </span>
                <span
                  className="inline-block h-0 w-6 shrink-0 border-t-2"
                  style={{
                    borderColor: strokeColor(k),
                    borderStyle: SERIES[k].stroke,
                  }}
                />
                <span
                  className={
                    off ? "text-muted-foreground line-through" : "text-ink"
                  }
                >
                  {assets[k]}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground">
        {labels.hint}
      </p>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground">
        {labels.capNote}
      </p>
    </div>
  )
}
