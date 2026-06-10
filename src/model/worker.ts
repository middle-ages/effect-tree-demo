/* eslint-disable unicorn/prefer-add-event-listener */
import {Codec} from 'effect-tree'
import {
  handleDecodeRequest,
  type DecodeRequest,
  type DecodeResponse,
} from './message'
import {drawRomanTree} from './roman'
import {primeStats} from './stats'

globalThis.global = globalThis
//@ts-expect-error
globalThis.window = globalThis

// @ts-expect-error
window['__vite_plugin_react_preamble_installed__'] = true

globalThis.onmessage = (event: MessageEvent) => {
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
