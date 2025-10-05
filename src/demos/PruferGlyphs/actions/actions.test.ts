import {describe, expect, test} from 'vitest'
import {actionMap} from './index'

describe('modify actions', () => {
  test('decCode', () => {
    expect(actionMap.decCode.apply([1, 2])).toEqual([1, 1])
  })

  test('incCode', () => {
    expect(actionMap.incCode.apply([1, 1])).toEqual([1, 2])
  })

  test('firstCode', () => {
    expect(actionMap.firstCode.apply([1, 2])).toEqual([1, 1])
  })

  test('lastCode', () => {
    expect(actionMap.lastCode.apply([1])).toEqual([3])
  })

  test('decNodes', () => {
    expect(actionMap.decNodes.apply([1, 1])).toEqual([3])
  })

  test('incNodes', () => {
    expect(actionMap.incNodes.apply([1])).toEqual([1, 1])
  })
})
