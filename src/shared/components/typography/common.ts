export interface TextWeightProps {
  /** Uses fontWeight: 300 */
  thin?: boolean
  /** Uses fontWeight: 400 */
  regular?: boolean
  /** Uses fontWeight: 500 */
  medium?: boolean
  /** Uses fontWeight: 700 */
  bold?: boolean
}

export interface TextColorProps {
  /** Uses color: utils.text */
  dark?: boolean
  /** Uses color: neutral.11 */
  light?: boolean
  /** Uses color: neutral.9 */
  muted?: boolean
}

export const getFontWeight = ({ thin, medium, bold }: TextWeightProps) => {
  if (bold) return 700
  if (medium) return 500
  if (thin) return 300
  return 400
}

export const getFontColor = ({ light, muted }: TextColorProps) => {
  if (light) return 'neutral1.11'
  if (muted) return 'neutral1.9'
  return 'utils.text'
}
