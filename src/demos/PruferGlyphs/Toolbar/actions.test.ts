import {describe, expect, test} from 'vitest'
import {modifyActionMap} from './actions'

describe('modify actions', () => {
  test('decCode', () => {
    expect(modifyActionMap.decCode.apply([1, 2])).toEqual([1, 1])
  })

  test('incCode', () => {
    expect(modifyActionMap.incCode.apply([1, 1])).toEqual([1, 2])
  })

  test('firstCode', () => {
    expect(modifyActionMap.firstCode.apply([1, 2])).toEqual([1, 1])
  })

  test('lastCode', () => {
    expect(modifyActionMap.lastCode.apply([1])).toEqual([3])
  })

  test('decNodes', () => {
    expect(modifyActionMap.decNodes.apply([1, 1])).toEqual([3])
  })

  test('incNodes', () => {
    expect(modifyActionMap.incNodes.apply([1])).toEqual([1, 1])
  })
})
