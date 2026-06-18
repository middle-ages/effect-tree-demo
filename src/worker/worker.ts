import {drawRomanTree} from '#model/roman/index'
import {primeStats} from '#model/stats'
import {Codec} from 'effect-tree'
import {DecodeResponse, type DecodeRequest} from './message'

console.log('loaded worker')

self.onmessage = ({data}: MessageEvent<DecodeRequest>) => {
  console.log(' worker on message')
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
