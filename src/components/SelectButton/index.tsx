import {type StyledProps} from '#util'

interface Props extends StyledProps {}

export const SelectButton = ({className, style}: Props) => {
  return <div {...{className, style}}></div>
}
