interface DiscProps {
  size: number
  discCount: number
  lifted: boolean
}

const MIN_WIDTH_PCT = 26
const MAX_WIDTH_PCT = 96

/** A single wooden disc, sized according to its value relative to the largest disc. */
export function Disc({ size, discCount, lifted }: DiscProps) {
  const span = Math.max(1, discCount - 1)
  const widthPct =
    discCount <= 1
      ? MAX_WIDTH_PCT
      : MIN_WIDTH_PCT + ((MAX_WIDTH_PCT - MIN_WIDTH_PCT) * (size - 1)) / span

  return (
    <div className={lifted ? 'disc disc--lifted' : 'disc'} style={{ width: `${widthPct}%` }}>
      <span className="disc__size">{size}</span>
    </div>
  )
}
