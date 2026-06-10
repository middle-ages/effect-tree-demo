import {describe, expect, test} from 'vitest'
import * as store from '#store'

const {
  code: {
    dec: [decCode, decHalfCode, firstCode],
    inc: [incCode, incHalfCode, lastCode],
  },
  nodeCount: {
    dec: [decNodes, decHalfNodeCount, firstNodeCount],
    inc: [incNodes, incHalfNodeCount, lastNodeCount],
  },
} = store.decIncActions

describe('decCodeActions', () => {
  test('firstCode', () => {
    expect(firstCode.apply([1, 2, 3, 4])).toEqual([1, 1, 1, 1])
  })

  test('decHalfCode', () => {
    expect(decHalfCode.apply([1, 2, 3, 4])).toEqual([1, 1, 5, 2])
  })

  test('decCode', () => {
    expect(decCode.apply([1, 2, 3, 4])).toEqual([1, 2, 3, 3])
  })
})

describe('incCodeActions', () => {
  test('incCode', () => {
    expect(incCode.apply([1, 2, 3, 4])).toEqual([1, 2, 3, 5])
  })

  test('incHalfCode', () => {
    expect(incHalfCode.apply([1, 1, 1, 1])).toEqual([3, 6, 6, 6])
  })

  test('lastCode', () => {
    expect(lastCode.apply([1, 2, 3, 4])).toEqual([6, 6, 6, 6])
  })
})

describe('decNodeCountActions', () => {
  test('firstNodeCount', () => {
    expect(firstNodeCount.apply([1, 2, 3, 4])).toEqual([])
  })

  test('decHalfNodeCount', () => {
    expect(decHalfNodeCount.apply([1, 1, 1, 1, 1, 1])).toEqual([2, 2, 2])
  })

  test('decNodeCount', () => {
    expect(decNodes.apply([1, 2, 3, 4])).toEqual([2, 3, 4])
  })
})

describe('incNodeCountActions', () => {
  test('incNodeCount', () => {
    expect(incNodes.apply([1, 2, 3])).toEqual([1, 1, 2, 3])
  })

  test('incHalfNodeCount', () => {
    const result = incHalfNodeCount.apply([1, 2])
    expect(result.length).toBeGreaterThan(2)
  })

  test('lastNodeCount', () => {
    const result = lastNodeCount.apply([1, 2, 3])
    expect(result.length).toBe(98)
  })
})
