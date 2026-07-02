import {
  GRAPH_CANDLES,
  GRAPH_CHART_AXIS_FRAME,
  GRAPH_CHART_AXIS_TICKS,
  GRAPH_CHART_GRID,
} from "./graphChartData";

export function InvestmentGraphChart() {
  return (
    <g className="scroll-story-chart" aria-hidden>
      <g className="scroll-story-chart-frame">
        <path className="scroll-story-chart-grid" d={GRAPH_CHART_GRID} />
        <path className="scroll-story-chart-axis" d={GRAPH_CHART_AXIS_FRAME} />
        <path className="scroll-story-chart-axis" d={GRAPH_CHART_AXIS_TICKS} />
      </g>

      <g className="scroll-story-candles">
        {GRAPH_CANDLES.map((candle) => (
          <g
            key={candle.x}
            className="scroll-story-candle"
            data-candle-x={candle.x}
          >
            <path className="scroll-story-candle-stem" d={candle.stem} />
            <path
              className={
                candle.peak
                  ? "scroll-story-candle-body scroll-story-candle-body--peak"
                  : "scroll-story-candle-body scroll-story-candle-body--primary"
              }
              d={candle.body}
            />
          </g>
        ))}
      </g>
    </g>
  );
}
