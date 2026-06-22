import {Codec, tree} from 'effect-tree'
import {describe, expect, test} from 'vitest'
import {LinesRequest, TreeRequest} from '../message/data'
import {dataTag} from '../message/worker'
import {handleRequest} from './compute'
import {unwords} from '#String'

describe('TreeRequest', () => {
  const originalRequest = TreeRequest({code: [1]})
  const {_tag, payload, request} = handleRequest(originalRequest)
  test('_tag', () => {
    expect(_tag).toBe(dataTag('response-tree'))
  })

  test('request', () => {
    expect(request).toEqual(originalRequest)
  })

  test('payload', () => {
    expect(payload).toEqual(tree(1, [tree(3), tree(2)]))
  })
})

describe('LinesRequest', () => {
  const originalRequest = LinesRequest({
    format: 'decimal',
    theme: 'thin',
    tree: Codec.Prufer.decode([1]),
  })
  const {_tag, payload, request} = handleRequest(originalRequest)
  test('_tag', () => {
    expect(_tag).toBe(dataTag('response-lines'))
  })

  test('request', () => {
    expect(request).toEqual(originalRequest)
  })

  test('payload', () => {
    expect('\n' + unwords(payload as string[])).toEqual(`
┬1
├─3
└─2
`)
  })
})
