import {CodeEditor} from './CodeEditor'
import {FirstDigitIndicator} from './FirstDigitIndicator'
import {LastDigitIndicator} from './LastDigitIndicator'
//import {LastDigitIndicator} from './LastDigitIndicator'
import {Link} from './Link'
import {useConstraints} from './useConstraints'

export const Footer = () => {
  const codeEditorProps = useConstraints()
  const {
    firstVisible: digitIndex,
    offsetPx,
    inputWidthPx,
    lastVisible,
    visibleCountRem,
  } = codeEditorProps
  const maxWidth = inputWidthPx + 6
  return (
    <div className='group relative min-h-19.5 min-w-136.75 contain-strict'>
      <Link />
      <CodeEditor {...codeEditorProps} />
      <FirstDigitIndicator {...{digitIndex, maxWidth, offsetPx}} />
      <LastDigitIndicator
        {...{
          lastVisible,
          offsetPx,
          inputWidthPx,
          visibleCountRem,
        }}
      />
    </div>
  )
}
