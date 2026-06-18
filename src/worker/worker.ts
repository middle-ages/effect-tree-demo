import {drawRomanTree} from '#model/draw'
import {primeStats} from '#model/stats'
import {Codec} from 'effect-tree'
import {DecodeResponse, type DecodeRequest} from './message'

self.onmessage = ({data}: MessageEvent<DecodeRequest>) => {
  const {code, format, theme} = data
  const tree = Codec.Prufer.decode(code)
  const lines = drawRomanTree(tree, format, theme)
  const stats = primeStats(code, tree)

  const decodeResponse: DecodeResponse = DecodeResponse(
    data,
    tree,
    lines,
    stats,
  )

  postMessage(decodeResponse)
}
