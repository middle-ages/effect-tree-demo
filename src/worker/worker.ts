import {Codec} from 'effect-tree'
import {
  handleDecodeRequest,
  type DecodeMessage,
  type DecodeRequest,
  type DecodeResponse,
} from './message'
import {drawRomanTree} from '../model/roman'
import {primeStats} from '../model/stats'

globalThis.global = globalThis
//@ts-expect-error
globalThis.window = globalThis

// @ts-expect-error
window['__vite_plugin_react_preamble_installed__'] = true

globalThis.onmessage = ({
  data,
}: MessageEvent<DecodeMessage | Record<string, string>>) => {
  const response = handleDecodeRequest(
    (request: DecodeRequest): DecodeResponse => {
      const {code, format, theme} = request

      const tree = Codec.Prufer.decode(code)
      const lines = drawRomanTree(tree, format, theme)
      const stats = primeStats(code, tree)

      return {...request, stats, code, tree, lines}
    },
  )(event)

  if (response !== undefined) {
    globalThis.postMessage(response)
  }
}
