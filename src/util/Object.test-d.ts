import {expectTypeOf, test} from '@effect/vitest'
import type {FromEntries, InvertedObject} from './Object'

interface MyObject {
  readonly one: '1'
  readonly two: '2'
  readonly three: '3'
}

interface Inverted {
  readonly '1': 'one'
  readonly '2': 'two'
  readonly '3': 'three'
}

type Entries = readonly [
  readonly ['one', '1'],
  readonly ['two', '2'],
  readonly ['three', '3'],
]

test('FromEntries', () => {
  expectTypeOf<FromEntries<Entries>>().toEqualTypeOf<MyObject>()
})

test('InvertedObject', () => {
  expectTypeOf<InvertedObject<MyObject>>().toEqualTypeOf<Inverted>()
})
