import { getShortAmountLabel } from '../../../../../../utils'

export const SatsTickComponent = (props: any) => {
  const { x, y, payload, ...rest } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} fill="#666" fontSize="14px" {...rest}>
        {getShortAmountLabel(payload.value, true)}
      </text>
    </g>
  )
}

export const TickComponent = (props: any) => {
  const { x, y, payload, ...rest } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text fontSize="14px" dy={4} {...rest}>
        {payload.value}
      </text>
    </g>
  )
}
